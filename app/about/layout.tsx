import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - CoinView Today",
  openGraph: {
    title: "About - CoinView Today",
    url: "https://www.coinview.today/about",
  },
};

export default function AboutLayout({
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
