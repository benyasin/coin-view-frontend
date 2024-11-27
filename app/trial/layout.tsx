import { headers } from "next/headers";

export async function generateMetadata() {
  const lang = headers().get("x-locale") || "en";

  return lang === "zh"
    ? {
        title: "试用 - CoinView Today",
        openGraph: {
          title: "试用 - CoinView Today",
          url: "https://www.coinview.today/zh/trial",
        },
      }
    : {
        title: "Trial - CoinView Today",
        openGraph: {
          title: "Trial - CoinView Today",
          url: "https://www.coinview.today/trial",
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
