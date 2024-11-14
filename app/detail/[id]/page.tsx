"use client";

import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh"; // 导入中文语言包
import "dayjs/locale/en"; // 导入英文语言包
import {
  Accordion,
  AccordionItem,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import YouTubeEmbed from "@/components/youtube-embed";
import { getLocalizedUrl } from "@/helpers/getLocalizedUrl";
import {
  BearishIcon,
  BullishIcon,
  NeutralIcon,
  SummaryIcon,
  TelegramIcon,
  TwitterIcon,
} from "@/components/icons";
import {
  Eye,
  Link2,
  MessageCircle,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { UserInfo, Video } from "@/types";
import "../../../styles/youtube-tab.css";
import { getCache, setCache } from "@/helpers/store";
import {
  deleteAuthCookie,
  getAVideo,
  getAVideoByUser,
  getUserInfo,
  getVideosByUser,
  getVideosPreset,
  incrementViews,
  userVideoInteract,
} from "@/actions/api";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import Head from "next/head";
// 启用插件
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const Detail = ({ params }: { params: { id: string } }) => {
  const intl = useIntl();
  const [video, setVideo] = useState<Video>();
  const [locale, setLocaleState] = useState<string>(intl.locale); // 默认从 Intl 获取语言
  const [user, setUser] = useState<UserInfo | null | undefined>(undefined);
  const [fetchUserDone, setFetchUserDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState("");
  const [dislikeAnimation, setDislikeAnimation] = useState("");
  const [hasIncrementedViews, setHasIncrementedViews] = useState(false);
  const { id } = params;
  const { theme } = useTheme();

  // 根据语言设置dayjs的本地化
  if (locale === "zh") {
    dayjs.locale("zh");
  } else {
    dayjs.locale("en");
  }

  // 从后端 API 获取视频数据
  useEffect(() => {
    const cachedUser = getCache("user");
    if (cachedUser) {
      setUser(cachedUser);
    } else {
      getUserInfo().then((data) => {
        if (data) {
          if (data.description == "Cookie token expired") {
            console.log("Cookie token expired");
            deleteAuthCookie();
            location.href = "/";
          }
          setUser(data.data);
          setCache("user", data.data); // 缓存数据
        }
        setFetchUserDone(true);
      });
    }
  }, [intl.locale]);

  useEffect(() => {
    const fetchVideo = async (
      video_id: string,
      uid?: string,
      is_member?: boolean
    ) => {
      try {
        const { data } =
          uid && typeof is_member !== "undefined"
            ? await getAVideoByUser(video_id, uid, is_member)
            : await getAVideo(video_id);

        setVideo(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    if (fetchUserDone) {
      if (user) {
        fetchVideo(id, user.id, user.is_member).then((r) => {});
      } else {
        fetchVideo(id).then((r) => {});
      }
    }
  }, [user, fetchUserDone]);

  const notify = () =>
    toast.success(intl.formatMessage({ id: "copied_to_clipboard" }));

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    notify();
  };

  let debounceTimeout: NodeJS.Timeout | null = null;

  const handleInteract = async (
    videoId: string,
    action: "like" | "dislike" | "share"
  ) => {
    // 如果之前的请求还在进行，取消之前的操作
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // 设置新的防抖计时器，等待300ms后执行导出操作
    debounceTimeout = setTimeout(async () => {
      try {
        const { status_code, description, data } = await userVideoInteract(
          videoId,
          user?.id || "",
          action
        );
        if (status_code == 200) {
          // 根据操作类型设置动画
          if (action === "like") {
            setLikeAnimation(data.liked ? "move-up" : "move-down");
          } else if (action === "dislike") {
            setDislikeAnimation(data.disliked ? "move-up" : "move-down");
          }

          setTimeout(() => {
            setLikeAnimation("");
            setDislikeAnimation("");
          }, 300); // 动画结束后清除类名

          setVideo((prevVideo: Video | undefined): Video | undefined => {
            if (!prevVideo) return prevVideo; // 如果没有 prevVideo，直接返回
            return {
              ...prevVideo,
              likes: data.likes,
              dislikes: data.dislikes,
              liked: data.liked,
              disliked: data.disliked,
            };
          });
        } else {
          console.error(description);
        }
      } catch (error) {
        console.error("Failed to update interaction:", error);
      }

      debounceTimeout = null; // 清除防抖计时器
    }, 300); // 设置300ms的防抖时间
  };

  useEffect(() => {
    // 判断是否在mobile下（小于640px）
    const handleResize = () => {
      setIsMobile(
        window.innerWidth < 640 ||
          /Mobi|Android|iPhone/i.test(navigator.userAgent)
      );
    };

    // 初始化判断
    handleResize();

    // 监听窗口大小变化
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatNumber = (num?: number) => {
    if (num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + "k";
      } else {
        return num.toString();
      }
    }
  };

  // 批量更新 views 的函数
  const batchIncrementViews = async () => {
    try {
      const { status_code, data } = await incrementViews([id]);
      if (status_code === 200) {
        setVideo((prevVideo: Video | undefined): Video | undefined => {
          if (!prevVideo) return prevVideo; // 如果没有 prevVideo，直接返回

          const updatedViews =
            data.find((v: { id: string }) => v.id === prevVideo.id)?.views ||
            prevVideo.views;

          return {
            ...prevVideo,
            views: updatedViews,
          };
        });
      }
    } catch (error) {
      console.error("Failed to increment views:", error);
    }
  };

  useEffect(() => {
    if (video && !hasIncrementedViews) {
      batchIncrementViews();
      setHasIncrementedViews(true); // 防止重复执行
    }
  }, [video]);

  if (!video) {
    return null;
  }

  return (
    <>
      <div className="detail-container py-8 max-w-6xl mx-auto text-default-600">
        <div
          key={video.video_id}
          className={
            locale == "zh"
              ? "flex flex-col mt-2 mb-32 md:mb-12 pb-12 gap-6 justify-between w-full"
              : "flex flex-col mt-2 mb-96 md:mb-24 pb-24 md:pb-0 gap-6 justify-between w-full"
          }
        >
          <Card key={video.video_id} className="w-full">
            <CardHeader className="pt-4 px-4 justify-between items-center">
              <div className="flex items-center gap-5 h-[45px]">
                <Link href={video.channel_url} target="_blank">
                  <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src={video.avatar}
                  />
                </Link>
                <div className="flex flex-col h-[35px] items-start justify-between">
                  <h4 className="font-semibold leading-none text-large">
                    {video.channel_title}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">
                    {formatNumber(Number.parseInt(video.subscribers))}{" "}
                    {intl.formatMessage({ id: "subscribers" })}
                  </h5>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Chip
                  size="md"
                  className={`text-medium ${
                    video.sentiment === "bullish"
                      ? "bg-green-500"
                      : video.sentiment === "bearish"
                      ? "bg-red-500"
                      : "bg-primary-500"
                  }`}
                >
                  {intl.formatMessage({ id: video.sentiment })}
                </Chip>
                <div className="text-small tracking-tight text-default-500">
                  {dayjs.utc(video.created_at).tz(userTimeZone).fromNow()}
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-visible !p-0">
              <YouTubeEmbed height={425} width={920} videoId={video.video_id} />
            </CardBody>
          </Card>
          <div className="w-full min-h-[380px] relative pb-12 md:pb-0">
            {video.title}
            <Accordion
              isCompact
              className="youtube-accordion"
              itemClasses={{
                base: "py-2 w-full",
                title: "font-normal text-default-400 text-lg pt-1",
                trigger: "py-0 rounded-lg h-10 flex items-center",
                indicator: "text-medium",
                content: "pb-2 text-default-500",
              }}
              defaultExpandedKeys={["1"]}
            >
              <AccordionItem
                className="accordion-item"
                key="1"
                aria-label="Theme"
                title={intl.formatMessage({ id: "core_viewpoint" })}
                startContent={<SummaryIcon size={18} />}
              >
                {locale == "zh" ? video.summary_chinese : video.summary}
              </AccordionItem>
              <AccordionItem
                className="accordion-item"
                key="2"
                aria-label="Theme"
                title={
                  intl.formatMessage({ id: video.sentiment }) +
                  (intl.locale === "en" ? " " : "") +
                  intl.formatMessage({ id: "reason" })
                }
                startContent={
                  video.sentiment === "bullish" ? (
                    <BullishIcon size={18} />
                  ) : video.sentiment === "bearish" ? (
                    <BearishIcon size={18} />
                  ) : (
                    <NeutralIcon size={18} />
                  )
                }
              >
                {locale == "zh"
                  ? video.sentiment_explanation_chinese
                  : video.sentiment_explanation}
              </AccordionItem>
            </Accordion>
            {/* Tool Bar */}
            <div
              className={`absolute h-[30px] left-0 bottom-0 w-full flex justify-between items-center px-4 py-2 ${
                theme === "dark"
                  ? "bg-gray-900/45 text-white"
                  : "bg-gray-50/45 text-gray-500"
              } rounded-b-lg transition-all duration-300`}
            >
              {/* Like Button */}
              <div
                className={`flex items-center gap-1 cursor-pointer ${
                  video.liked ? "text-primary-500" : "hover:text-primary-500"
                }`}
                onClick={() => handleInteract(video.id, "like")}
              >
                <ThumbsUp
                  size={16}
                  color={video.liked ? "rgb(0, 111, 238)" : "currentColor"}
                />
                <span className={likeAnimation}>
                  {formatNumber(video.likes)}
                </span>
              </div>

              {/* Dislike Button */}
              <div
                className={`flex items-center gap-1 cursor-pointer ${
                  video.disliked ? "text-red-500" : "hover:text-red-500"
                }`}
                onClick={() => handleInteract(video.id, "dislike")}
              >
                <ThumbsDown
                  size={16}
                  color={video.disliked ? "red" : "currentColor"}
                />
                <span className={dislikeAnimation}>
                  {formatNumber(video.dislikes)}
                </span>
              </div>

              {/* Comment Button */}
              {/*<div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                <MessageCircle size={16} />
                <span>{formatNumber(video.comments)}</span>
              </div>*/}

              {/* View Count */}
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{formatNumber(video.views)}</span>
              </div>

              {/* Share Button */}
              <div className="flex items-center gap-1 cursor-pointer hover:text-green-500">
                <Dropdown backdrop="blur">
                  <DropdownTrigger>
                    <Share2 size={16} />
                  </DropdownTrigger>
                  <DropdownMenu variant="faded">
                    <DropdownItem
                      key="copy_link"
                      startContent={<Link2 size={16} />}
                      onClick={() =>
                        handleCopyLink(
                          getLocalizedUrl(`/detail/${video.id}`, locale)
                        )
                      }
                    >
                      {intl.formatMessage({ id: "copy_link" })}
                    </DropdownItem>
                    <DropdownItem
                      key="share_on_x"
                      startContent={<TwitterIcon size={16} />}
                      onClick={() =>
                        window.open(
                          `https://twitter.com/share?url=${encodeURIComponent(
                            getLocalizedUrl(`/detail/${video.id}`, locale)
                          )}`,
                          "_blank"
                        )
                      }
                    >
                      {intl.formatMessage({ id: "share_on_x" })}
                    </DropdownItem>
                    <DropdownItem
                      key="share_on_telegram"
                      startContent={<TelegramIcon size={16} />}
                      onClick={() =>
                        window.open(
                          `https://t.me/share/url?url=${encodeURIComponent(
                            getLocalizedUrl(`/detail/${video.id}`, locale)
                          )}`,
                          "_blank"
                        )
                      }
                    >
                      {intl.formatMessage({ id: "share_on_telegram" })}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
