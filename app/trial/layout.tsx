import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trial - CoinView Today",
  openGraph: {
    title: "Trial - CoinView Today",
    url: "https://www.coinview.today/trial",
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
