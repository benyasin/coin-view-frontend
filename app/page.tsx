"use client";

import { PieKline } from "@/components/pie-kline";
import { TimeSelect } from "@/components/time-select";
import YoutubeTab from "@/components/youtube-tab";
import { useIntl } from "react-intl";
import { LanguageIcon, QuestionIcon } from "@/components/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import React from "react";
import { Hero } from "@/components/hero";

export default function Home() {
  const intl = useIntl();
  return (
    <>
      <Hero />
      <section className="text-2xl ml-20 mt-16 flex justify-start items-center">
        <div className="text-default-500">
          {intl.formatMessage({ id: "bullish_bearish_probability" })}
        </div>

        <Popover
          showArrow
          backdrop="opaque"
          placement="right"
          classNames={{
            base: [
              // arrow color
              "before:bg-default-200",
            ],
            content: [
              "py-3 px-4 border border-default-200",
              "bg-gradient-to-br from-white to-default-300",
              "dark:from-default-100 dark:to-default-50",
            ],
          }}
        >
          <PopoverTrigger>
            <Button isIconOnly variant="light" className="ml-2">
              <QuestionIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {(titleProps) => (
              <div className="px-1 py-2">
                <h3 className="text-small font-bold" {...titleProps}>
                  Popover Content
                </h3>
                <div className="text-tiny">This is the popover content</div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </section>
      <section>
        <div className="mt-8 relative">
          <PieKline />
          <div className="absolute top-20 right-24">
            <TimeSelect />
          </div>
        </div>
      </section>
      <section className="text-2xl ml-16 mt-40 mb-8">
        <div className="text-default-500">
          {intl.formatMessage({ id: "youTube_analysis_results" })}
        </div>
      </section>
      <section>
        <div className="mt-8 px-16">
          <YoutubeTab />
        </div>
      </section>
    </>
  );
}
