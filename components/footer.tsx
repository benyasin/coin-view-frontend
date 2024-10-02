"use client";

import { useIntl } from "react-intl";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { LanguageIcon, TelegramIcon, TwitterIcon } from "@/components/icons";
import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/components/language-provider";
import { ThemeSwitch } from "@/components/theme-switch";

export const Footer = () => {
  const intl = useIntl();
  const { setLocale } = useContext(LanguageContext);
  const [locale, setLocaleState] = useState<string>(intl.locale); // 默认从 Intl 获取语言
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(
    new Set([intl.locale])
  );

  // 使用 useEffect 确保在客户端执行 localStorage 操作
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("coinViewLang");
      if (storedLang) {
        setLocale(storedLang as any);
        setLocaleState(storedLang); // 更新状态中的语言
        setSelectedKeys(new Set([storedLang]));
      }
    }
  }, []);

  const handleSelectionChange = (keys: any) => {
    const selectedKeys = new Set<string>(keys);
    setSelectedKeys(selectedKeys);
    const selectedLocale = Array.from(keys)[0];
    setLocale(selectedLocale as any);
    localStorage.setItem("coinViewLang", selectedLocale as string);
  };

  return (
    <footer className="max-w-[1280px] text-medium md:text-large w-full flex flex-col-reverse md:flex-row items-center justify-between py-6 px-12 mt-28">
      <div className="text-default-500">
        <div>
          © 2024 CoinView.Today &nbsp;&nbsp;
          {intl.formatMessage({ id: "all_right_reserved" })}
        </div>
      </div>
      <div className="text-default-500">
        <Dropdown className="min-w-[100px] ml-4">
          <DropdownTrigger>
            <Button isIconOnly variant="light" className="capitalize ml-4">
              <LanguageIcon size={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
          >
            <DropdownItem key="en">English</DropdownItem>
            <DropdownItem key="zh">中文</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Link
          isExternal
          aria-label="Twitter"
          href="https://x.com/coinview_today"
        >
          <TwitterIcon size={20} className="text-default-500 ml-4" />
        </Link>
        <Link isExternal aria-label="Telegram" href="https://t.me/coinview_cs">
          <TelegramIcon size={20} className="text-default-500 ml-4" />
        </Link>
        <ThemeSwitch className="ml-4" />
      </div>
    </footer>
  );
};
