"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { LoginFormType, RegisterFormType } from "@/types";
import { Youtuber } from "@/types";
import { clearCache } from "@/helpers/store";

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
    console.log(error);
    // @ts-ignore
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};

export const createOrder = async (
  userId: string,
  email: string,
  amount: string,
  memberPlan: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/order/create`,
      { user_id: userId, email, amount, member_plan: memberPlan }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    // @ts-ignore
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};

export const pollingOrder = async (orderId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/order/search/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    // @ts-ignore
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};

export const findMyOrders = async (user_id: string, page_number: number) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/order/list`,
      {
        user_id,
        page_number,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    // @ts-ignore
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};

export const searchPendingOrder = async (userId: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/order/pending`,
      { user_id: userId }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    // @ts-ignore
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};

export const fetchYoutubers = async (userId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/youtuber/list/${userId}`
    );
    return response.data; // Return the data from the response
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to fetch Youtubers";
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error("An unexpected error occurred while fetching Youtubers");
    }
  }
};

export const searchYoutuber = async (channelId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/youtuber/search/${channelId}`
    );
    return response.data; // Return the data from the response
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to fetch Youtubers";
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error("An unexpected error occurred while fetching Youtubers");
    }
  }
};

export const getUserInfo = async () => {
  try {
    if (cookies().get("access_token")?.value) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
        { access_token: cookies().get("access_token")?.value } // Pass the token here as part of the data
      );
      return response.data; // Return the data from the response
    }
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to fetch UserInfo";
      console.log(errorMessage);
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error("An unexpected error occurred while fetching user info");
    }
  }
};

export const searchVideo = async (
  userId: string,
  publishDate: string,
  opinion: string,
  channelTitle: string,
  pageNumber: number,
  pageSize: number
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/video/search`,
      {
        user_id: userId,
        publish_date: publishDate,
        opinion,
        channel_title: channelTitle,
        page_number: pageNumber,
        page_size: pageSize,
      }
    );
    return response.data; // Return the data from the response
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to fetch Videos";
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error("An unexpected error occurred while fetching Videos");
    }
  }
};

export const exportVideo = async (
  userId: string,
  publishDate: string,
  opinion: string,
  channelTitle: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/video/export`,
      {
        user_id: userId,
        publish_date: publishDate,
        opinion,
        channel_title: channelTitle,
      }
    );
    return response.data; // Return the data from the response
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to fetch Youtubers";
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error("An unexpected error occurred while fetching Youtubers");
    }
  }
};

export const addYoutuberToDB = async (
  newYoutuber: Youtuber,
  userId: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/youtuber/save`,
      {
        youtuber: newYoutuber,
        user_id: userId,
      }
    );
    return response.data; // Return the data from the response
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to fetch Youtubers";
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error("An unexpected error occurred while fetching Youtubers");
    }
  }
};

export const deleteYoutuberFromDB = async (
  channelId: string,
  userId: string
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/youtuber/del_relation/${channelId}/${userId}`
    );
    return response.data; // Return the data from the response
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to fetch Youtubers";
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error("An unexpected error occurred while fetching Youtubers");
    }
  }
};

export const createAuthCookie = async (token: string) => {
  cookies().set("access_token", token, {
    secure: false,
    httpOnly: true,
    sameSite: "strict",
  });
};

export const deleteAuthCookie = async () => {
  cookies().delete("access_token");
  clearCache("user");
};
