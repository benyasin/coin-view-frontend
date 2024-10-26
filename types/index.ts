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
}

// 类型定义
export interface UserInfo {
  id: string;
  username: string;
  email: string;
  is_member: boolean;
  is_admin?: boolean;
  telegram_username?: string;
  membership_level: string;
  membership_expiry: string;
}

// 类型定义
export interface Youtuber {
  channel_id: string;
  channel_title: string;
  subscribers: string;
  avatar: string;
}
