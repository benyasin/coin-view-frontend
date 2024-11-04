import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate - CoinView Today",
  openGraph: {
    title: "Terms - CoinView Today",
    url: "https://www.coinview.today/donate",
  },
};

export default function DonateLayout({
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
