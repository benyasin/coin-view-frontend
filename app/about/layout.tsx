import { Metadata } from "next";

export async function generateMetadata(props: any) {
  console.log("generateMetadata: props", props);
  return {
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
