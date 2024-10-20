"use client";
import { useEffect, useState, useRef } from "react";
import { useIntl } from "react-intl";
import { Card } from "@nextui-org/react";
import anime from "animejs";
import { title } from "@/components/primitives";

// 动画组件
// @ts-ignore
const AnimatedNumber = ({ value, show }) => {
  const numberRef = useRef(null);
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

  return (
    <div
      className="text-6xl bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent"
      ref={numberRef}
    >
      0
    </div>
  );
};

export const Growing = () => {
  const intl = useIntl();
  const [isMobile, setIsMobile] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);
  const numbersRef = useRef(null);

  useEffect(() => {
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
        className="flex flex-col items-center justify-center gap-4 pt-0 pb-12 md:py-20"
      >
        <h2 className="text-2xl font-light tracking-tighter sm:text-3xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty">
          {intl.formatMessage({ id: "we_are_growing" })}
        </h2>
        <div className="flex flex-wrap justify-around w-full max-w-screen-lg mt-8">
          <Card className="py-6 max-w-[400px] bg-transparent shadow-none">
            <h1 className="text-center">
              {showNumbers ? (
                <AnimatedNumber value={102} show={showNumbers} />
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
                <AnimatedNumber value={2500} show={showNumbers} />
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
                <AnimatedNumber value={19} show={showNumbers} />
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
