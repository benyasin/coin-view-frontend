"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useIntl } from "react-intl";
import { usePathname } from "next/navigation";
import {
  getLocalizedPathname,
  getLocalizedUrl,
} from "@/helpers/getLocalizedUrl";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  ListCollapse,
} from "lucide-react";

type MenuProps = {
  locale: string;
};

const Menu: React.FC<MenuProps> = ({ locale }) => {
  const intl = useIntl();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 菜单项配置
  const menuItems = [
    {
      title: intl.formatMessage({ id: "menu_profile" }),
      url: getLocalizedUrl("/dashboard/profile", locale),
      icon: "👤",
    },
    {
      title: intl.formatMessage({ id: "menu_setting" }),
      url: getLocalizedUrl("/dashboard/setting", locale),
      icon: "⚙️",
    },
    {
      title: intl.formatMessage({ id: "menu_customize" }),
      url: getLocalizedUrl("/dashboard/customize", locale),
      icon: "🎨",
    },
    {
      title: intl.formatMessage({ id: "menu_viewpoint" }),
      url: getLocalizedUrl("/dashboard/viewpoint", locale),
      icon: "💬",
    },
    {
      title: intl.formatMessage({ id: "menu_prediction" }),
      url: getLocalizedUrl("/dashboard/prediction", locale),
      icon: "📊",
    },
  ];

  useEffect(() => {
    // 判断是否为小屏设备
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

  return (
    <div className={isMobile ? "relative" : "relative w-1/5"}>
      {isMobile && (
        <button
          className="fixed top-24 left-4 z-50 bg-[var(--menu-button-bg)] text-white p-2 rounded-lg shadow-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ArrowLeftFromLine /> : <ArrowRightFromLine />}
        </button>
      )}

      <aside
        className={`${
          isMobile
            ? `fixed top-24 left-0 h-[calc(100%-4rem)] w-3/5 bg-[var(--menu-bg)] p-6 shadow-lg z-40 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300`
            : "h-[calc(100%-4rem)] w-full bg-[var(--menu-bg)] p-6 shadow-lg"
        }`}
      >
        {/* 标题 */}
        <h2 className="text-2xl font-bold mb-8 text-center tracking-wide text-[var(--menu-title-color)]">
          {intl.formatMessage({ id: "dashboard_title" })}
        </h2>

        {/* 菜单列表 */}
        <ul className="space-y-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.url}
                className={`flex items-center gap-4 py-2 px-3 rounded-lg text-lg font-medium transition-all duration-300 ${
                  pathname === getLocalizedPathname(item.url)
                    ? "bg-[var(--menu-selected-bg)] text-[var(--menu-selected-text)] shadow-md"
                    : "bg-[var(--menu-item-bg)] text-[var(--menu-item-text)] hover:bg-[var(--menu-hover-bg)] hover:text-[var(--menu-hover-text)]"
                }`}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* 背景遮罩（仅限于 Mobile 下可见） */}
      {isMobile && isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* 主内容区域 */}
      <main
        className={`transition-all duration-300 ${
          isMobile
            ? isOpen
              ? "ml-0 w-[calc(100%-4rem)]"
              : "ml-0 w-full"
            : "ml-[20%] w-[80%]"
        }`}
      >
        {/* 主要内容占满宽度 */}
        <div className="p-4">{/* 放置主要内容 */}</div>
      </main>
    </div>
  );
};

export default Menu;
