"use client";

import { title, subtitle } from "@/components/primitives";
import { PieKline } from "@/components/pie-kline";
import { TimeSelect } from "@/components/time-select";
import YoutubeTab from "@/components/youtube-tab";
import { useIntl } from "react-intl";
import { QuestionIcon } from "@/components/icons";

export default function Home() {
  const intl = useIntl();
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-20 md:py-16">
        <div className="inline-block max-w-[690px] text-center justify-center">
          <h2 style={{ lineHeight: "1.2" }} className={title()}>
            {intl.formatMessage({ id: "slogan_1" })}&nbsp;
          </h2>
          <h2
            style={{ lineHeight: "1.2" }}
            className={title({ color: "violet" })}
          >
            {intl.formatMessage({ id: "slogan_2" })}&nbsp;
          </h2>
          <h2 style={{ lineHeight: "1.2" }} className={title()}>
            {intl.formatMessage({ id: "slogan_3" })}&nbsp;
          </h2>
          <h2
            style={{ lineHeight: "1.2" }}
            className={title({ color: "violet" })}
          >
            {intl.formatMessage({ id: "slogan_4" })}&nbsp;
          </h2>
          <h2 style={{ lineHeight: "1.2" }} className={title()}>
            {intl.formatMessage({ id: "slogan_5" })}
          </h2>
        </div>
      </section>
      <section className="text-2xl font-semibold ml-20 mt-16 flex justify-start items-center">
        <div className="text-default-400">
          {intl.formatMessage({ id: "bullish_bearish_probability" })}
        </div>
        <QuestionIcon className="ml-2" />
      </section>
      <section>
        <div className="mt-8 relative">
          <PieKline />
          <div className="absolute top-20 right-24">
            <TimeSelect />
          </div>
        </div>
      </section>
      <section className="text-2xl font-semibold ml-16 mt-20 mb-8">
        <div className="text-default-400">
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
