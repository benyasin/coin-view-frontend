import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium - CoinView Today",
  openGraph: {
    title: "Premium - CoinView Today",
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

export default function PremiumLayout({
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
