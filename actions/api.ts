"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { LoginFormType, RegisterFormType } from "@/types";
import { Youtuber } from "@/types";
import { clearCache } from "@/helpers/store";
import { bool } from "yup";

// 创建 axios 实例时全局设置 withCredentials: true
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 你的 API URL
  withCredentials: true, // 全局设置 withCredentials 为 true
});

console.log("111");
if (cookies().get("access_token")?.value) {
  console.log("222");
  //console.log(cookies().get("access_token")?.value);
  apiClient.defaults.headers["Authorization"] =
    "Bearer " + cookies().get("access_token")?.value;
}

export const registerUser = async (values: RegisterFormType) => {
  try {
    const response = await apiClient.post(`/user/signup`, {
      username: values.username,
      email: values.email,
      password: values.password,
      captcha: values.captcha,
      captcha_id: values.captchaId,
    });
    return response.data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.response?.data?.detail || "Registration failed");
  }
};

export const loginUser = async (values: LoginFormType) => {
  try {
    const response = await apiClient.post(`/user/login`, values);
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
  payWay: string,
  memberPlan: string
) => {
  try {
    const response = await apiClient.post(`/order/create`, {
      user_id: userId,
      email,
      amount,
      pay_way: payWay,
      member_plan: memberPlan,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    // @ts-ignore
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};

export const findMyOrders = async (user_id: string, page_number: number) => {
  try {
    const response = await apiClient.post(`/order/list`, {
      user_id,
      page_number,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    // @ts-ignore
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};

export const searchPendingOrder = async (userId: string) => {
  try {
    const response = await apiClient.get(`/order/pending/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    // @ts-ignore
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};

export const fetchYoutubers = async (userId?: string) => {
  try {
    const response = await apiClient.get(
      userId ? `/youtuber/list/${userId}` : "/youtuber/list"
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
    const response = await apiClient.get(`/youtuber/search/${channelId}`);
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
      const response = await apiClient.post(
        `/user/me`,
        { access_token: cookies().get("access_token")?.value, lang: "en" } // Pass the token here as part of the data
      );
      return response.data; // Return the data from the response
    } else {
      return false;
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

export const saveLang = async (lang: string) => {
  try {
    if (cookies().get("access_token")?.value) {
      const response = await apiClient.post(
        `/user/save_lang/${lang}`,
        { access_token: cookies().get("access_token")?.value } // Pass the token here as part of the data
      );
      return response.data; // Return the data from the response
    } else {
      return false;
    }
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to save user lang";
      console.log(errorMessage);
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error("An unexpected error occurred while save lang");
    }
  }
};

export const saveTelegramReceive = async (receive: boolean) => {
  try {
    if (cookies().get("access_token")?.value) {
      const response = await apiClient.post(
        `/user/save_tg_receive/${receive}`,
        { access_token: cookies().get("access_token")?.value } // Pass the token here as part of the data
      );
      return response.data; // Return the data from the response
    } else {
      return false;
    }
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to save user lang";
      console.log(errorMessage);
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error("An unexpected error occurred while save lang");
    }
  }
};

export const whetherIsAdmin = async () => {
  try {
    if (cookies().get("access_token")?.value) {
      const response = await apiClient.post(
        `/user/is_admin`,
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
  publishDate: string,
  opinion: string,
  channelTitle: string,
  pageNumber: number,
  pageSize: number,
  userId?: string
) => {
  try {
    const response = await apiClient.post(`/video/search`, {
      user_id: userId,
      publish_date: publishDate,
      opinion,
      channel_title: channelTitle,
      page_number: pageNumber,
      page_size: pageSize,
    });
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
    const response = await apiClient.post(`/video/export`, {
      user_id: userId,
      publish_date: publishDate,
      opinion,
      channel_title: channelTitle,
    });
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
    const response = await apiClient.post(`/youtuber/save`, {
      youtuber: newYoutuber,
      user_id: userId,
    });
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
    const response = await apiClient.get(
      `/youtuber/del_relation/${channelId}/${userId}`
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

export const getUserCaptcha = async () => {
  try {
    const response = await apiClient.get(`/user/captcha`, {
      responseType: "blob", // 这会以 Blob 的形式获取响应数据
    });
    return response; // Return the data from the response
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

export const getIndexTrends = async () => {
  try {
    const response = await apiClient.get(`/index/trends`);
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

export const getIndexCount = async () => {
  try {
    const response = await apiClient.get(`/index/count`);
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

export const getIndexTotal = async () => {
  try {
    const response = await apiClient.get(`/index/total`);
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

export const getVideosByUser = async (uid: string, is_member: boolean) => {
  try {
    const response = await apiClient.get(
      `/video/list?user_id=${uid}&is_member=${is_member}`
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

export const getVideosPreset = async () => {
  try {
    const response = await apiClient.get(`/video/list`);
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
    //sameSite: "lax",
  });
};

export const deleteAuthCookie = async () => {
  cookies().delete("access_token");
  clearCache("user");
};
