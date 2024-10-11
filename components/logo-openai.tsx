"use client";

import Image from "next/image";
import openai from "../public/openai.png";
import openai_dark from "../public/openai-dark.png";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { useIntl } from "react-intl";

export const LogoOpenai = () => {
  const intl = useIntl();
  const isSSR = useIsSSR();
  const { theme } = useTheme();
  return (
    <Image
      width={intl.locale == "zh" ? 120 : 120}
      height={76}
      src={theme == "dark" || isSSR ? openai_dark : openai}
      alt="openai"
      loading="lazy"
    />
  );
};
