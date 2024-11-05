"use client";
import React, { useEffect, useState, useRef } from "react";
import { useIntl } from "react-intl";
import { Card } from "@nextui-org/react";
import anime from "animejs";
import { getIndexCount } from "@/actions/api";
import { motion } from "framer-motion";

// 动画组件
// @ts-ignore
const AnimatedNumber = ({ value, show }) => {
  const numberRef = useRef(null);

  useEffect(() => {
    if (show) {
      anime({
        targets: numberRef.current,
        innerHTML: [0, value],
        easing: "linear",
        round: 1, // 保持整数
        duration: 2000, // 动画时长
      });
    }
  }, [show, value]);

  const hoverEffect = { y: -10 }; // 鼠标移上去上移10像素

  return (
    <motion.div
      className="text-4xl md:text-6xl bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent"
      ref={numberRef}
      whileHover={hoverEffect}
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // 悬停效果
    >
      0
    </motion.div>
  );
};

export const Growing = () => {
  const intl = useIntl();
  const [showNumbers, setShowNumbers] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [youtuberCount, setYoutuberCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const numbersRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getIndexCount();
        setYoutuberCount(data.youtuber_count);
        setVideoCount(data.video_count);
        setMemberCount(data.user_member_count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // 判断是否在 mobile 下（小于 640px）
    const handleResize = () => {
      setIsMobile(
        window.innerWidth < 640 ||
          /Mobi|Android|iPhone/i.test(navigator.userAgent)
      );
    };

    // 初始化判断
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // 使用 IntersectionObserver 监听数字区域是否进入视口
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowNumbers(true);
        }
      },
      { threshold: 0.5 }
    );

    if (numbersRef.current) {
      observer.observe(numbersRef.current);
    }

    return () => {
      if (numbersRef.current) {
        observer.unobserve(numbersRef.current);
      }
    };
  }, []);

  return (
    <div className="relative justify-center items-center">
      <section
        ref={numbersRef}
        className="flex flex-col items-center justify-center gap-4 pt-6 py-6 md:py-20"
      >
        <h3 className="text-3xl font-light tracking-tighter sm:text-3xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty">
          {intl.formatMessage({ id: "we_are_growing" })}
        </h3>
        <div className="flex flex-wrap justify-between w-full max-w-screen-lg mt-12 md:px-16">
          <Card className="py-6 max-w-[400px] bg-transparent shadow-none">
            <h1 className="text-center">
              {showNumbers ? (
                <AnimatedNumber value={youtuberCount} show={showNumbers} />
              ) : (
                "0"
              )}
            </h1>
            <h3 className="text-center text-large bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty mt-2">
              {intl.formatMessage({ id: "growing_youtuber" })}
            </h3>
          </Card>
          <Card className="py-6 max-w-[400px] bg-transparent shadow-none">
            <h1 className="text-center">
              {showNumbers ? (
                <AnimatedNumber value={videoCount} show={showNumbers} />
              ) : (
                "0"
              )}
            </h1>
            <h3 className="text-center text-large bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty mt-2">
              {intl.formatMessage({ id: "growing_video" })}
            </h3>
          </Card>
          <Card className="py-6 max-w-[400px] bg-transparent shadow-none">
            <h1 className="text-center">
              {showNumbers ? (
                <AnimatedNumber value={memberCount} show={showNumbers} />
              ) : (
                "0"
              )}
            </h1>
            <h3 className="text-center text-large bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty mt-2">
              {intl.formatMessage({ id: "growing_member" })}
            </h3>
          </Card>
        </div>
      </section>
    </div>
  );
};
