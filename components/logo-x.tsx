"use client";

import Image from "next/image";
import x_dark from "../public/x.png";
import x from "../public/x-dark.png";
import { useIsSSR } from "@react-aria/ssr";
import { useIntl } from "react-intl";
import { useTheme } from "next-themes";

export const LogoX = () => {
  const intl = useIntl();
  const isSSR = useIsSSR();
  const { theme } = useTheme();
  return (
    <div className="flex flex-row items-center">
      <Image
        width={intl.locale == "zh" ? 32 : 32}
        src={theme == "dark" || isSSR ? x_dark : x}
        alt="telegram"
        loading="lazy"
      />
      <div className="text-3xl ml-2">
        {intl.locale == "zh" ? "推特" : "Twitter"}
      </div>
    </div>
  );
};
