"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { LoginFormType, RegisterFormType } from "@/helpers/types";

export const registerUser = async (values: RegisterFormType) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
      values
    );
    return response.data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.response?.data?.detail || "Registration failed");
  }
};

export const loginUser = async (values: LoginFormType) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
      values
    );
    return response.data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};

export const createAuthCookie = async (token: string) => {
  cookies().set("coinViewAuth", token, { secure: true });
};

export const deleteAuthCookie = async () => {
  cookies().delete("coinViewAuth");
};
