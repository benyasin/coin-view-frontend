"use client";

import { createAuthCookie, registerUser } from "@/actions/api";
import { RegisterSchema } from "@/helpers/schemas";
import { RegisterFormType } from "@/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { useIntl } from "react-intl";

export const Register = () => {
  const intl = useIntl();
  const [captchaId, setCaptchaId] = useState<string | null>(null); // Captcha ID
  const [captchaUrl, setCaptchaUrl] = useState<string>(""); // Captcha 图片 URL

  const notify = () =>
    toast.success(intl.formatMessage({ id: "register_successfully" }));

  const initialValues: RegisterFormType = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    captcha: "",
    captchaId: "",
  };

  // 获取新的验证码
  const fetchCaptcha = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/captcha`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const blob = await response.blob(); // 以 blob 格式读取响应体
        const imageUrl = URL.createObjectURL(blob); // 创建可用的图片 URL
        setCaptchaUrl(imageUrl); // 设置 captcha 图片 URL
        const captchaIdHeader = response.headers.get("X-Captcha-ID"); // 获取 captcha ID
        setCaptchaId(captchaIdHeader); // 设置 captcha ID
      } else {
        console.error("Failed to fetch captcha");
      }
    } catch (error) {
      console.error("Error fetching captcha:", error);
    }
  }, []);

  // 初始化时获取验证码
  useEffect(() => {
    fetchCaptcha();
  }, [fetchCaptcha]); // 仅在组件挂载时调用一次

  const handleRegister = useCallback(
    async (values: RegisterFormType) => {
      try {
        if (!captchaId) {
          toast.error("Captcha ID missing");
          return;
        }

        // 提交用户注册信息和验证码信息
        const { data, description } = await registerUser({
          ...values,
          captchaId,
        });

        if (data) {
          const token = data.token;
          const user = data.user;
          await createAuthCookie(token.access_token);
          if (user) {
            notify();
            setTimeout(() => {
              location.reload();
            }, 1500);
          } else {
            console.error("User data is missing in the response");
          }
        } else {
          alert(description);
          fetchCaptcha();
        }
      } catch (e) {
        alert(e);
        fetchCaptcha();
      }
    },
    [captchaId]
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col gap-4 mb-4">
              <Input
                variant="bordered"
                label={intl.formatMessage({ id: "username" })}
                type="text"
                value={values.username}
                isInvalid={!!errors.username && !!touched.username}
                errorMessage={errors.username}
                onChange={handleChange("username")}
              />
              <Input
                variant="bordered"
                label={intl.formatMessage({ id: "email" })}
                type="email"
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
              <Input
                variant="bordered"
                label={intl.formatMessage({ id: "password" })}
                type="password"
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
              <Input
                variant="bordered"
                label={intl.formatMessage({ id: "confirm_password" })}
                type="password"
                value={values.confirmPassword}
                isInvalid={
                  !!errors.confirmPassword && !!touched.confirmPassword
                }
                errorMessage={errors.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />

              {/* 验证码输入框 */}
              <Input
                variant="bordered"
                label={intl.formatMessage({ id: "captcha" })}
                type="text"
                value={values.captcha}
                isInvalid={!!errors.captcha && !!touched.captcha}
                errorMessage={errors.captcha}
                onChange={handleChange("captcha")}
              />

              {/* 验证码图片 */}
              {captchaUrl && (
                <div className="flex justify-between items-center">
                  <img className="h-[45px]" src={captchaUrl} alt="Captcha" />
                  <Button size="md" variant="bordered" onClick={fetchCaptcha}>
                    {intl.formatMessage({ id: "refresh_captcha" })}
                  </Button>
                </div>
              )}
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
            >
              {intl.formatMessage({ id: "register" })}
            </Button>
          </>
        )}
      </Formik>
      <Toaster />
    </>
  );
};
