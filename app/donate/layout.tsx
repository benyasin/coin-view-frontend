import { headers } from "next/headers";

export async function generateMetadata() {
  const lang = headers().get("x-locale") || "en";

  return lang === "zh"
    ? {
        title: "捐赠 - CoinView Today",
        openGraph: {
          title: "捐赠 - CoinView Today",
          url: "https://www.coinview.today/zh/donate",
        },
      }
    : {
        title: "Donate - CoinView Today",
        openGraph: {
          title: "Donate - CoinView Today",
          url: "https://www.coinview.today/donate",
        },
      };
}

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
