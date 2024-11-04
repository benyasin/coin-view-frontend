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
import { ThemeSwitch2 } from "@/components/theme-switch2";
import { Logo } from "@/components/logo";
import NextLink from "next/link"; // 假设你已经有 Logo 组件

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
    <footer className="max-w-[1280px] text-medium md:text-large w-full md:mt-32">
      <div className="flex flex-col md:flex-row justify-between py-8 px-6">
        <NextLink
          className="hidden md:flex justify-start items-center gap-1 -mt-[4%]"
          href={process.env.DOMAIN_BASE_URL + "/"}
        >
          <Logo />
        </NextLink>

        {/* legal_disclosures */}
        <div className="mt-8 px-4 md:px-0">
          <h3 className="text-default-500 font-bold mb-2">
            {intl.formatMessage({ id: "legal_disclosures" })}
          </h3>
          <ul className="text-default-400 flex flex-row justify-between md:flex-col flex-wrap">
            <li>
              <NextLink href={process.env.DOMAIN_BASE_URL + "/disclaimer"}>
                {intl.formatMessage({ id: "disclaimer" })}
              </NextLink>
            </li>
            {/*            <li>
              <NextLink href={process.env.DOMAIN_BASE_URL + "/terms"}>
                {intl.formatMessage({ id: "terms_of_use" })}
              </NextLink>
            </li>*/}
            <li>
              <NextLink href={process.env.DOMAIN_BASE_URL + "/privacy"}>
                {intl.formatMessage({ id: "privacy_policy" })}
              </NextLink>
            </li>
          </ul>
        </div>

        {/* company */}
        <div className="mt-8 px-4 md:px-0">
          <h3 className="text-default-500 font-bold mb-2">
            {intl.formatMessage({ id: "company" })}
          </h3>
          <ul className="text-default-400 flex flex-row justify-between md:flex-col flex-wrap">
            <li>
              <NextLink href="/about">
                {intl.formatMessage({ id: "about_us" })}
              </NextLink>
            </li>
            <li>
              <NextLink href="mailto:contact@coinview.today">
                {intl.formatMessage({ id: "contact_us" })}
              </NextLink>
            </li>
          </ul>
        </div>

        {/* donation */}
        <div className="mt-8 px-4 md:px-0">
          <h3 className="text-default-500 font-bold mb-2">
            {intl.formatMessage({ id: "donation" })}
          </h3>
          <ul className="text-default-400 flex flex-row justify-between md:flex-col flex-wrap">
            <li>
              <NextLink href="/donate?coin=USDT">USDT</NextLink>
            </li>
          </ul>
        </div>

        {/* community */}
        <div className="mt-8 px-4 md:px-0">
          <h3 className="text-default-500 font-bold mb-2">
            {intl.formatMessage({ id: "community" })}
          </h3>
          <ul className="text-default-400 flex flex-row justify-between md:flex-col flex-wrap">
            <li>
              <Link
                className="text-default-400"
                aria-label="Twitter"
                href="https://x.com/coinview_today"
              >
                {intl.formatMessage({ id: "x" })}
              </Link>
            </li>
            <li>
              <Link
                className="text-default-400"
                aria-label="Telegram"
                href="https://t.me/CoinViewCS"
              >
                {intl.formatMessage({ id: "telegram" })}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between py-6 px-6 border-t-1 border-default-foreground/10">
        <div className="text-default-500">
          <div>
            © 2024 CoinView.Today &nbsp;&nbsp;
            {intl.formatMessage({ id: "all_right_reserved" })}
          </div>
        </div>
        <div className="text-default-500 flex items-center justify-between">
          <Dropdown className="min-w-[100px] ml-4">
            <DropdownTrigger>
              <div className="flex items-center justify-between">
                <Button isIconOnly variant="light" className="capitalize ml-4">
                  <LanguageIcon size={20} />
                </Button>
                <span className="cursor-pointer">
                  {intl.locale == "en" ? "English" : "简体中文"}
                </span>
              </div>
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
              <DropdownItem key="zh">简体中文</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <ThemeSwitch2 className="ml-6" />
        </div>
      </div>
    </footer>
  );
};
