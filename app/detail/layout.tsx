import { headers } from "next/headers";

export async function generateMetadata() {
  const lang = headers().get("x-locale") || "en";

  return lang === "zh"
    ? {
        title: "分析详情 - CoinView Today",
        openGraph: {
          title: "分析详情 - CoinView Today",
          url: "https://www.coinview.today/zh/detail",
        },
      }
    : {
        title: "Detail - CoinView Today",
        openGraph: {
          title: "Detail - CoinView Today",
          url: "https://www.coinview.today/detail",
        },
      };
}

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
