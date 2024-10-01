"use client";
/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { useIntl } from "react-intl";
import { title } from "@/components/primitives";

export const Hero = () => {
  const intl = useIntl();

  return (
    <div className="relative justify-center items-center">
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-20">
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center space-y-5 max-w-4xl mx-auto text-center"
        >
          <div className="inline-block max-w-[690px] text-center justify-center">
            <h2 style={{ lineHeight: "1.2" }} className={title({ size: "sm" })}>
              {intl.formatMessage({ id: "slogan_1" })}&nbsp;
            </h2>
            <h2
              style={{ lineHeight: "1.2" }}
              className={title({ color: "violet", size: "sm" })}
            >
              {intl.formatMessage({ id: "slogan_2" })}&nbsp;
            </h2>
            <h2 style={{ lineHeight: "1.2" }} className={title({ size: "sm" })}>
              {intl.formatMessage({ id: "slogan_3" })}&nbsp;
            </h2>
            <h2
              style={{ lineHeight: "1.2" }}
              className={title({ color: "violet", size: "sm" })}
            >
              {intl.formatMessage({ id: "slogan_4" })}&nbsp;
            </h2>
            <h2 style={{ lineHeight: "1.2" }} className={title({ size: "sm" })}>
              {intl.formatMessage({ id: "slogan_5" })}
            </h2>
          </div>
        </motion.div>
      </section>
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full h-full absolute -top-32 flex justify-end items-center"
      >
        <div className="w-3/4 flex justify-center items-center">
          <div className="w-12 h-[800px] bg-light blur-[100px] rounded-3xl max-sm:rotate-[15deg] sm:rotate-[35deg]"></div>
        </div>
      </motion.div>
    </div>
  );
};
