"use client";

import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  Avatar,
  CardBody,
  CardHeader,
  Button,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import YouTubeEmbed from "@/components/youtube-embed";

// 示例数据
const videos = [
  {
    id: 1,
    videoId: "SSq0jCYGRnU",
    analyst: "Shu Crypto",
    subscribers: "3.02 million",
    title: "TubeBuddy 怎么用？| 最新 TubeBuddy 教程",
    summary: "视频摘要...",
    sentiment: "bullish",
    reason: "分析理由...",
    uploadedAt: "3 hours ago",
    avatar: "avatar.jpg",
  },
  {
    id: 2,
    videoId: "SSq0jCYGRnU",
    analyst: "Shu Crypto",
    subscribers: "3.02 million",
    title: "TubeBuddy 怎么用？| 最新 TubeBuddy 教程",
    summary: "视频摘要...",
    sentiment: "bearish",
    reason: "分析理由...",
    uploadedAt: "5 hours ago",
    avatar: "avatar.jpg",
  },
  {
    id: 3,
    videoId: "SSq0jCYGRnU",
    analyst: "Shu Crypto",
    subscribers: "3.02 million",
    title: "TubeBuddy 怎么用？| 最新 TubeBuddy 教程",
    summary: "视频摘要...",
    sentiment: "neutral",
    reason: "分析理由...",
    uploadedAt: "5 hours ago",
    avatar: "avatar.jpg",
  },
  // 其他视频数据...
];

const YouTubeTab = ({}) => {
  const [selectedTab, setSelectedTab] = useState("all");

  let tabs = [
    {
      id: "all",
      label: "All",
    },
    {
      id: "bullish",
      label: "Bullish",
    },
    {
      id: "bearish",
      label: "Bearish",
    },
    {
      id: "neutral",
      label: "Neutral",
    },
  ];

  const filterVideos = (tab: string) => {
    if (tab === "all") return videos;
    return videos.filter((video) => video.sentiment.toLowerCase() === tab);
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs
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
          console.log("Selected Tab: ", key);
          setSelectedTab(key.toString());
        }}
      >
        {tabs.map((item) => (
          <Tab key={item.id} title={item.label} value={item.id}>
            {filterVideos(selectedTab).map((video) => (
              <Card key={video.id} className="mt-4">
                <CardHeader className="py-2 px-4 justify-between">
                  <div className="flex gap-5 h-[45px]">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src={video.avatar}
                    />
                    <div className="flex flex-col h-[35px] items-start justify-between">
                      <h4 className="font-semibold leading-none text-large">
                        {video.analyst}
                      </h4>
                      <h5 className="text-small tracking-tight text-default-400">
                        {video.subscribers} subscribers
                      </h5>
                    </div>
                  </div>
                  <Button
                    radius="full"
                    className={`text-xl -mt-2 ${
                      video.sentiment === "bullish"
                        ? "text-green-500"
                        : video.sentiment === "bearish"
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {video.sentiment.charAt(0).toUpperCase() +
                      video.sentiment.slice(1)}
                  </Button>
                </CardHeader>

                <Accordion>
                  <AccordionItem
                    className="accordion-item"
                    key="1"
                    aria-label="Theme"
                    title={video.title}
                  >
                    {video.summary}
                  </AccordionItem>
                </Accordion>
                <CardBody className="overflow-visible !p-0">
                  <YouTubeEmbed
                    height={230}
                    width={410}
                    videoId="SSq0jCYGRnU"
                  />
                </CardBody>
              </Card>
            ))}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default YouTubeTab;
