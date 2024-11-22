import { headers } from "next/headers";

export async function generateMetadata() {
  const lang = headers().get("x-locale") || "en";

  return lang === "zh"
    ? {
        title: "管理后台 - 今日币看",
        openGraph: {
          title: "管理后台 - 今日币看",
          url: "https://www.coinview.today/zh/admin",
        },
      }
    : {
        title: "Admin - CoinView Today",
        openGraph: {
          title: "Admin - CoinView Today",
          url: "https://www.coinview.today/admin",
        },
      };
}

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
