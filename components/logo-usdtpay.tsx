"use client";

import Image from "next/image";
import usdtpay from "../public/usdtpay.png";
import usdtpay_dark from "../public/usdtpay-dark.png";
import { useIsSSR } from "@react-aria/ssr";
import { useTheme } from "next-themes";
import { useIntl } from "react-intl";

export const LogoUsdtpay = () => {
  const isSSR = useIsSSR();
  const { theme } = useTheme();
  return (
    <Image
      width={180}
      height={36}
      src={theme == "dark" || isSSR ? usdtpay_dark : usdtpay}
      alt="usdtpay"
      loading="lazy"
    />
  );
};
