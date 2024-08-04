"use client";

import { title, subtitle } from "@/components/primitives";
import { PieKline } from "@/components/pie-kline";
import { TimeSelect } from "@/components/time-select";
import YoutubeTab from "@/components/youtube-tab";
import { useIntl } from "react-intl";

export default function Home() {
  const intl = useIntl();
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-12 md:py-10">
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
      <section className="text-3xl font-semibold ml-16 mt-16">
        {/*Bullish & Bearish Probability*/}
      </section>
      <section>
        <div className="mt-8 relative">
          <PieKline />
          <div className="absolute top-20 right-16">
            <TimeSelect />
          </div>
        </div>
      </section>
      <section className="text-3xl font-semibold ml-16 mt-20 mb-8">
        YouTube Analysis Results
      </section>
      <section>
        <div className="mt-8 px-16">
          <YoutubeTab />
        </div>
      </section>
    </>
  );
}
