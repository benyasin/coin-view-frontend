"use client";

import * as React from "react";
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { LanguageContext } from "@/components/language-provider";
import { IntlProvider } from "@/components/IntlProvider";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const { locale } = React.useContext(LanguageContext);

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <IntlProvider locale={locale}>{children}</IntlProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
