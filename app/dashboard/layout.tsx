import { headers } from "next/headers";

export async function generateMetadata() {
  const lang = headers().get("x-locale") || "en";

  return lang === "zh"
    ? {
        title: "控制面板 - 今日币看",
        openGraph: {
          title: "控制面板 - 今日币看",
          url: "https://www.coinview.today/zh/dashboard",
        },
      }
    : {
        title: "Dashboard - CoinView Today",
        openGraph: {
          title: "Dashboard - CoinView Today",
          url: "https://www.coinview.today/dashboard",
        },
      };
}

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
