import * as echarts from "echarts";
import { siteConfig } from "@/config/site";

const totalWeight =
  siteConfig.weightBullish +
  siteConfig.weightBearish +
  siteConfig.weightNeutral;

export const generateData = (count: number) => {
  let dates = [];
  let bullish = [];
  let bearish = [];
  let neutral = [];
  let prices = [];
  let sentimentIndices = [];

  let baseDate = +new Date(2024, 5, 1);
  let day = 24 * 60 * 60 * 1000;
  let basePrice = 50500;
  let priceRange = 21500; // 在50500到72000之间波动

  for (let i = 0; i < count; i++) {
    let date = echarts.format.formatTime("yyyy-MM-dd", (baseDate += day));
    let price = parseFloat((basePrice + Math.random() * priceRange).toFixed(2));

    let bull = parseFloat((Math.random() * 100).toFixed(2));
    let bear = parseFloat((Math.random() * (100 - bull)).toFixed(2));
    let neut = parseFloat((100 - bull - bear).toFixed(2));

    dates.push(date);
    bullish.push({ value: bull, price });
    bearish.push({ value: bear, price });
    neutral.push({ value: neut, price });

    // 计算情绪指数
    const sentimentIndex =
      (bull * siteConfig.weightBullish +
        bear * siteConfig.weightBearish +
        neut * siteConfig.weightNeutral) /
      totalWeight;
    sentimentIndices.push(sentimentIndex);

    prices.push(price);
  }

  return { dates, bullish, bearish, neutral, prices, sentimentIndices };
};
