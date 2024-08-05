"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
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

export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  const { setLocale } = useContext(LanguageContext);
  const intl = useIntl();

  useEffect(() => {
    const storedUser = localStorage.getItem("coinViewUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(
    new Set(["en"])
  );
  const handleSelectionChange = (keys: any) => {
    const selectedKeys = new Set<string>(keys);
    setSelectedKeys(selectedKeys);
    const selectedLocale = Array.from(keys)[0];
    setLocale(selectedLocale as any);
  };

  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {showRegister
                  ? "Sign up with a new account"
                  : "Sign in with your email and password"}
              </ModalHeader>
              <ModalBody>{showRegister ? <Register /> : <Login />}</ModalBody>
              <ModalFooter>
                {showRegister ? (
                  <div className="font-light text-slate-400 mt-4 text-sm">
                    Already have an account ?{" "}
                    <span
                      onClick={() => setShowRegister(false)}
                      className="font-bold text-primary-500 cursor-pointer"
                    >
                      Login here
                    </span>
                  </div>
                ) : (
                  <div className="font-light text-slate-400 mt-4 text-sm">
                    Don&apos;t have an account ?{" "}
                    <span
                      className="font-bold text-primary-500 cursor-pointer"
                      onClick={() => setShowRegister(true)}
                    >
                      Register here
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
          base: ["max-w-[1280px]", "nextui-navbar", "px-16"],
          item: ["text-default-400"],
        }}
        position="sticky"
      >
        <NavbarContent
          className="max-w-[1280px] basis-1/5 sm:basis-full"
          justify="start"
        >
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo size={100} />
          </NextLink>
          <ul className="hidden lg:flex gap-6 justify-start ml-12">
            <NavbarItem key="1" className="font-semibold">
              <NextLink
                className={clsx(
                  linkStyles({ size: "lg", color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href="/premium"
              >
                {intl.formatMessage({ id: "upgrade_to_premium" })}
              </NextLink>
            </NavbarItem>
            <NavbarItem key="2" className="font-semibold">
              <NextLink
                className={clsx(
                  linkStyles({ size: "lg", color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href="/faq"
              >
                {intl.formatMessage({ id: "faq" })}
              </NextLink>
            </NavbarItem>
            <NavbarItem key="3" className="font-semibold">
              <NextLink
                className={clsx(
                  linkStyles({ size: "lg", color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href="/support"
              >
                {intl.formatMessage({ id: "support" })}
              </NextLink>
            </NavbarItem>
            {user ? (
              <NavbarItem key="4" className="font-semibold">
                <NextLink
                  className={clsx(
                    linkStyles({ size: "lg", color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href="/dashboard"
                >
                  {intl.formatMessage({ id: "dashboard" })}
                </NextLink>
              </NavbarItem>
            ) : (
              <NavbarItem
                key="4"
                className="md:flex font-semibold text-large cursor-pointer"
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
                  <LanguageIcon size={21} />
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
              <TwitterIcon className="text-default-500" />
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
