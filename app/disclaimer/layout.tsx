import { headers } from "next/headers";

export async function generateMetadata() {
  const lang = headers().get("x-locale") || "en";

  return lang === "zh"
    ? {
        title: "免责声明 - 今日币看",
        openGraph: {
          title: "免责声明 - 今日币看",
          url: "https://www.coinview.today/zh/disclaimer",
        },
      }
    : {
        title: "Disclaimer - CoinView Today",
        openGraph: {
          title: "Disclaimer - CoinView Today",
          url: "https://www.coinview.today/disclaimer",
        },
      };
}

export default function DisclaimerLayout({
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
