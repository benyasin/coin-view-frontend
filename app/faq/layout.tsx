import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - CoinView",
  openGraph: {
    title: "FAQ - CoinView",
    url: "https://www.coinview.today/faq",
    images: [
      {
        url: "https://www.coinview.today/coinview-premium.png",
        width: 800,
        height: 600,
        alt: "FAQ OG Image",
      },
    ],
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
}
