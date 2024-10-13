import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy - CoinView Today",
  openGraph: {
    title: "Privacy - CoinView Today",
    url: "https://www.coinview.today/privacy",
  },
};

export default function PrivacyLayout({
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
