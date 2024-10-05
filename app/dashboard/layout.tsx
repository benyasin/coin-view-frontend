import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - CoinView Today",
  openGraph: {
    title: "Dashboard - CoinView Today",
    url: "https://www.coinview.today/dashboard",
    images: [
      {
        url: "https://www.coinview.today/coinview-dashboard.png",
        width: 800,
        height: 600,
        alt: "Dashboard OG Image",
      },
    ],
  },
};

export default function DashboardLayout({
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
