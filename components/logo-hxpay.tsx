"use client";

import Image from "next/image";
import hxpay from "../public/hxpay.png";
import { useIsSSR } from "@react-aria/ssr";
import { useTheme } from "next-themes";
import { useIntl } from "react-intl";

export const LogoHxpay = () => {
  const intl = useIntl();
  const isSSR = useIsSSR();
  const { theme } = useTheme();
  return (
    <div className="flex flex-row flex-nowrap justify-center items-center">
      <Image width={36} height={36} src={hxpay} alt="hxpay" loading="lazy" />
      <span className="text-4xl font-semibold ml-2">
        {intl.formatMessage({ id: "collection_platform" })}
      </span>
    </div>
  );
};
