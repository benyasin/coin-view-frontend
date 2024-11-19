import React from "react";
import { useIntl } from "react-intl";
import features from "@/public/features.png";
import features_dark from "@/public/features_dark.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import anime from "animejs";
import { Button } from "@nextui-org/react";

export const Feature = () => {
  const intl = useIntl();
  const { theme } = useTheme();
  const isSSR = useIsSSR();

  // 处理鼠标移入事件
  const handleMouseEnter = (event: { currentTarget: any }) => {
    anime({
      targets: event.currentTarget,
      translateY: -10,
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  // 处理鼠标移出事件
  const handleMouseLeave = (event: { currentTarget: any }) => {
    anime({
      targets: event.currentTarget,
      translateY: 0,
      duration: 600,
      easing: "easeOutElastic(1, .5)",
    });
  };

  return (
    <section className="relative max-w-screen-xl w-full mx-auto px-4 pt-0 pb-12 gap-12 md:px-8 flex flex-col justify-center items-center">
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-screen-xl mx-auto"
      >
        <div className="relative max-w-xl mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-light tracking-tighter sm:text-3xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty"
          >
            {intl.formatMessage({ id: "why_choose_us" })}
          </motion.h3>
        </div>

        <div className="gap-16 w-full flex flex-row justify-center flex-wrap items-center place-content-center mt-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              width={500}
              src={theme == "dark" || isSSR ? features_dark : features}
              alt="features"
              loading="lazy"
            />
          </motion.div>

          <div className="flex flex-col max-w-full xl:max-w-[50%]">
            {[
              { id: "market_overview", content: "market_overview_content" },
              {
                id: "accurate_extraction",
                content: "accurate_extraction_content",
              },
              {
                id: "realtime_notifications",
                content: "realtime_notifications_content",
              },
            ].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                onMouseEnter={handleMouseEnter} // 绑定鼠标移入事件
                onMouseLeave={handleMouseLeave} // 绑定鼠标移出事件
                className="hover:cursor-pointer"
              >
                <div className="text-2xl font-light tracking-tighter sm:text-2xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty">
                  {intl.formatMessage({ id: item.id })}
                </div>
                <div className="pb-12 pt-1 text-foreground/60">
                  {intl.formatMessage({ id: item.content })}
                </div>
              </motion.div>
            ))}
            {/*<Button
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
              {intl.formatMessage({ id: "apply_try" })}
            </Button>*/}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
