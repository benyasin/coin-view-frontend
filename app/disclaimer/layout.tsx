import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer - CoinView Today",
  openGraph: {
    title: "Disclaimer - CoinView Today",
    url: "https://www.coinview.today/disclaimer",
  },
};

export default function DisclaimerLayout({
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
