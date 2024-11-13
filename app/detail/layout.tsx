import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail - CoinView Today",
  openGraph: {
    title: "Detail - CoinView Today",
    url: "https://www.coinview.today/detail",
  },
};

export default function DetailLayout({
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
