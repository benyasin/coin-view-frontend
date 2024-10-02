import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium - CoinView",
  openGraph: {
    title: "Premium - CoinView",
    url: "https://www.coinview.today/premium",
    images: [
      {
        url: "https://www.coinview.today/coinview-premium.png",
        width: 800,
        height: 600,
        alt: "Premium OG Image",
      },
    ],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
}
