"use client";

import React, { useState } from "react";

export const LanguageContext = React.createContext({
  locale: "en",
  setLocale: (locale: string) => {},
});

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locale, setLocale] = useState("en");

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};
