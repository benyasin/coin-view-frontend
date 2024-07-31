"use client";

import { subtitle } from "@/components/primitives";
import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  Avatar,
  CardBody,
  CardHeader,
  Button,
  Link,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import YouTubeEmbed from "@/components/youtube-embed";
import "../styles/youtube-tab.css";

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
              <div className="flex mt-2 mb-6 gap-4 justify-between w-full">
                <Card key={video.id} className="w-1/2">
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
                    <Button
                      radius="full"
                      className={`text-xl -mt-2 ${
                        video.sentiment === "bullish"
                          ? "bg-green-500"
                          : video.sentiment === "bearish"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {video.sentiment.charAt(0).toUpperCase() +
                        video.sentiment.slice(1)}
                    </Button>
                  </CardHeader>
                  <CardBody className="overflow-visible !p-0">
                    <YouTubeEmbed
                      height={275}
                      width={440}
                      videoId="SSq0jCYGRnU"
                    />
                  </CardBody>
                </Card>
                <div className="w-1/2 h-[275px]">
                  <Link
                    className={subtitle({
                      className: "text-primary line-clamp-2 pl-4",
                    })}
                    href="#"
                  >
                    {video.title}
                  </Link>
                  <Accordion
                    isCompact
                    itemClasses={{
                      base: "py-0 w-full",
                      title: "font-normal text-lg",
                      trigger: "px-2 py-0 rounded-lg h-10 flex items-center",
                      indicator: "text-medium",
                      content: "px-2 text-default-500",
                    }}
                    defaultExpandedKeys={["1"]}
                  >
                    <AccordionItem
                      className="accordion-item"
                      key="1"
                      aria-label="Theme"
                      title="核心观点"
                    >
                      比特币近期受到特朗普演讲的影响，市场反应热烈。支持者相信比特币的潜力，并强调在历史上，任何草根项目的持续性都有限，暗示比特币会获得更多机构的认可和购买。许多分析师提到，通过历史数据和技术指标，如Hashley日本指标，预示比特币即将迎来上涨走势。该指标历史上曾显示高精确度的信号，即将出现的蓝色反转信号被视为重要趋势的开始。
                      分析师还指出，未来可能与美国总统选举相关的事件将推动比特币价格上行，可能出现类似于2016年和2020年的大幅上涨。同时，建议投资者关注短期买点，例如在价格回调时的关键支撑位。总体来看，分析师对当前比特币市场局势持乐观态度，认为未来的获利空间非常可观，并呼吁投资者保持关注和参与。
                    </AccordionItem>
                    <AccordionItem
                      className="accordion-item"
                      key="2"
                      aria-label="Theme"
                      title="看涨理由"
                    >
                      这段文字表达了对比特币未来价值的极大信心，作者提到由于特朗普的演讲具有历史意义，比特币的前景看好。此外，文中使用了“我相信肯定还会继续大涨”、“空间是非常的给力”等积极的措辞，显示出对比特币价格上涨的强烈期待。作者提到的各种技术指标和历史案例也支持了他们对比特币看涨的观点，因此整体
                      sentiment 明显表现出看涨的情绪。
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
