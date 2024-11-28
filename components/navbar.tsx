"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Checkbox,
  NavbarMenuToggle,
} from "@nextui-org/react";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { TwitterIcon, LanguageIcon, TelegramIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { Login } from "@/components/login";
import React, { useContext, useEffect, useState } from "react";
import { Register } from "@/components/register";
import { useIntl } from "react-intl";
import { LanguageContext } from "@/components/language-provider";
import {
  deleteAuthCookie,
  fetchLatestAnnouncement,
  getUserInfo,
  saveLang,
  startTrial,
} from "@/actions/api";
import { EventBus } from "@/helpers/events";
import { Crown, Gem, ListOrdered, MenuIcon, Share2 } from "lucide-react"; // 导入MenuIcon
import { getLocalizedUrl } from "@/helpers/getLocalizedUrl";
import Image from "next/image";
import basic_plan_dark from "@/public/basic_plan_dark.png";
import basic_plan from "@/public/basic_plan.png";
import basic_plan_dark_en from "@/public/basic_plan_dark_en.png";
import basic_plan_en from "@/public/basic_plan_en.png";
import { useTheme } from "next-themes";
import toast, { Toaster } from "react-hot-toast";

export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isTrialOpen,
    onOpen: onTrialOpen,
    onOpenChange: onTrialOpenChange,
  } = useDisclosure();
  const [showRegister, setShowRegister] = useState(false);
  const [isRulesChecked, setIsRulesChecked] = useState(false);
  const [isSupportChecked, setIsSupportChecked] = useState(false);
  const [user, setUser] = useState(null);
  const { setLocale } = useContext(LanguageContext);
  const intl = useIntl();
  const [locale, setLocaleState] = useState<string>(intl.locale); // 默认从 Intl 获取语言
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(
    new Set([intl.locale])
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const { theme } = useTheme();

  const usedNotify = () =>
    toast.error(intl.formatMessage({ id: "already_used_trial" }));

  const memberNotify = () =>
    toast.error(intl.formatMessage({ id: "member_cannot_trial" }));

  // 使用 useEffect 确保在客户端执行 localStorage 操作
  useEffect(() => {
    const fetchAnnouncement = async () => {
      const { data } = await fetchLatestAnnouncement(); // 替换为你的 API 地址
      data && setAnnouncement(data.content);
    };

    fetchAnnouncement();

    const timeout = setTimeout(() => {
      getUserInfo().then((data) => {
        if (data) {
          if (data.description == "Cookie token expired") {
            console.log("Cookie token expired");
            deleteAuthCookie();
            location.href = getLocalizedUrl("/", intl.locale);
          }
          setUser(data.data);
        }
      });
    }, 10); // 延迟 10ms 获取缓存

    // 定义监听器函数
    const handleShowLoginDialog = (open: any) => {
      open && onOpen();
    };

    // 注册事件监听器
    EventBus.on("showLoginDialog", handleShowLoginDialog);

    return () => {
      clearTimeout(timeout); // 清除定时器
      EventBus.off("showLoginDialog", handleShowLoginDialog); // 移除事件监听器
    };
  }, []);

  const handleSelectionChange = async (keys: any): Promise<void> => {
    const selectedKeys = new Set<string>(keys);
    setSelectedKeys(selectedKeys);
    const selectedLocale = Array.from(keys)[0];
    setLocale(selectedLocale as any);

    // 保存到用户表中
    await saveLang(selectedLocale as string);
    // 重新构建 URL，防止重复添加 /zh 前缀
    const currentPath: string = window.location.pathname;
    let newPath: string;

    if (selectedLocale === "zh") {
      // 如果当前路径已经以 /zh 开头，就不重复添加
      newPath = currentPath.startsWith("/zh")
        ? currentPath
        : `/zh${currentPath}`;
    } else {
      // 如果选择了英文，移除现有的 /zh 前缀
      newPath = currentPath.replace(/^\/zh/, "");
    }

    // 重定向到新路径
    window.location.href = getLocalizedUrl(newPath, selectedLocale as string);
  };

  const handleStartFreeTrial = async (): Promise<void> => {
    if (!user) {
      EventBus.emit("showLoginDialog", true);
      return;
    }
    if (user["tried_at"]) {
      window.location.href = getLocalizedUrl("/trial", locale);
    } else {
      onTrialOpen();
    }
  };

  const handleStartTrialNow = async (
    callback: (() => void) | undefined
  ): Promise<void> => {
    const { data, response_type } = await startTrial(isSupportChecked);
    if (!data) {
      response_type == "already_used_trial" && usedNotify();
      response_type == "member_cannot_trial" && memberNotify();
    }

    if (callback) {
      callback();
    }

    // 重定向到新路径
    if (data) {
      window.location.href = getLocalizedUrl("/trial", locale);
    }
  };

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement={"center"}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {showRegister
                  ? intl.formatMessage({ id: "sign_up_title" })
                  : intl.formatMessage({ id: "sign_in_title" })}
              </ModalHeader>
              <ModalBody>{showRegister ? <Register /> : <Login />}</ModalBody>
              <ModalFooter>
                {showRegister ? (
                  <div className="font-light text-slate-400 mt-4 text-sm">
                    {intl.formatMessage({ id: "already_have_account_title" })}
                    <span
                      onClick={() => setShowRegister(false)}
                      className="font-bold text-primary-500 cursor-pointer"
                    >
                      {intl.formatMessage({ id: "login_here_title" })}
                    </span>
                  </div>
                ) : (
                  <div className="font-light text-slate-400 mt-4 text-sm">
                    {intl.formatMessage({ id: "have_not_account_title" })}
                    <span
                      className="font-bold text-primary-500 cursor-pointer"
                      onClick={() => setShowRegister(true)}
                    >
                      {intl.formatMessage({ id: "register_here_title" })}
                    </span>
                  </div>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        backdrop="blur"
        size="4xl"
        isOpen={isTrialOpen}
        onOpenChange={onTrialOpenChange}
        isDismissable={false}
        placement={"center"}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {intl.formatMessage({ id: "start_7_days_free_trial_title" })}
              </ModalHeader>
              <ModalBody>
                <div>
                  <h3 className="text-lg font-bold mt-6 flex flex-row justify-start items-center">
                    <Crown size={16} color="gold" />
                    <span className="ml-3">
                      {intl.formatMessage({ id: "trial_benefits_title" })}:
                    </span>
                  </h3>
                  <div>
                    <div className="text-default-500 my-2">
                      {intl.formatMessage({ id: "trial_benefits_description" })}
                    </div>
                    <Image
                      src={
                        theme == "dark"
                          ? locale == "zh"
                            ? basic_plan_dark
                            : basic_plan_dark_en
                          : locale == "zh"
                          ? basic_plan
                          : basic_plan_en
                      }
                      alt="basic plan"
                      className="w-[96%] rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-bold mt-5 flex flex-row justify-start items-center">
                    <ListOrdered size={16} color="green" />
                    <span className="ml-3">
                      {intl.formatMessage({ id: "trial_rules_title" })}:
                    </span>
                  </h3>
                  <ul className="list-decimal pl-5 py-2 text-default-500 ">
                    <li>
                      {intl.formatMessage({ id: "trial_only_for_free_member" })}
                    </li>
                    <li>
                      {intl.formatMessage({ id: "trial_duration_7_days" })}
                    </li>
                    <li>{intl.formatMessage({ id: "trial_end_reminder" })}</li>
                    <li>
                      {intl.formatMessage({
                        id: "no_renewal_downgrade_to_free",
                      })}
                    </li>
                  </ul>
                  <h3 className="text-lg font-bold mt-5 flex flex-row justify-start items-center">
                    <Share2 size={16} color="pink" />
                    <span className="ml-3">
                      {intl.formatMessage({ id: "support_sharing_title" })}:
                    </span>
                  </h3>
                  <ul className="list-disc pl-5 py-2 text-default-500">
                    <li
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage(
                          {
                            id: "share_to_social_platforms",
                          },
                          {
                            x: `<a href="https://twitter.com/share?url=${encodeURIComponent(
                              getLocalizedUrl("/", locale)
                            )}&text=${encodeURIComponent(
                              intl.formatMessage({ id: "title" }) +
                                ", " +
                                intl.formatMessage({ id: "slogan" })
                            )}" 
          class="text-blue-500 underline hover:text-blue-700" 
          target="_blank" 
          rel="noopener noreferrer">
          ${intl.formatMessage({ id: "x" })}
        </a>`,
                          }
                        ),
                      }}
                    ></li>
                    <li
                      dangerouslySetInnerHTML={{
                        __html: intl.formatMessage(
                          {
                            id: "submit_feedback",
                          },
                          {
                            email: `<a class="text-blue-500 underline hover:text-blue-700" href="mailto:contact@coinview.today" target="_blank">${intl.formatMessage(
                              { id: "email" }
                            )}</a>`,
                            telegram: `<a class="text-blue-500 underline hover:text-blue-700" href="https://t.me/CoinViewCS" target="_blank">${intl.formatMessage(
                              { id: "telegram" }
                            )}</a>`,
                          }
                        ),
                      }}
                    ></li>
                  </ul>
                  <div className="mt-6 flex flex-col text-default-500 gap-2">
                    <Checkbox
                      isSelected={isRulesChecked}
                      onChange={() => setIsRulesChecked(!isRulesChecked)}
                    >
                      {intl.formatMessage({ id: "agree_trial_rules" })}
                    </Checkbox>
                    <Checkbox
                      isSelected={isSupportChecked}
                      onChange={() => setIsSupportChecked(!isSupportChecked)}
                    >
                      {intl.formatMessage({ id: "agree_support_sharing" })}
                    </Checkbox>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onClick={onClose} className="mr-4">
                  {intl.formatMessage({ id: "think_again" })}
                </Button>
                <Button
                  color="primary"
                  isDisabled={!isRulesChecked}
                  onClick={() => handleStartTrialNow(onClose)}
                >
                  {intl.formatMessage({ id: "start_trial_now" })}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <NextUINavbar
        classNames={{
          base: ["nextui-navbar", "lg:px-16", "border-b-1", "py-2"],
        }}
        position="sticky"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />

        <NavbarContent
          className="max-w-[1280px] basis-1/5 sm:basis-full"
          justify="start"
        >
          <NavbarItem key="0" className="text-default-400">
            <NextLink
              className="flex justify-start items-center min-w-[120px] -mt-2"
              href={getLocalizedUrl("/", locale)}
              onClick={() => setIsMenuOpen(false)}
            >
              <Logo />
            </NextLink>
          </NavbarItem>
          <ul className="hidden md:flex gap-6 justify-start ml-12">
            <NavbarItem key="1" className="text-default-400">
              <Link
                color="foreground"
                className="text-large"
                href={getLocalizedUrl("#premium", locale)}
              >
                {intl.formatMessage({ id: "upgrade_to_premium" })}
              </Link>
            </NavbarItem>
            <NavbarItem key="2" className="text-default-400">
              <Link
                color="foreground"
                className="text-large"
                href={getLocalizedUrl("#faq", locale)}
              >
                {intl.formatMessage({ id: "faq" })}
              </Link>
            </NavbarItem>
            <NavbarItem key="3" className="text-default-400">
              <Link
                color="foreground"
                className="text-large"
                href={getLocalizedUrl("#partner", locale)}
              >
                {intl.formatMessage({ id: "eco_partner" })}
              </Link>
            </NavbarItem>
            <NavbarItem key="4" className="text-default-400">
              <Link
                color="foreground"
                className="text-large"
                href={getLocalizedUrl("#perspectives", locale)}
              >
                {intl.formatMessage({ id: "perspectives" })}
              </Link>
            </NavbarItem>
            {user ? (
              <NavbarItem key="5" className="text-default-400">
                <Link
                  color="foreground"
                  className="text-large"
                  href={getLocalizedUrl("/dashboard", locale)}
                >
                  {intl.formatMessage({ id: "dashboard" })}
                </Link>
              </NavbarItem>
            ) : (
              <NavbarItem
                key="6"
                className="md:flex text-foreground text-large cursor-pointer"
                onClick={onOpen}
              >
                {intl.formatMessage({ id: "login" })}
              </NavbarItem>
            )}
          </ul>
        </NavbarContent>

        <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
          <Button
            radius="full"
            onClick={() => handleStartFreeTrial()}
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          >
            {intl.formatMessage({ id: "start_free_trial" })}
          </Button>
          <Dropdown className="min-w-[100px]">
            <DropdownTrigger>
              <Button isIconOnly variant="light" className="capitalize">
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
              <DropdownItem key="zh">简体中文</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Link
            isExternal
            className="hidden sm:block"
            aria-label="Twitter"
            href="https://x.com/coinview_today"
          >
            <TwitterIcon size={20} className="text-default-500" />
          </Link>
          <Link
            isExternal
            className="hidden sm:block"
            aria-label="Telegram"
            href="https://t.me/CoinViewCS"
          >
            <TelegramIcon size={20} className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarContent>

        <NavbarMenu className="mt-4">
          <NavbarMenuItem key="1" className="text-default-400">
            <Link
              color="foreground"
              className="text-large py-1"
              href={getLocalizedUrl("#premium", locale)}
              onPress={() => {
                setIsMenuOpen(false);
              }}
            >
              {intl.formatMessage({ id: "upgrade_to_premium" })}
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem key="2" className="text-default-400">
            <Link
              color="foreground"
              className="text-large py-1"
              href={getLocalizedUrl("#faq", locale)}
              onPress={() => setIsMenuOpen(false)}
            >
              {intl.formatMessage({ id: "faq" })}
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem key="3" className="text-default-400">
            <Link
              color="foreground"
              className="text-large py-1"
              href={getLocalizedUrl("#partner", locale)}
              onPress={() => setIsMenuOpen(false)}
            >
              {intl.formatMessage({ id: "eco_partner" })}
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem key="4" className="text-default-400">
            <Link
              color="foreground"
              className="text-large py-1"
              href={getLocalizedUrl("#perspectives", locale)}
              onPress={() => setIsMenuOpen(false)}
            >
              {intl.formatMessage({ id: "perspectives" })}
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem key="5" className="text-default-400">
            {user ? (
              <Link
                color="foreground"
                className="text-large py-1"
                href={getLocalizedUrl("/dashboard", locale)}
                onPress={() => setIsMenuOpen(false)}
              >
                {intl.formatMessage({ id: "dashboard" })}
              </Link>
            ) : (
              <Link
                className="md:flex py-1 text-foreground text-large cursor-pointer"
                onClick={() => {
                  onOpen();
                  setIsMenuOpen(false);
                }}
              >
                {intl.formatMessage({ id: "login" })}
              </Link>
            )}
          </NavbarMenuItem>
        </NavbarMenu>
      </NextUINavbar>
      {/* 公告消息提示条 */}
      {announcement && (
        <div className="w-full bg-gradient-to-r from-purple-500 to-blue-400 text-white text-center py-2 opacity-80 relative">
          <span className="text-sm">{announcement}</span>
          <button
            onClick={() => setAnnouncement(null)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-lg"
          >
            &times;
          </button>
        </div>
      )}
      <Toaster />
    </>
  );
};
