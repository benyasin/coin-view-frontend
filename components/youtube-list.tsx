"use client";

import React from "react";
import {Card, CardHeader, CardBody, Chip, Image, Button} from "@nextui-org/react";
import YouTubeEmbed from "@/components/youtube-embed";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const YouTubeList = ({  }) => {
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
              min: 1024
            },
            items: 2,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          }
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
            <div className="flex-col items-start">
              <h4 className="font-bold text-large">Shu Crypto</h4>
              <small className="text-default-500">3.02 million subscribers</small>
            </div>
            <Chip size="lg" className="px-4 font-bold" color="success">Bullish</Chip>
          </CardHeader>
          <CardBody className="overflow-visible !p-0">
            <YouTubeEmbed height={230} width={410} videoId="SSq0jCYGRnU" />
          </CardBody>
        </Card>
        <Card className="pt-4 pb-0">
          <CardHeader className="py-2 px-4 justify-between">
            <div className="flex-col items-start">
              <h4 className="font-bold text-large">Shu Crypto</h4>
              <small className="text-default-500">3.02 million subscribers</small>
            </div>
            <Chip size="lg" className="px-4 font-bold" color="danger">Bearish</Chip>
          </CardHeader>
          <CardBody className="overflow-visible !p-0">
            <YouTubeEmbed height={230} width={410} videoId="SSq0jCYGRnU" />
          </CardBody>
        </Card>
        <Card className="pt-4 pb-0">
          <CardHeader className="py-2 px-4 justify-between">
            <div className="flex-col items-start">
              <h4 className="font-bold text-large">Shu Crypto</h4>
              <small className="text-default-500">3.02 million subscribers</small>
            </div>
            <Chip size="lg" className="px-4 font-bold" color="success">Bullish</Chip>
          </CardHeader>
          <CardBody className="overflow-visible !p-0">
            <YouTubeEmbed height={230} width={410} videoId="SSq0jCYGRnU" />
          </CardBody>
        </Card>
        <Card className="pt-4 pb-0">
          <CardHeader className="py-2 px-4 justify-between">
            <div className="flex-col items-start">
              <h4 className="font-bold text-large">Shu Crypto</h4>
              <small className="text-default-500">1.02 million subscribers</small>
            </div>
            <Chip size="lg" className="px-4 font-bold" color="danger">Bearish</Chip>
          </CardHeader>
          <CardBody className="overflow-visible !p-0">
            <YouTubeEmbed height={230} width={410} videoId="SSq0jCYGRnU" />
          </CardBody>
        </Card>
      </Carousel>
  </>
  );
};

export default YouTubeList;