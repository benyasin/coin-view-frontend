import "@/styles/globals.css";
import { Viewport } from "next";
import clsx from "clsx";
import { LanguageProvider } from "@/components/language-provider";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Script from "next/script";
import { headers } from "next/headers";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export async function generateMetadata() {
  const locale = headers().get("x-locale") || "en";
  const messages = require(`../locales/${locale}.json`); // 动态加载 messages
  return {
    title: messages["title"],
    description: messages["slogan"],
    openGraph: {
      title: messages["title"],
      description: messages["slogan"],
      url: locale === "zh" ? messages["net_url"] + "/zh" : messages["net_url"],
      type: "website",
      siteName: messages["title"],
      images: [
        {
          url:
            locale === "zh"
              ? "https://www.coinview.today/coinview-home-zh.png"
              : "https://www.coinview.today/coinview-home.png",
          width: 800,
          height: 800,
          alt: messages["slogan"],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@coinview_today",
      title: messages["title"],
      description: messages["slogan"],
      images: [
        locale === "zh"
          ? "https://www.coinview.today/coinview-home-zh.png"
          : "https://www.coinview.today/coinview-home.png",
      ],
    },
  };
}

// @ts-ignore
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = headers().get("x-locale") || "en";
  const messages = require(`../locales/${locale}.json`); // 动态加载 messages
  return (
    <html suppressHydrationWarning lang={locale}>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-VJ4FV2QGY0"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VJ4FV2QGY0');
          `}
      </Script>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="f96cb10e-aaae-4d73-8f6c-73b1c82ab2ab"
      ></Script>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <LanguageProvider>
          <Providers
            locale={locale}
            messages={messages}
            themeProps={{
              children: null,
              attribute: "class",
              defaultTheme: "dark",
            }}
          >
            <div className="relative flex flex-col h-full items-center">
              <Navbar />
              <main className="container mx-auto max-w-[1280px] pt-16 px-6 flex-grow md:min-h-[800px]">
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
