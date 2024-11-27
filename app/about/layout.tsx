import { headers } from "next/headers";

export async function generateMetadata() {
  const lang = headers().get("x-locale") || "en";

  return lang === "zh"
    ? {
        title: "关于我们 - CoinView Today",
        openGraph: {
          title: "关于我们 - CoinView Today",
          url: "https://www.coinview.today/zh/about",
        },
      }
    : {
        title: "About - CoinView Today",
        openGraph: {
          title: "About - CoinView Today",
          url: "https://www.coinview.today/about",
        },
      };
}

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
