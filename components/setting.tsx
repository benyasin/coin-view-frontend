"use client";
/* eslint-disable @next/next/no-img-element */
import { useIntl } from "react-intl";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import {
  sendEmailVerifyCodeToUser,
  updatePassword,
  verifyEmailCode,
} from "@/actions/api";
import { UserInfo } from "@/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh"; // 导入中文语言包
import "dayjs/locale/en"; // 导入英文语言包

// 启用插件
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

type SettingProps = {
  user: UserInfo;
};

export const Setting: React.FC<SettingProps> = ({ user }) => {
  const intl = useIntl();
  const {
    isOpen: isBindOpen,
    onOpen: onBindOpen,
    onOpenChange: onBindOpenChange,
  } = useDisclosure();
  const {
    isOpen: isPasswordOpen,
    onOpen: onPasswordOpen,
    onOpenChange: onPasswordOpenChange,
  } = useDisclosure();

  const [emailCode, setEmailCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [lastSentTime, setLastSentTime] = useState<number | null>(null);

  const handleBind = async () => {
    onBindOpen();
  };

  const handlePassword = async () => {
    onPasswordOpen();
  };

  const sendEmailVerifyCode = async () => {
    const currentTime = Date.now();
    const TEN_MINUTES = 10 * 60 * 1000;

    // 检查是否在 10 分钟内重复点击
    if (lastSentTime && currentTime - lastSentTime < TEN_MINUTES) {
      alert(
        intl.formatMessage({
          id: "verification_code_already_sent",
          defaultMessage:
            "Verification code already sent. Please try again later.",
        })
      );
      return;
    }

    try {
      setIsSending(true); // 设置加载状态
      const { data } = await sendEmailVerifyCodeToUser(user.id);

      if (data) {
        alert(
          intl.formatMessage({
            id: "verification_code_sent",
            defaultMessage: "A verification code has been sent to your email.",
          })
        );
        setLastSentTime(currentTime); // 更新最后发送时间
      }
    } catch (error) {
      console.error("Failed to send verification code:", error);
      alert(
        intl.formatMessage({
          id: "verification_code_failed",
          defaultMessage: "Failed to send verification code. Please try again.",
        })
      );
    } finally {
      setIsSending(false); // 重置加载状态
    }
  };

  const handleConfirm = async () => {
    setError("");

    const { data } = await verifyEmailCode(user.id, emailCode);
    // 校验验证码
    if (!data) {
      setError(
        intl.formatMessage({
          id: "invalid_code",
          defaultMessage: "Invalid verification code.",
        })
      );
      return;
    }

    // 校验密码长度
    if (newPassword.length < 6) {
      setError(
        intl.formatMessage({
          id: "password_too_short",
          defaultMessage: "Password must be at least 6 characters long.",
        })
      );
      return;
    }

    // 校验两次密码是否一致
    if (newPassword !== confirmPassword) {
      setError(
        intl.formatMessage({
          id: "password_mismatch",
          defaultMessage:
            "New password and confirmation password do not match.",
        })
      );
      return;
    }

    const response = await updatePassword(user.id, emailCode, newPassword);
    if (response.data) {
      alert(
        intl.formatMessage({
          id: "password_updated",
          defaultMessage: "Password updated successfully!",
        })
      );
      // @ts-ignore
      onPasswordOpenChange(false); // 关闭模态框
    } else {
      alert(response.description);
    }
  };

  return (
    <>
      {/* 修改密码模态框 */}
      <Modal
        size="2xl"
        className="z-30"
        backdrop="blur"
        isOpen={isPasswordOpen}
        onOpenChange={onPasswordOpenChange}
      >
        <ModalContent>
          <ModalBody className="pt-10">
            <div className="flex flex-col gap-4">
              <Button
                color="primary"
                onClick={sendEmailVerifyCode}
                isDisabled={isSending} // 禁用按钮
              >
                {isSending
                  ? intl.formatMessage({
                      id: "sending_code",
                      defaultMessage: "Sending...",
                    })
                  : intl.formatMessage({
                      id: "send_verification_code",
                      defaultMessage: "Send Verification Code",
                    })}
              </Button>
              <Input
                type="text"
                placeholder={intl.formatMessage({
                  id: "enter_verification_code",
                  defaultMessage: "Enter Verification Code",
                })}
                value={emailCode}
                onChange={(e) => setEmailCode(e.target.value)}
              />
              <Input
                type="password"
                placeholder={intl.formatMessage({
                  id: "new_password",
                  defaultMessage: "Enter New Password",
                })}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder={intl.formatMessage({
                  id: "confirm_password",
                  defaultMessage: "Confirm New Password",
                })}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <div className="text-red-500">{error}</div>}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleConfirm}>
              {intl.formatMessage({ id: "confirm" })}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Card className="mb-8 p-8 bg-gradient-to-r from-gray-100 to-green-300 dark:from-gray-900 dark:to-green-950 shadow-lg rounded-lg">
        <CardBody>
          <div className="text-2xl text-gray-400 font-bold mb-4">
            {intl.formatMessage({ id: "setting" })}
          </div>
          <div className="rounded-lg border-1 border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between px-4 my-2">
              <div className="text-gray-500">
                {intl.formatMessage({ id: "link_telegram" })}
              </div>
              {user.telegram_username ? (
                <div className="my-3 text-gray-500">
                  {user.telegram_username}
                  <Button onClick={handleBind} color="primary" variant="light">
                    {intl.formatMessage({ id: "change_bind" })}
                  </Button>
                </div>
              ) : (
                <Button onClick={handleBind} color="primary" variant="light">
                  {intl.formatMessage({ id: "bind" })}
                </Button>
              )}
            </div>

            <div className="flex items-center justify-between px-4 my-2">
              <div className="text-gray-500">
                {intl.formatMessage({ id: "update_password" })}
              </div>
              <div className="my-3 text-gray-500">
                {dayjs
                  .utc(user.updated_at)
                  .locale(intl.locale)
                  .tz(userTimeZone)
                  .fromNow()}
                <Button
                  onClick={handlePassword}
                  color="primary"
                  variant="light"
                >
                  {intl.formatMessage({ id: "update" })}
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
