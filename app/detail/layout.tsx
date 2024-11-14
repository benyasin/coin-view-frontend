import Head from "next/head";

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Detail Page Title</title>
        <meta name="description" content="Description for detail page" />
        <meta property="og:title" content="Detail Page Title" />
        <meta property="og:description" content="Description for detail page" />
        <meta property="og:image" content="URL to the detail page image" />
        {/* 添加其他 meta 信息 */}
      </Head>
      <section>
        <div>{children}</div>
      </section>
    </>
  );
}
