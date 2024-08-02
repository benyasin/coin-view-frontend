"use client";

import { subtitle } from "@/components/primitives";
import React, { useEffect, useState } from "react";
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
import { Video } from "@/types";

const YouTubeTab = ({}) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // 从后端 API 获取视频数据
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${apiUrl}/video/list`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVideos(data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  const tabs = [
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
          console.log("Selected Tab: ", key);
          setSelectedTab(key.toString());
        }}
      >
        {tabs.map((item) => (
          <Tab key={item.id} title={item.label} value={item.id}>
            {filterVideos(selectedTab).map((video) => (
              <div
                key={video.video_id}
                className="flex mt-2 mb-10 gap-3 justify-between w-full"
              >
                <Card key={video.video_id} className="w-1/2">
                  <CardHeader className="pt-4 px-4 justify-between items-center">
                    <div className="flex items-center gap-5 h-[45px]">
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

                    <Chip
                      size="lg"
                      className={`text-xl -mt-2 ${
                        video.sentiment === "bullish"
                          ? "bg-green-500"
                          : video.sentiment === "bearish"
                          ? "bg-red-500"
                          : "bg-primary-500"
                      }`}
                    >
                      {video.sentiment.charAt(0).toUpperCase() +
                        video.sentiment.slice(1)}
                    </Chip>
                  </CardHeader>
                  <CardBody className="overflow-visible !p-0">
                    <YouTubeEmbed
                      height={275}
                      width={440}
                      videoId={video.video_id}
                    />
                  </CardBody>
                </Card>
                <div className="w-1/2 h-[275px]">
                  <Link
                    className={subtitle({
                      className: "text-primary line-clamp-2 pl-4 mb-0",
                    })}
                    href="#"
                  >
                    {video.title}
                  </Link>
                  <Accordion
                    isCompact
                    itemClasses={{
                      base: "py-2 w-full",
                      title: "font-normal text-lg pt-1",
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
                      title="核心观点"
                      startContent={<SummaryIcon size={18} />}
                    >
                      {video.summary}
                    </AccordionItem>
                    <AccordionItem
                      className="accordion-item"
                      key="2"
                      aria-label="Theme"
                      title="看涨理由"
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
                      {video.sentiment_explanation}
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
