import { title, subtitle } from "@/components/primitives";
import YouTubeList from "@/components/youtube-list";
import { PieChart } from "@/components/pie-chart";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Predictive&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>analysis&nbsp;</h1>
          <h1 className={title()}>tool</h1>
          <br />
          <h1 className={title()}>
            for crypto trends based on YouTube analysts and other index
          </h1>
        </div>
      </section>
      <section>
        <div className="mt-8">
          <PieChart/>
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
