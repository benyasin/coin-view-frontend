"use client";

import Image from "next/image";
import binance from "../public/binance.png";
import binance_en from "../public/binance_en.png";
import { useIsSSR } from "@react-aria/ssr";
import { useIntl } from "react-intl";

export const LogoBinance = () => {
  const intl = useIntl();
  const isSSR = useIsSSR();
  return (
    <Image
      width={intl.locale == "zh" ? 110 : 200}
      src={intl.locale == "zh" ? binance : binance_en}
      alt="binance"
      loading="lazy"
    />
  );
};
