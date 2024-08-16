"use client";

import { createAuthCookie, loginUser, registerUser } from "@/actions/api";
import { RegisterSchema } from "@/helpers/schemas";
import { RegisterFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useIntl } from "react-intl";

export const Register = () => {
  const router = useRouter();
  const intl = useIntl();
  const notify = () =>
    toast.success(intl.formatMessage({ id: "register_successfully" }));

  const initialValues: RegisterFormType = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleRegister = useCallback(
    async (values: RegisterFormType) => {
      try {
        const response = await registerUser(values);
        if (response) {
          const token = response.token;
          const user = response.user;
          await createAuthCookie(token.access_token);
          if (user) {
            localStorage.setItem("coinViewUser", JSON.stringify(user));
            notify();
            setTimeout(() => {
              location.reload();
            }, 1500);
          } else {
            console.error("User data is missing in the response");
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    [router]
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
