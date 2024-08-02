import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// 类型定义
export interface Video {
  video_id: string;
  analyst: string;
  subscribers: string;
  title: string;
  summary: string;
  sentiment: string;
  sentiment_explanation: string;
  uploadedAt: string;
  avatar: string;
}
