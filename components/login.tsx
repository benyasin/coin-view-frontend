"use client";

import { createAuthCookie, loginUser, registerUser } from "@/actions/api";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { MailIcon } from "@nextui-org/shared-icons";
import { useIntl } from "react-intl";

function LockIcon(props: { className: string }) {
  return null;
}

export const Login = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const intl = useIntl();

  const initialValues: LoginFormType = {
    email: "",
    password: "",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      try {
        const response = await loginUser(values);
        if (response) {
          const token = response.token;
          const user = response.user;
          await createAuthCookie(token.access_token);
          if (user) {
            setTimeout(() => {
              location.reload();
            }, 300);
          } else {
            console.error("User data is missing in the response");
          }
        }
      } catch (e: any) {
        if (e.message !== "[object Object]") {
          if (e.message === "Incorrect email or password") {
            setLoginError(intl.formatMessage({ id: "incorrect_u_or_p" }));
          } else {
            setLoginError(e.message);
          }
        }
        console.error(e.message);
      }
    },
    [router]
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className="flex flex-col gap-4 mb-4">
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                variant="bordered"
                label={intl.formatMessage({ id: "email" })}
                type="email"
                style={{ fontSize: "16px" }}
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
              <Input
                endContent={
                  <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                variant="bordered"
                label={intl.formatMessage({ id: "password" })}
                type="password"
                style={{ fontSize: "16px" }}
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
            </div>

            <div className="text-red-600 ml-1 mb-2">{loginError}</div>

            <Button
              onPress={() => handleSubmit()}
              variant="flat"
              color="primary"
            >
              {intl.formatMessage({ id: "login" })}
            </Button>
          </>
        )}
      </Formik>
    </>
  );
};
