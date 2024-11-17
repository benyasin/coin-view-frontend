"use client";

import { PieKline } from "@/components/pie-kline";
import { TimeSelect } from "@/components/time-select";
import YoutubeTab from "@/components/youtube-tab";
import { useIntl } from "react-intl";
import { QuestionIcon } from "@/components/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import React from "react";
import { Hero } from "@/components/hero";
import { Premium } from "@/components/premium";
import { Faq } from "@/components/faq";
import { Partner } from "@/components/partner";
import { Growing } from "@/components/growing";
import ScrollToTop from "@/components/scroll-to-top";
import { Feature } from "@/components/feature";

export default function Home() {
  const intl = useIntl();
  return (
    <>
      <section>
        <Hero />
      </section>
      <section className="text-xl ml-2 md:ml-16 md:mt-16 flex justify-start items-center">
        <div className="text-default-400">
          {intl.formatMessage({ id: "bullish_bearish_probability" })}
        </div>

        <Popover
          showArrow
          backdrop="opaque"
          placement="right"
          classNames={{
            base: [
              // arrow color
              "max-w-3xl",
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
              <QuestionIcon size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {(titleProps) => (
              <div className="px-1 py-2">
                <div className="text-large text-default-400">
                  {intl.formatMessage({ id: "bullish_bearish_calc_desc" })}
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </section>
      <section>
        <div className="md:mt-8 md:relative">
          <PieKline />
          <TimeSelect />
        </div>
      </section>
      <section>
        <div className="md:mt-16 md:relative">
          <Growing />
        </div>
      </section>
      <section>
        <div className="md:mt-16 md:relative">
          <Feature />
        </div>
      </section>
      <section>
        <div className="mt-20 md:px-16">
          <YoutubeTab />
        </div>
      </section>
      <section id="premium">
        <Premium />
      </section>
      <section id="faq">
        <Faq />
      </section>
      <section className="mt-12" id="partner">
        <Partner />
      </section>
      <ScrollToTop />
    </>
  );
}
