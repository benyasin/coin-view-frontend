"use client";

import { subtitle } from "@/components/primitives";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh"; // 导入中文语言包
import "dayjs/locale/en"; // 导入英文语言包

import {
  Tabs,
  Tab,
  Card,
  Avatar,
  CardBody,
  CardHeader,
  Link,
  Accordion,
  AccordionItem,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import YouTubeEmbed from "@/components/youtube-embed";
import {
  BullishIcon,
  BearishIcon,
  NeutralIcon,
  SummaryIcon,
} from "@/components/icons";
import "../styles/youtube-tab.css";
import { UserInfo, Video } from "@/types";
import { useIntl } from "react-intl";
import { getCache, setCache } from "@/helpers/store";
import {
  deleteAuthCookie,
  getUserInfo,
  getVideosByUser,
  getVideosPreset,
} from "@/actions/api";
import { useTheme } from "next-themes";
import {
  Eye,
  Link2,
  MessageCircle,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { TwitterIcon, TelegramIcon } from "@/components/icons";
import toast, { Toaster } from "react-hot-toast";

// 启用插件
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const YouTubeTab = ({}) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const intl = useIntl();
  const [locale, setLocaleState] = useState<string>(intl.locale); // 默认从 Intl 获取语言
  const [user, setUser] = useState<UserInfo | null | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);
  const [fetchUserDone, setFetchUserDone] = useState(false);
  const { theme } = useTheme();

  const notify = () =>
    toast.success(intl.formatMessage({ id: "copied_to_clipboard" }));

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    notify();
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
    const fetchVideos = async (uid?: string, is_member?: boolean) => {
      try {
        const { data } =
          uid && typeof is_member !== "undefined"
            ? await getVideosByUser(uid, is_member)
            : await getVideosPreset();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    if (fetchUserDone) {
      if (user) {
        fetchVideos(user.id, user.is_member).then((r) => {});
      } else {
        fetchVideos().then((r) => {});
      }
    }
  }, [user, fetchUserDone]);

  const tabs = [
    {
      id: "all",
      label: intl.formatMessage({ id: "all" }),
    },
    {
      id: "bullish",
      label: intl.formatMessage({ id: "bullish" }),
    },
    {
      id: "bearish",
      label: intl.formatMessage({ id: "bearish" }),
    },
    {
      id: "neutral",
      label: intl.formatMessage({ id: "neutral" }),
    },
  ];

  const filterVideos = (tab: string) => {
    videos.forEach((video) => {
      video.likes = 11;
      video.dislikes = 3;
      video.comments = 5;
      video.views = 423;
    });
    if (tab === "all") return videos;
    return videos.filter((video) => video.sentiment.toLowerCase() === tab);
  };

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

  return (
    <div className="flex w-full flex-col">
      <Tabs
        size="lg"
        aria-label="tabs"
        selectedKey={selectedTab}
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-3 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]",
        }}
        onSelectionChange={(key) => {
          setSelectedTab(key.toString());
        }}
      >
        {tabs.map((item) => (
          <Tab key={item.id} title={item.label} value={item.id}>
            {filterVideos(selectedTab).map((video: Video) => (
              <div
                key={video.video_id}
                className={
                  locale == "zh"
                    ? "flex flex-wrap md:flex-nowrap md:flex-row mt-2 mb-32 md:mb-12 pb-12 gap-6 justify-between w-full"
                    : "flex flex-wrap md:flex-nowrap md:flex-row mt-2 mb-96 md:mb-24 pb-24 md:pb-0 gap-6 justify-between w-full"
                }
              >
                <Card key={video.video_id} className="w-full sm:w-1 md:w-1/2">
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
                        {dayjs(video.created_at).tz(userTimeZone).fromNow()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="overflow-visible !p-0">
                    <YouTubeEmbed
                      height={275}
                      width={548}
                      videoId={video.video_id}
                    />
                  </CardBody>
                </Card>
                <div className="sm:w-1 md:w-1/2 relative">
                  <Link
                    className={subtitle({
                      className: "text-default-600 line-clamp-2 pl-2 mb-0",
                    })}
                    href={video.url}
                    target="_blank"
                  >
                    {video.title}
                  </Link>
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
                  {/* 工具条 */}
                  <div
                    className={`absolute left-0 bottom-0 w-full flex justify-between items-center px-4 py-2 ${
                      theme === "dark"
                        ? "bg-gray-900/45 text-white"
                        : "bg-gray-50/45 text-gray-500"
                    } rounded-b-lg transition-all duration-300`}
                  >
                    {/* Like Button */}
                    <div className="flex items-center gap-1 cursor-pointer hover:text-primary-500">
                      <ThumbsUp size={16} />
                      <span>{formatNumber(video.likes)}</span>
                    </div>

                    {/* Dislike Button */}
                    <div className="flex items-center gap-1 cursor-pointer hover:text-red-500">
                      <ThumbsDown size={16} />
                      <span>{formatNumber(video.dislikes)}</span>
                    </div>

                    {/* Comment Button */}
                    <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                      <MessageCircle size={16} />
                      <span>{formatNumber(video.comments)}</span>
                    </div>

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
                            onClick={() => handleCopyLink(video.url)}
                          >
                            {intl.formatMessage({ id: "copy_link" })}
                          </DropdownItem>
                          <DropdownItem
                            key="share_on_x"
                            startContent={<TwitterIcon size={16} />}
                            onClick={() =>
                              window.open(
                                `https://twitter.com/share?url=${encodeURIComponent(
                                  video.url
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
                                  video.url
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
            ))}
          </Tab>
        ))}
      </Tabs>
      <Toaster />
    </div>
  );
};

export default YouTubeTab;
