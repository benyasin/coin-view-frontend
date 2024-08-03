"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  DiscordIcon,
  SearchIcon,
  LanguageIcon,
} from "@/components/icons";
import { Logo } from "@/components/logo";
import { AvatarDropdown } from "@/components/avatar-dropdown";
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
import React, { useEffect, useState } from "react";
import { Register } from "@/components/register";

export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

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
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo />
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-6 justify-start ml-12">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href} className="font-semibold">
                <NextLink
                  className={clsx(
                    linkStyles({ size: "lg", color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light" className="capitalize">
                  <LanguageIcon />
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
              href={siteConfig.links.twitter}
            >
              <TwitterIcon className="text-default-500" />
            </Link>
            <ThemeSwitch />
          </NavbarItem>
          {user ? (
            <NavbarItem className="md:flex cursor-pointer">
              <AvatarDropdown />
            </NavbarItem>
          ) : (
            <NavbarItem
              className="md:flex font-semibold text-xl cursor-pointer"
              onClick={onOpen}
            >
              Login
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};
