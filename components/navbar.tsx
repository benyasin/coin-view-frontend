"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { TwitterIcon, LanguageIcon } from "@/components/icons";
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
import { getUserInfo } from "@/actions/api";

export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  const { setLocale } = useContext(LanguageContext);
  const intl = useIntl();
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

    const fetchData = async () => {
      try {
        const { data } = await getUserInfo();
        if (data) {
          setUser(data);
        }
      } catch (error) {
        // @ts-ignore
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized: Invalid token or Token has expired");
        } else {
          // @ts-ignore
          console.error("An unexpected error occurred:", error.message);
        }
      }
    };

    fetchData();
  }, []);

  const handleSelectionChange = (keys: any) => {
    const selectedKeys = new Set<string>(keys);
    setSelectedKeys(selectedKeys);
    const selectedLocale = Array.from(keys)[0];
    setLocale(selectedLocale as any);
    localStorage.setItem("coinViewLang", selectedLocale as string);
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
          base: ["nextui-navbar", "px-16", "py-2", "border-b-1"],
        }}
        position="sticky"
      >
        <NavbarContent
          className="max-w-[1280px] basis-1/5 sm:basis-full"
          justify="start"
        >
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
          </NextLink>
          <ul className="hidden lg:flex gap-6 justify-start ml-12">
            <NavbarItem key="1" className="text-default-400">
              <Link
                color="foreground"
                className="text-large"
                href="/pricing#premium"
              >
                {intl.formatMessage({ id: "upgrade_to_premium" })}
              </Link>
            </NavbarItem>
            <NavbarItem key="2" className="text-default-400">
              <Link
                color="foreground"
                className="text-large"
                href="/pricing#faq"
              >
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

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
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
            <Link isExternal aria-label="Twitter" href="">
              <TwitterIcon size={20} className="text-default-500" />
            </Link>
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>
      </NextUINavbar>
    </>
  );
};
