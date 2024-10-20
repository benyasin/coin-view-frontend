"use client";
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useTheme } from "next-themes";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  // 检查滚动距离，显示/隐藏按钮
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <ChevronUp
          style={{
            position: "fixed",
            cursor: "pointer",
            bottom: "50px",
            right: "50px",
            zIndex: "1000",
            borderRadius: "50%", // 圆形按钮
            backgroundColor: theme == "dark" ? "#2F2F2F" : "", // 按钮背景颜色
            width: "50px", // 明确设置相等的宽度和高度
            height: "50px",
            padding: "9px", // 确保没有 padding 影响
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 5px 12px rgba(0, 0, 0, 0.09)", // 按钮阴影
          }}
          onClick={scrollToTop}
          size={14}
        />
      )}
    </>
  );
};

export default ScrollToTop;
