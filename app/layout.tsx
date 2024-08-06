import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { LanguageProvider } from "@/components/language-provider";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
              <Footer />
            </div>
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
