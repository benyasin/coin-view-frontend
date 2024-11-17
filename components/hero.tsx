"use client";
/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { useIntl } from "react-intl";
import { title } from "@/components/primitives";
import React, { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";

export const Hero = () => {
  const intl = useIntl();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 判断是否在mobile下（小于640px）
    const handleResize = () => {
      setIsMobile(
        window.innerWidth < 640 ||
          /Mobi|Android|iPhone/i.test(navigator.userAgent)
      );
    };

    // 初始化判断
    handleResize();

    // 监听窗口大小变化
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const typedStrings = [
    `<h2 style="line-height: 1.6;" class="${title({
      size: isMobile ? "xs" : "sm",
    })}">${intl.formatMessage({ id: "slogan_1" })}&nbsp;</h2>`,
    `<h2 style="line-height: 1.6;" class="${title({
      color: "violet",
      size: isMobile ? "xs" : "sm",
    })}">${intl.formatMessage({ id: "slogan_2" })}&nbsp;</h2>`,
    `<h2 style="line-height: 1.6;" class="${title({
      size: isMobile ? "xs" : "sm",
    })}">${intl.formatMessage({ id: "slogan_3" })}&nbsp;</h2>`,
    `<h2 style="line-height: 1.6;" class="${title({
      color: "violet",
      size: isMobile ? "xs" : "sm",
    })}">${intl.formatMessage({ id: "slogan_4" })}&nbsp;</h2>`,
    `<h2 style="line-height: 1.6;" class="${title({
      size: isMobile ? "xs" : "sm",
    })}">${intl.formatMessage({ id: "slogan_5" })}</h2>`,
  ];

  return (
    <div className="relative justify-center items-center">
      <section className="flex flex-col items-center justify-center gap-4 pt-0 pb-12 md:py-20">
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center space-y-5 max-w-4xl mx-auto text-center"
        >
          <div className="inline-block max-w-[730px] text-center justify-center">
            <ReactTyped
              strings={[typedStrings.join("")]} // 将所有需要打字的内容传入这里
              typeSpeed={50} // 打字速度
              backSpeed={30} // 删除速度
              loop={false} // 是否循环
              showCursor={false} // 是否显示光标
              cursorChar="|" // 光标样式
              smartBackspace={true} // 启用智能删除
            />

            {/*            <h2
              style={{ lineHeight: "1.6" }}
              className={title({ size: isMobile ? "xs" : "sm" })}
            >
              {intl.formatMessage({ id: "slogan_1" })}&nbsp;
            </h2>
            <h2
              style={{ lineHeight: "1.6" }}
              className={title({
                color: "violet",
                size: isMobile ? "xs" : "sm",
              })}
            >
              {intl.formatMessage({ id: "slogan_2" })}&nbsp;
            </h2>
            <h2
              style={{ lineHeight: "1.6" }}
              className={title({ size: isMobile ? "xs" : "sm" })}
            >
              {intl.formatMessage({ id: "slogan_3" })}&nbsp;
            </h2>
            <h2
              style={{ lineHeight: "1.6" }}
              className={title({
                color: "violet",
                size: isMobile ? "xs" : "sm",
              })}
            >
              {intl.formatMessage({ id: "slogan_4" })}&nbsp;
            </h2>
            <h2
              style={{ lineHeight: "1.6" }}
              className={title({ size: isMobile ? "xs" : "sm" })}
            >
              {intl.formatMessage({ id: "slogan_5" })}
            </h2>*/}
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
