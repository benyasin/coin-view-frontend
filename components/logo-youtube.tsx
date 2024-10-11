"use client";

import Image from "next/image";
import youtube from "../public/youtube.png";
import youtube_dark from "../public/youtube-dark.png";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { useIntl } from "react-intl";

export const LogoYoutube = () => {
  const intl = useIntl();
  const isSSR = useIsSSR();
  const { theme } = useTheme();
  return (
    <Image
      width={intl.locale == "zh" ? 120 : 130}
      height={76}
      src={theme == "dark" || isSSR ? youtube_dark : youtube}
      alt="youtube"
      loading="lazy"
    />
  );
};
