import { title, subtitle } from "@/components/primitives";
import YouTubeEmbed from "@/components/youtobe-embed";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Predictive&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>analysis&nbsp;</h1>
        <br />
        <h1 className={title()}>
          tool for crypto trends based on YouTube analysts and Greed-Fear index
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>
      </div>
      <div className="mt-8">
        <YouTubeEmbed videoId="SSq0jCYGRnU" />
      </div>
    </section>
  );
}
