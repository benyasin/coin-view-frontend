import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms - CoinView Today",
  openGraph: {
    title: "Terms - CoinView Today",
    url: "https://www.coinview.today/terms",
  },
};

export default function TermsLayout({
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
