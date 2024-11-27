"use client";

import Image from "next/image";
import telegram from "../public/telegram.png";
import { useIsSSR } from "@react-aria/ssr";
import { useIntl } from "react-intl";

export const LogoTelegram = () => {
  const intl = useIntl();
  const isSSR = useIsSSR();
  return (
    <div className="flex flex-row items-center">
      <Image
        width={intl.locale == "zh" ? 35 : 35}
        src={telegram}
        alt="telegram"
        loading="lazy"
      />
      <div className="text-3xl ml-2">
        {intl.locale == "zh" ? "电报" : "Telegram"}
      </div>
    </div>
  );
};
