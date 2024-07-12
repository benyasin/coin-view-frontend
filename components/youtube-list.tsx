"use client";

import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
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
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <YouTubeEmbed height={200} width={360} videoId="SSq0jCYGRnU" />
          </CardBody>
        </Card>
        <Card className="pt-4 pb-0">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <YouTubeEmbed height={200} width={360} videoId="SSq0jCYGRnU" />
          </CardBody>
        </Card>
        <Card className="pt-4 pb-0">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <YouTubeEmbed height={200} width={360} videoId="SSq0jCYGRnU" />
          </CardBody>
        </Card>
        <Card className="pt-4 pb-0">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <YouTubeEmbed height={200} width={360} videoId="SSq0jCYGRnU" />
          </CardBody>
        </Card>
      </Carousel>
  </>
  );
};

export default YouTubeList;