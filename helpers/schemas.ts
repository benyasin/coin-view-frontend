import { object, ref, string } from "yup";

export const LoginSchema = object().shape({
  email: string()
    .email("This field must be an email")
    .required("Email is required"),
  password: string().required("Password is required"),
});

export const RegisterSchema = object().shape({
  username: string().required("Username is required"),
  email: string()
    .email("This field must be an email")
    .required("Email is required"),
  password: string().required("Password is required"),
  captcha: string().required("Captcha is required"),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password")], "Passwords must match"),
});
