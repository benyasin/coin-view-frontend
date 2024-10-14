import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - CoinView Today",
  openGraph: {
    title: "Admin - CoinView Today",
    url: "https://www.coinview.today/admin",
  },
};

export default function AdminLayout({
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
