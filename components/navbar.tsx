"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Link,
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
import { deleteAuthCookie, getUserInfo } from "@/actions/api";
import { getCache, setCache } from "@/helpers/store";
import { EventBus } from "@/helpers/events";
import { MenuIcon } from "lucide-react"; // 导入MenuIcon

export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginDialog, setShowLoginDialog] = useState("");
  const { setLocale } = useContext(LanguageContext);
  const intl = useIntl();
  const [locale, setLocaleState] = useState<string>(intl.locale); // 默认从 Intl 获取语言
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(
    new Set([intl.locale])
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const timeout = setTimeout(() => {
      const cachedUser = getCache("user");
      if (cachedUser) {
        setUser(cachedUser);
      } else {
        getUserInfo().then((data) => {
          if (data) {
            if (data.description == "Cookie token expired") {
              console.log("Cookie token expired");
              deleteAuthCookie();
              location.href = "/";
            }

            setUser(data.data);
            setCache("user", data.data); // 缓存数据
          }
        });
      }
    }, 10); // 延迟 10ms 获取缓存

    // 定义监听器函数
    const handleShowLoginDialog = (open: any) => {
      setShowLoginDialog(open);
      open && onOpen();
    };

    // 注册事件监听器
    EventBus.on("showLoginDialog", handleShowLoginDialog);

    return () => {
      clearTimeout(timeout); // 清除定时器
      EventBus.off("showLoginDialog", handleShowLoginDialog); // 移除事件监听器
    };
  }, []);

  const handleSelectionChange = (keys: any) => {
    const selectedKeys = new Set<string>(keys);
    setSelectedKeys(selectedKeys);
    const selectedLocale = Array.from(keys)[0];
    setLocale(selectedLocale as any);
    localStorage.setItem("coinViewLang", selectedLocale as string);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
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
      <NextUINavbar
        classNames={{
          base: ["nextui-navbar", "lg:px-16", "border-b-1"],
        }}
        position="sticky"
        isMenuOpen={isMenuOpen}
      >
        <div className="sm:hidden h-auto mr-2" onClick={toggleMenu}>
          <MenuIcon className="h-6 w-6" />
        </div>
        <NavbarContent
          className="max-w-[1280px] basis-1/5 sm:basis-full"
          justify="start"
        >
          <NextLink
            className="flex justify-start items-center gap-1"
            href="/"
            onClick={() => setIsMenuOpen(false)}
          >
            <Logo />
          </NextLink>
          <ul className="hidden md:flex gap-6 justify-start ml-12">
            <NavbarItem key="1" className="text-default-400">
              <Link color="foreground" className="text-large" href="/pricing">
                {intl.formatMessage({ id: "upgrade_to_premium" })}
              </Link>
            </NavbarItem>
            <NavbarItem key="2" className="text-default-400">
              <Link color="foreground" className="text-large" href="/faq">
                {intl.formatMessage({ id: "faq" })}
              </Link>
            </NavbarItem>
            {user ? (
              <NavbarItem key="4" className="text-default-400">
                <Link
                  color="foreground"
                  className="text-large"
                  href="/dashboard"
                >
                  {intl.formatMessage({ id: "dashboard" })}
                </Link>
              </NavbarItem>
            ) : (
              <NavbarItem
                key="4"
                className="md:flex text-foreground text-large cursor-pointer"
                onClick={onOpen}
              >
                {intl.formatMessage({ id: "login" })}
              </NavbarItem>
            )}
          </ul>
        </NavbarContent>

        <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
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
              <DropdownItem key="zh">中文</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Link
            isExternal
            aria-label="Twitter"
            href="https://x.com/coinview_today"
          >
            <TwitterIcon size={20} className="text-default-500" />
          </Link>
          <Link
            isExternal
            aria-label="Telegram"
            href="https://t.me/coinview_cs"
          >
            <TelegramIcon size={20} className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarContent>

        <NavbarMenu>
          <NavbarMenuItem key="1" className="text-default-400">
            <Link
              color="foreground"
              className="text-large"
              href="/pricing"
              onPress={() => setIsMenuOpen(false)}
            >
              {intl.formatMessage({ id: "upgrade_to_premium" })}
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem key="2" className="text-default-400">
            <Link
              color="foreground"
              className="text-large"
              href="/faq"
              onPress={() => setIsMenuOpen(false)}
            >
              {intl.formatMessage({ id: "faq" })}
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem key="4" className="text-default-400">
            {user ? (
              <Link
                color="foreground"
                className="text-large"
                href="/dashboard"
                onPress={() => setIsMenuOpen(false)}
              >
                {intl.formatMessage({ id: "dashboard" })}
              </Link>
            ) : (
              <div
                className="md:flex text-foreground text-large cursor-pointer"
                onClick={() => {
                  onOpen();
                  setIsMenuOpen(false);
                }}
              >
                {intl.formatMessage({ id: "login" })}
              </div>
            )}
          </NavbarMenuItem>
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};
