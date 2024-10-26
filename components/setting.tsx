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
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { UserInfo, Youtuber } from "@/types";

type ProfileProps = {
  user: UserInfo; // Ensure that user is of type UserInfo
  onBackdropChange: (newTopValue: string) => void; // 回调函数
};

export const Setting: React.FC<ProfileProps> = ({ user, onBackdropChange }) => {
  const intl = useIntl();
  const {
    isOpen: isBindOpen,
    onOpen: onBindOpen,
    onOpenChange: onBindOpenChange,
  } = useDisclosure();

  const handleBind = async () => {
    onBindOpen();
  };

  const handleBindGotIt = async () => {
    // @ts-ignore
    onBindOpenChange(false);
  };

  return (
    <>
      <Modal
        size="4xl"
        className="z-30"
        backdrop="blur"
        isOpen={isBindOpen}
        onOpenChange={onBindOpenChange}
      >
        <ModalContent>
          <ModalBody className="pt-10">
            <p
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({
                  id: "bind_telegram_step1",
                  defaultMessage: "",
                }),
              }}
            />
            <img
              src="/telegram-bind-1.png"
              alt="Bind telegram step1"
              className="my-2 mb-8"
            />
            <p
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({
                  id: "bind_telegram_step2",
                  defaultMessage: "",
                }),
              }}
            />
            <img
              src="/telegram-bind-2.png"
              alt="Bind telegram step2"
              className="my-2"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleBindGotIt}>
              {intl.formatMessage({ id: "got_it" })}
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
            <div className="flex items-center justify-between px-4">
              <div className="text-gray-500">
                {intl.formatMessage({ id: "link_telegram" })}
              </div>
              {user.telegram_username ? (
                <div className="my-3 text-gray-500">
                  {user.telegram_username}
                </div>
              ) : (
                <Button onClick={handleBind} color="primary" variant="light">
                  {intl.formatMessage({ id: "bind" })}
                </Button>
              )}
            </div>
            <div className="flex items-center justify-between px-4">
              <div className="text-gray-500">
                {intl.formatMessage({ id: "update_password" })}
              </div>
              <Button
                onClick={handleBind}
                color="primary"
                disabled={true}
                variant="light"
              >
                {intl.formatMessage({ id: "update" })}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
