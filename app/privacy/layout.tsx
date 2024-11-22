import { headers } from "next/headers";

export async function generateMetadata() {
  const lang = headers().get("x-locale") || "en";

  return lang === "zh"
    ? {
        title: "隐私条款 - 今日币看",
        openGraph: {
          title: "隐私条款 - 今日币看",
          url: "https://www.coinview.today/zh/privacy",
        },
      }
    : {
        title: "Privacy - CoinView Today",
        openGraph: {
          title: "Privacy - CoinView Today",
          url: "https://www.coinview.today/privacy",
        },
      };
}

export default function PrivacyLayout({
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
