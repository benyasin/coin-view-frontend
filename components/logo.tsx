"use client";

import Image from "next/image";
import logo from "../public/logo.png";
import logoDark from "../public/logo-dark.png";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";

export const Logo = () => {
  const { theme } = useTheme();
  const isSSR = useIsSSR();
  return (
    <Image
      width={130}
      src={theme === "dark" || isSSR ? logo : logoDark}
      alt="Logo"
      priority
    />
  );
};
