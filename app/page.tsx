import { title, subtitle } from "@/components/primitives";
import { PieKline } from "@/components/pie-kline";
import { TimeSelect } from "@/components/time-select";
import YoutubeTab from "@/components/youtube-tab";
import { Background } from "@/components/background";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-12 md:py-10">
        <div className="inline-block max-w-[690px] text-center justify-center">
          <h2 style={{ lineHeight: "1.2" }} className={title()}>
            An&nbsp;
          </h2>
          <h2
            style={{ lineHeight: "1.2" }}
            className={title({ color: "violet" })}
          >
            AI-powered&nbsp;
          </h2>
          <h2 style={{ lineHeight: "1.2" }} className={title()}>
            tool for extracting and analyzing sentiment from YouTube videos
            to&nbsp;
          </h2>
          <h2
            style={{ lineHeight: "1.2" }}
            className={title({ color: "violet" })}
          >
            predict&nbsp;
          </h2>
          <h2 style={{ lineHeight: "1.2" }} className={title()}>
            cryptocurrency trends
          </h2>
        </div>
      </section>
      {/*基于AI技术对YouTube视频内容进行提炼与情绪分析，从而预测加密市场走势的工具*/}
      <section className="text-3xl font-semibold ml-16 mt-16">
        {/*Bullish & Bearish Probability*/}
      </section>
      <section>
        <div className="mt-8 relative">
          <PieKline />
          <div className="absolute top-20 right-16">
            <TimeSelect />
          </div>
        </div>
      </section>
      <section className="text-3xl font-semibold ml-16 mt-20 mb-8">
        YouTube Analysis Results
      </section>
      <section>
        <div className="mt-8 px-16">
          <YoutubeTab />
        </div>
      </section>
    </>
  );
}
