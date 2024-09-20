"use client";

import { subtitle } from "@/components/primitives";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
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
import { getUserInfo } from "@/actions/api";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);

const YouTubeTab = ({}) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const intl = useIntl();
  const [locale, setLocaleState] = useState<string>(intl.locale); // 默认从 Intl 获取语言
  const [user, setUser] = useState<UserInfo | null | undefined>(undefined);
  const router = useRouter();

  // 根据语言设置dayjs的本地化
  if (locale === "zh") {
    dayjs.locale("zh");
  } else {
    dayjs.locale("en");
  }

  // 从后端 API 获取视频数据
  useEffect(() => {
    const storedLang = localStorage.getItem("coinViewLang");
    if (storedLang) {
      setLocaleState(storedLang); // 更新状态中的语言
    }

    const timeout = setTimeout(() => {
      const cachedUser = getCache("user");
      if (cachedUser) {
        setUser(cachedUser);
      } else {
        getUserInfo().then((data) => {
          setUser(data.data);
          setCache("user", data.data); // 缓存数据
        });
      }
    }, 1500);

    return () => clearTimeout(timeout); // 清除定时器以避免内存泄漏
  }, [intl, router]);

  useEffect(() => {
    const fetchVideos = async (uid?: string) => {
      try {
        const response = await fetch(
          uid ? `${apiUrl}/video/list?user_id=${uid}` : `${apiUrl}/video/list`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVideos(data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    if (user) {
      fetchVideos(user.id).then((r) => {});
    } else {
      fetchVideos().then((r) => {});
    }
  }, [user]);

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
    if (tab === "all") return videos;
    return videos.filter((video) => video.sentiment.toLowerCase() === tab);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num.toString();
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
            {filterVideos(selectedTab).map((video) => (
              <div
                key={video.video_id}
                className="flex mt-2 mb-14 gap-12 px-2 justify-between w-full"
              >
                <Card key={video.video_id} className="w-1/2">
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
                        {dayjs(video.created_at).fromNow()}
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
                <div className="w-1/2 h-[275px]">
                  <Link
                    className={subtitle({
                      className: "text-default-600 line-clamp-2 pl-4 mb-0",
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
                      trigger: "px-2 py-0 rounded-lg h-10 flex items-center",
                      indicator: "text-medium",
                      content: "px-2 pb-2 text-default-500",
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
                </div>
              </div>
            ))}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default YouTubeTab;
