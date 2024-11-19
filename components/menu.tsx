"use client";

import React from "react";
import Link from "next/link";
import { useIntl } from "react-intl";
import { usePathname } from "next/navigation";
import {
  getLocalizedPathname,
  getLocalizedUrl,
} from "@/helpers/getLocalizedUrl";

type MenuProps = {
  locale: string;
};

const Menu: React.FC<MenuProps> = ({ locale }) => {
  const intl = useIntl();
  const pathname = usePathname();
  console.log(pathname);

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

  return (
    <aside className="w-1/7 p-6 rounded-tr-lg rounded-br-lg bg-[var(--menu-bg)] shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center tracking-wide text-[var(--menu-title-color)]">
        {intl.formatMessage({ id: "dashboard_title" })}
      </h2>
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
            >
              <span className="text-2xl">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Menu;
