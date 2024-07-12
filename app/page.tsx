import { title, subtitle } from "@/components/primitives";
import YouTubeEmbed from "@/components/youtube-embed";
import YouTubeList from "@/components/youtube-list";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Predictive&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>analysis&nbsp;</h1>
        <br />
        <h1 className={title()}>
          tool for crypto trends based on YouTube analysts and other index
        </h1>
        {/*<h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>*/}
      </div>
      </section>
      <section>
        <div className="mt-8">
          <YouTubeList />
        </div>
      </section>
    </>
  );
}
