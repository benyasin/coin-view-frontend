import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { LanguageProvider } from "@/components/language-provider";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "CoinView Today",
  description:
    "An AI-powered tool for extracting and analyzing sentiment from YouTube videos to predict cryptocurrency market trends.",
  openGraph: {
    title: "CoinView",
    description:
      "An AI-powered tool for extracting and analyzing sentiment from YouTube videos to predict cryptocurrency market trends.",
    url: "https://www.coinview.today",
    siteName: "CoinView Today",
    images: [
      {
        url: "https://www.coinview.today/coinview-home.png",
        width: 800,
        height: 800,
        alt: "CoinView Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoinView",
    description:
      "An AI-powered tool for extracting and analyzing sentiment from YouTube videos to predict cryptocurrency market trends.",
    images: ["https://www.coinview.today/coinview-x.png"],
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
      </head>
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
