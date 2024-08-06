"use client";

import { useIntl } from "react-intl";
import { title } from "@/components/primitives";
import React from "react";

export const Hero = () => {
  const intl = useIntl();

  return (
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
  );
};
