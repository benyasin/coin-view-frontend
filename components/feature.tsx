"use client";
import React from "react";
import { useIntl } from "react-intl";
import features from "@/public/features.png";
import features_dark from "@/public/features_dark.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";

export const Feature = () => {
  const intl = useIntl();
  const { theme } = useTheme();
  const isSSR = useIsSSR();

  return (
    <section className="relative max-w-screen-xl w-full mx-auto px-4 pt-0 pb-12 gap-12 md:px-8 flex flex-col justify-center items-center">
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-screen-xl mx-auto"
      >
        <div className="relative max-w-xl mx-auto text-center">
          <h3 className="text-3xl font-light tracking-tighter sm:text-3xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty">
            {intl.formatMessage({ id: "why_choose_us" })}
          </h3>
        </div>

        <div className="gap-16 w-full flex flex-row justify-center flex-wrap items-center place-content-center mt-8">
          <Image
            width={500}
            height={200}
            src={theme == "dark" || isSSR ? features_dark : features}
            alt="features"
            loading="lazy"
          />
          <div className="flex flex-col max-w-full xl:max-w-[50%]">
            <div className="text-2xl font-light tracking-tighter sm:text-xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty">
              {intl.formatMessage({ id: "market_overview" })}
            </div>
            <div className="pb-12 pt-3 text-foreground/60">
              {intl.formatMessage({ id: "market_overview_content" })}
            </div>
            <div className="text-2xl font-light tracking-tighter sm:text-xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty">
              {intl.formatMessage({ id: "accurate_extraction" })}
            </div>
            <div className="pb-12 pt-3 text-foreground/60">
              {intl.formatMessage({ id: "accurate_extraction_content" })}
            </div>
            <div className="text-2xl font-light tracking-tighter sm:text-xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty">
              {intl.formatMessage({ id: "realtime_notifications" })}
            </div>
            <div className="pt-3 text-foreground/60">
              {intl.formatMessage({ id: "realtime_notifications_content" })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
