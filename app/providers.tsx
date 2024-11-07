"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { IntlProvider } from "@/components/IntlProvider";
import { MessageFormatElement } from "react-intl";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  locale: string;
  messages: Record<string, string> | Record<string, MessageFormatElement[]>;
}

export function Providers({
  children,
  themeProps,
  locale,
  messages,
}: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <IntlProvider locale={locale}>{children}</IntlProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
