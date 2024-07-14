"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Image,
  Button,
  Avatar,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import YouTubeEmbed from "@/components/youtube-embed";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Idea } from "@/components/icons";

const YouTubeList = ({}) => {
  return (
    <>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className="carousel"
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass="carousel-item"
        keyBoardControl
        minimumTouchDrag={80}
        partialVisible
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 2,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass="carousel-slider"
        slidesToSlide={1}
        swipeable
      >
        <Card className="pt-4 pb-0">
          <CardHeader className="py-2 px-4 justify-between">
            <div className="flex gap-5 h-[45px]">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://nextui.org/avatars/avatar-1.png"
              />
              <div className="flex flex-col h-[35px] items-start justify-between">
                <h4 className="font-semibold leading-none text-large">
                  Shu Crypto
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  3.02 million subscribers
                </h5>
              </div>
            </div>
            <Button radius="full" className="text-xl -mt-2" color="success">
              Bullish
            </Button>
          </CardHeader>

          <Accordion>
            <AccordionItem
              className="accordion-item"
              key="1"
              aria-label="Theme"
              title="TubeBuddy 怎么用 ？| 最新 最全 TubeBuddy 教程 教学 | 功能 解析"
            >
              TubeBuddy 最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。
            </AccordionItem>
          </Accordion>
          <CardBody className="overflow-visible !p-0">
            <YouTubeEmbed height={230} width={410} videoId="SSq0jCYGRnU" />
          </CardBody>
        </Card>

        <Card className="pt-4 pb-0">
          <CardHeader className="py-2 px-4 justify-between">
            <div className="flex gap-5 h-[45px]">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://nextui.org/avatars/avatar-1.png"
              />
              <div className="flex flex-col h-[35px] items-start justify-between">
                <h4 className="font-semibold leading-none text-large">
                  Shu Crypto
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  3.02 million subscribers
                </h5>
              </div>
            </div>
            <Button radius="full" className="text-xl -mt-2" color="danger">
              Bearish
            </Button>
          </CardHeader>

          <Accordion>
            <AccordionItem
              className="accordion-item"
              key="1"
              aria-label="Theme"
              title="TubeBuddy 怎么用 ？| 最新 最全 TubeBuddy 教程 教学 | 功能 解析"
            >
              TubeBuddy 最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。
            </AccordionItem>
          </Accordion>

          <CardBody className="overflow-visible !p-0">
            <YouTubeEmbed height={230} width={410} videoId="SSq0jCYGRnU" />
          </CardBody>
        </Card>

        <Card className="pt-4 pb-0">
          <CardHeader className="py-2 px-4 justify-between">
            <div className="flex gap-5 h-[45px]">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://nextui.org/avatars/avatar-1.png"
              />
              <div className="flex flex-col h-[35px] items-start justify-between">
                <h4 className="font-semibold leading-none text-large">
                  Shu Crypto
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  3.02 million subscribers
                </h5>
              </div>
            </div>
            <Button radius="full" className="text-xl -mt-2" color="success">
              Bullish
            </Button>
          </CardHeader>

          <Accordion>
            <AccordionItem
              className="accordion-item"
              key="1"
              aria-label="Theme"
              title="TubeBuddy 怎么用 ？| 最新 最全 TubeBuddy 教程 教学 | 功能 解析"
            >
              TubeBuddy 最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。
            </AccordionItem>
          </Accordion>
          <CardBody className="overflow-visible !p-0">
            <YouTubeEmbed height={230} width={410} videoId="SSq0jCYGRnU" />
          </CardBody>
        </Card>

        <Card className="pt-4 pb-0">
          <CardHeader className="py-2 px-4 justify-between">
            <div className="flex gap-5 h-[45px]">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://nextui.org/avatars/avatar-1.png"
              />
              <div className="flex flex-col h-[35px] items-start justify-between">
                <h4 className="font-semibold leading-none text-large">
                  Shu Crypto
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  3.02 million subscribers
                </h5>
              </div>
            </div>
            <Button radius="full" className="text-xl -mt-2" color="danger">
              Bearish
            </Button>
          </CardHeader>

          <Accordion>
            <AccordionItem
              className="accordion-item"
              key="1"
              aria-label="Theme"
              title="TubeBuddy 怎么用 ？| 最新 最全 TubeBuddy 教程 教学 | 功能 解析"
            >
              TubeBuddy 最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。TubeBuddy
              最新最全教程教学,这是全网最全的视频教程了。
            </AccordionItem>
          </Accordion>

          <CardBody className="overflow-visible !p-0">
            <YouTubeEmbed height={230} width={410} videoId="SSq0jCYGRnU" />
          </CardBody>
        </Card>
      </Carousel>
    </>
  );
};

export default YouTubeList;
