import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { LanguageProvider } from "@/components/language-provider";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: "CoinView",
    template: `%s - CoinView`,
  },
  description: "",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <LanguageProvider>
          <Providers
            themeProps={{
              children: null,
              attribute: "class",
              defaultTheme: "dark",
            }}
          >
            <div className="relative flex flex-col h-screen items-center">
              <Navbar />
              <main className="container mx-auto max-w-[1280px] pt-16 px-6 flex-grow">
                {children}
              </main>
              <footer className="max-w-[1280px] text-xl w-full flex items-center justify-between py-6 px-24 mt-60">
                <div className="text-default-400">
                  For support related to your account, contact
                  support@coinview.com
                </div>
                <div className="text-default-400">
                  © 2024 CoinView. All rights reserved
                </div>
              </footer>
            </div>
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
