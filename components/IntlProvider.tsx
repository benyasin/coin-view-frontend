import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";

const messages: { [key: string]: any } = {
  en: require("../locales/en.json"),
  zh: require("../locales/zh.json"),
};

interface Props {
  children: React.ReactNode;
  locale: string;
}

export const IntlProvider = ({ children, locale }: Props) => {
  const currentMessages = messages[locale as keyof typeof messages];
  return (
    <ReactIntlProvider locale={locale} messages={currentMessages}>
      {children}
    </ReactIntlProvider>
  );
};
