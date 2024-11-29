import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type LoginFormType = {
  email: string;
  password: string;
};

export type RegisterFormType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  captcha: string;
  captchaId: string;
};

// 类型定义
export interface Video {
  id: string;
  video_id: string;
  title: string;
  summary: string;
  summary_chinese: string;
  sentiment: string;
  sentiment_explanation: string;
  sentiment_explanation_chinese: string;
  url: string;
  created_at: string;
  updated_at: string;
  channel_id: string;
  avatar: string;
  channel_title: string;
  subscribers: string;
  channel_url: string;
  likes?: number;
  dislikes?: number;
  comments?: number;
  views?: number;
  shares?: number;
  liked?: boolean;
  disliked?: boolean;
  shared?: boolean;
}

export interface Summary {
  id: string;
  trend: string;
  viewpoint: string;
  prediction: string;
  trend_chinese: string;
  viewpoint_chinese: string;
  prediction_chinese: string;
  youtuber_count: number;
  bullish_count: number;
  bearish_count: number;
  neutral_count: number;
  created_at: string;
}

// 类型定义
export interface UserInfo {
  id: string;
  username: string;
  email: string;
  password?: string;
  is_member: boolean;
  is_admin?: boolean;
  telegram_username?: string;
  membership_level: string;
  membership_expiry: string;
  updated_at: string;
}

// 类型定义
export interface Youtuber {
  channel_id: string;
  channel_title: string;
  subscribers: string;
  avatar: string;
}
