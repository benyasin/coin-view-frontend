"use server";

import axios from "axios";
import { cookies, headers } from "next/headers";
import { LoginFormType, RegisterFormType } from "@/types";
import { Youtuber } from "@/types";
import { clearCache } from "@/helpers/store";

// 创建 axios 实例时全局设置 withCredentials: true
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 你的 API URL
  withCredentials: true, // 全局设置 withCredentials 为 true
});

console.log("111");
if (typeof window === "undefined") {
  console.log("222");
  const token = cookies().get("access_token")?.value;
  if (token) {
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
}

export const registerUser = async (values: RegisterFormType) => {
  try {
    const lang = headers().get("x-locale") || "en";
    const response = await apiClient.post(`/user/signup`, {
      username: values.username,
      email: values.email,
      password: values.password,
      captcha: values.captcha,
      captcha_id: values.captchaId,
      lang,
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
  lang: string,
  amount: string,
  payWay: string,
  memberPlan: string,
  terminalType: string
) => {
  try {
    const response = await apiClient.post(`/order/create`, {
      user_id: userId,
      email,
      lang,
      amount,
      pay_way: payWay,
      member_plan: memberPlan,
      terminal_type: terminalType,
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

export const fetchLatestAnnouncement = async (userId?: string) => {
  try {
    const response = await apiClient.get("/announcement/latest");
    return response.data; // Return the data from the response
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to fetch announcement";
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error(
        "An unexpected error occurred while fetching announcement"
      );
    }
  }
};

export const fetchAnnouncements = async (
  pageNumber: number,
  pageSize: number
) => {
  try {
    const response = await apiClient.post(`/announcement/list`, {
      page_number: pageNumber,
      page_size: pageSize,
    });
    return response.data; // Return the data from the response
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to fetch announcements";
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error(
        "An unexpected error occurred while fetching announcements"
      );
    }
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

export const fetchRecommendedYoutubers = async () => {
  try {
    const response = await apiClient.get(`/youtuber/recommend/`);
    return response.data; // Return the data from the response
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to fetch recommend Youtubers";
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error(
        "An unexpected error occurred while fetching recommend Youtubers"
      );
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

export const startTrial = async (shared: boolean) => {
  try {
    if (cookies().get("access_token")?.value) {
      const response = await apiClient.post(
        `/user/start_trail/${shared}`,
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
        error.response?.data?.detail || "Failed to save user trial";
      console.log(errorMessage);
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error("An unexpected error occurred while save trial");
    }
  }
};

export const addAnnouncement = async (params: {
  content: string;
  display_from: string;
  display_to: string;
}): Promise<any> => {
  try {
    const response = await apiClient.post(`/announcement/add`, params);
    return response.data; // API 返回的数据
  } catch (error) {
    // 检查是否是 Axios 错误
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to save announcement";
      console.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred while saving announcement");
    }
  }
};

export const deleteAnnouncement = async (aid: string): Promise<any> => {
  try {
    const response = await apiClient.post(`/announcement/delete/${aid}`);
    return response.data; // API 返回的数据
  } catch (error) {
    // 检查是否是 Axios 错误
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to delete announcement";
      console.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred while delete announcement");
    }
  }
};

export const toggleAnnouncementStatus = async (aid: string): Promise<any> => {
  try {
    const response = await apiClient.post(`/announcement/toggle/${aid}`);
    return response.data; // API 返回的数据
  } catch (error) {
    // 检查是否是 Axios 错误
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to toggle announcement";
      console.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred while toggle announcement");
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

export const searchSummary = async (
  created_at: string,
  pageNumber: number,
  pageSize: number
) => {
  try {
    const response = await apiClient.post(`/summary/search`, {
      created_at: created_at,
      page_number: pageNumber,
      page_size: pageSize,
    });
    return response.data; // Return the data from the response
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to fetch Summary";
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error("An unexpected error occurred while fetching Summaries");
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

/**
 * Interact with a video by liking, disliking, or sharing it.
 * @param videoId - ID of the video to interact with
 * @param userId - ID of the user performing the interaction
 * @param action - The action to perform (like, dislike, or share)
 * @returns - The updated interaction status from the server
 */
export const userVideoInteract = async (
  videoId: string,
  userId: string,
  action: "like" | "dislike" | "share"
): Promise<any> => {
  try {
    const response = await apiClient.post(`/video/interaction`, {
      video_id: videoId,
      user_id: userId,
      action: action,
    });
    return response.data; // Return the data from the response
  } catch (error: any) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to interact with the video";
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error(
        "An unexpected error occurred while interacting with the video"
      );
    }
  }
};

export const incrementViews = async (videoIds: string[]): Promise<any> => {
  try {
    const response = await apiClient.post(`/video/increment_views`, {
      video_ids: videoIds,
    });
    return response.data; // Return the data from the response
  } catch (error: any) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail ||
        "Failed to increment Views of the video";
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error(
        "An unexpected error occurred while increment Views of the video"
      );
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

export const countYoutubersByUserId = async (user_id: string) => {
  try {
    const response = await apiClient.get(`/user/count_youtubers/${user_id}`);
    return response.data; // Return the data from the response
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail ||
        "Failed to count user customized Youtubers";
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors (non-Axios errors)
      throw new Error(
        "An unexpected error occurred while count user customized Youtubers"
      );
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
    //console.log(response.data);
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

export const getAVideo = async (video_id: string) => {
  try {
    const response = await apiClient.get(`/video/detail/${video_id}`);
    //console.log(response.data);
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

export const getAVideoByUser = async (
  video_id: string,
  uid: string,
  is_member: boolean
) => {
  try {
    const response = await apiClient.get(
      `/video/detail/${video_id}?user_id=${uid}&is_member=${is_member}`
    );
    //console.log(response.data);
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

export const getLatestSummaryPrediction = async () => {
  try {
    const response = await apiClient.get(`/summary/latest/prediction`);
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
