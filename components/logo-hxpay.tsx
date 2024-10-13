"use client";

import Image from "next/image";
import hxpay from "../public/hxpay.png";
import hxpay_dark from "../public/hxpay-dark.png";
import hxpay_dark_zh from "../public/hxpay-dark-zh.png";
import hxpay_zh from "../public/hxpay-zh.png";
import { useIsSSR } from "@react-aria/ssr";
import { useTheme } from "next-themes";
import { useIntl } from "react-intl";

export const LogoHxpay = () => {
  const intl = useIntl();
  const isSSR = useIsSSR();
  const { theme } = useTheme();
  return (
    <Image
      width={360}
      height={36}
      src={
        theme == "dark" || isSSR
          ? intl.locale == "zh"
            ? hxpay_dark_zh
            : hxpay_dark
          : intl.locale == "zh"
          ? hxpay_zh
          : hxpay
      }
      alt="hxpay"
      loading="lazy"
    />
  );
};
