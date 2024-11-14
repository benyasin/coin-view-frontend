export const metadata = {
  title: "Detail Page Title",
  description: "Description for detail page",
  openGraph: {
    title: "Detail Page Title",
    description: "Description for detail page",
    images: [
      {
        url: "URL to the detail page image",
        width: 800,
        height: 800,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Detail Page Title",
    description: "Description for detail page",
    images: ["URL to the detail page image"],
  },
};
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
