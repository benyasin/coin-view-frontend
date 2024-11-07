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
      <head>
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
        <title>{messages["title"]}</title>
        <meta name="description" content={messages["slogan"]} />
        <meta property="og:title" content={messages["title"]} />
        <meta property="og:description" content={messages["slogan"]} />
        <meta property="og:url" content={messages["net_url"]} />
        <meta property="og:site_name" content={messages["title"]} />
        <meta
          property="og:image"
          content={"https://www.coinview.today/coinview-home.png"}
        />
        <meta property="og:image:width" content={"800"} />
        <meta property="og:image:height" content={"800"} />
        <meta property="og:type" content={"website"} />
        <meta name="twitter:card" content={"summary_large_image"} />
        <meta name="twitter:title" content={messages["title"]} />
        <meta name="twitter:description" content={messages["slogan"]} />
        <meta
          name="twitter:image"
          content={"https://www.coinview.today/coinview-x.png"}
        />
      </head>
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
