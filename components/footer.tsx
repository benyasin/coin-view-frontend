"use client";

import { useIntl } from "react-intl";

export const Footer = () => {
  const intl = useIntl();

  return (
    <footer className="max-w-[1280px] text-large w-full flex items-center justify-between py-6 px-24 mt-28">
      <div className="text-default-400">
        {intl.formatMessage({ id: "contact_email" })} support@coinview.com
      </div>
      <div className="text-default-400">
        © 2024 CoinView. {intl.formatMessage({ id: "all_right_reserved" })}
      </div>
    </footer>
  );
};
