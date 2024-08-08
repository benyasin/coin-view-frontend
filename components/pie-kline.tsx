"use client";

import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { useIntl } from "react-intl";

type TrendData = {
  date: string;
  price: number;
  bullish: number;
  bearish: number;
  neutral: number;
  fearGreedIndex: number;
};

export const PieKline = () => {
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  const gaugeChartRef = useRef(null);
  const [data, setData] = useState<TrendData[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const intl = useIntl();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/index/trends`);
        const result = await response.json();
        const dataArray: TrendData[] = result.data.map((d: any) => ({
          date: d.dates,
          price: parseFloat(d.price).toFixed(0),
          bullish: d.bullish || 0,
          bearish: d.bearish || 0,
          neutral: d.neutral || 0,
          fearGreedIndex: d.fearGreedIndex || 0,
        }));
        setData(dataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data || !data.length) return;

    const chartDom = chartRef.current;
    const pieChartDom = pieChartRef.current;
    const gaugeChartDom = gaugeChartRef.current;
    const myChart = echarts.init(chartDom);
    const pieChart = echarts.init(pieChartDom);
    const gaugeChart = echarts.init(gaugeChartDom);

    const lastIndex = data.length - 1;
    const initialPieData = [
      {
        value: data[lastIndex].bullish,
        name: intl.formatMessage({ id: "bullish" }),
        itemStyle: { color: "rgb(25,166,4)" },
      },
      {
        value: data[lastIndex].neutral,
        name: intl.formatMessage({ id: "neutral" }),
        itemStyle: { color: "rgb(215,227,253)" },
      },
      {
        value: data[lastIndex].bearish,
        name: intl.formatMessage({ id: "bearish" }),
        itemStyle: { color: "rgb(244,39,103)" },
      },
    ];

    const pieOption = {
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          type: "pie",
          radius: ["50%", "80%"],
          center: ["50%", "65%"], // Adjust the center position
          startAngle: 180,
          endAngle: 360,
          itemStyle: {
            borderRadius: 5,
            borderColor: "rgba(215,227,253,0.5)",
            borderWidth: 1,
          },
          label: {
            show: true,
            position: "inside",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: initialPieData,
        },
      ],
    };

    const gaugeOption = {
      series: [
        {
          type: "gauge",
          startAngle: 180,
          endAngle: 0,
          center: ["50%", "50%"], // Adjusted to align with the new position
          radius: "75%",
          min: 0,
          max: 100,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.25, "#FF6E76"],
                [0.5, "#FDDD60"],
                [0.75, "#58D9F9"],
                [1, "#7CFFB2"],
              ],
            },
          },
          pointer: {
            icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
            length: "12%",
            width: 20,
            offsetCenter: [0, "-30%"],
            itemStyle: {
              color: "auto",
            },
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: "auto",
              width: 2,
            },
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: "auto",
              width: 5,
            },
          },
          axisLabel: {
            color: "#464646",
            fontSize: 12,
            distance: -50,
            rotate: "tangential",
            formatter: function (value: number) {
              if (value === 87.5) {
                return intl.formatMessage({ id: "extreme_greed" });
              } else if (value === 62.5) {
                return intl.formatMessage({ id: "greed" });
              } else if (value === 37.5) {
                return intl.formatMessage({ id: "fear" });
              } else if (value === 12.5) {
                return intl.formatMessage({ id: "extreme_fear" });
              }
              return "";
            },
          },
          title: {
            offsetCenter: [0, "20%"],
            fontSize: 20,
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, "0%"],
            valueAnimation: true,
            formatter: function (value: number) {
              return Math.round(value) + "";
            },
            color: "inherit",
          },
          data: [
            {
              value: data[lastIndex].fearGreedIndex,
            },
          ],
        },
      ],
    };

    const lineOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
        backgroundColor: "#1F1F1F",
        textStyle: {
          color: "#FFF",
        },
        formatter: (params: any[]) => {
          const date = params[0].axisValue;
          const price =
            params.find(
              (param) =>
                param.seriesName === intl.formatMessage({ id: "bitcoin_price" })
            )?.data ?? 0;
          const bullishData = params.find(
            (param) =>
              param.seriesName ===
              intl.formatMessage({ id: "fear_greed_index" })
          );
          const index = bullishData?.dataIndex;
          const bullish = index !== undefined ? data[index].bullish : 0;
          const neutral = index !== undefined ? data[index].neutral : 0;
          const bearish = index !== undefined ? data[index].bearish : 0;
          const fearGreedIndex = bullishData?.data ?? 0;
          return `
            <div>
              <p>${intl.formatMessage({ id: "date" })}: ${date}</p>
              <p>${intl.formatMessage({ id: "bitcoin_price" })}: $${Math.round(
            price
          )}</p>
              <p>${intl.formatMessage({ id: "bullish" })}: ${Math.round(
            bullish
          )}(${Math.round(bullish)}%)</p>
              <p>${intl.formatMessage({ id: "neutral" })}: ${Math.round(
            neutral
          )}(${Math.round(neutral)}%)</p>
              <p>${intl.formatMessage({ id: "bearish" })}: ${Math.round(
            bearish
          )}(${Math.round(bearish)}%)</p>
              <p>${intl.formatMessage({
                id: "fear_greed_index",
              })}: ${Math.round(fearGreedIndex)}</p>
            </div>
          `;
        },
      },
      legend: {
        data: [
          intl.formatMessage({ id: "fear_greed_index" }),
          intl.formatMessage({ id: "bitcoin_price" }),
        ],
        top: "20%",
      },
      grid: {
        left: "8%",
        right: "10%",
        top: "30%",
        bottom: "20%",
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item.date),
        boundaryGap: true,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: "dataMin",
        max: "dataMax",
      },
      yAxis: [
        {
          name: intl.formatMessage({ id: "fear_greed_index" }),
          type: "value",
          min: 0,
          max: 100,
          splitLine: {
            lineStyle: {
              color: "rgba(115,112,112,0.27)",
              type: "dashed",
            },
          },
        },
        {
          name: intl.formatMessage({ id: "bitcoin_price" }),
          type: "value",
          min: 0,
          max: 100000,
          position: "right",
          axisLine: {
            lineStyle: {
              color: "#737070",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(115,112,112,0.27)",
              type: "dashed",
            },
          },
        },
      ],
      dataZoom: [
        {
          type: "inside",
          xAxisIndex: [0],
          start: 10,
          end: 100,
        },
        {
          show: true,
          xAxisIndex: [0],
          type: "slider",
          bottom: 0,
          height: 45,
          start: 10,
          end: 100,
        },
      ],
      series: [
        {
          name: intl.formatMessage({ id: "fear_greed_index" }),
          type: "bar",
          yAxisIndex: 0,
          data: data.map((item) => item.fearGreedIndex),
          itemStyle: {
            color: "rgba(30,129,255,0.3)",
          },
          lineStyle: {
            color: "rgba(30,129,255,0.3)",
            width: 2,
          },
        },
        {
          name: intl.formatMessage({ id: "bitcoin_price" }),
          type: "line",
          yAxisIndex: 1,
          data: data.map((item) => item.price),
          itemStyle: {
            color: "#FFD700",
            opacity: 0,
          },
          lineStyle: {
            color: "#FFD700",
            width: 3,
          },
          emphasis: {
            itemStyle: {
              opacity: 1,
            },
          },
        },
      ],
    };

    myChart.setOption(lineOption);
    pieChart.setOption(pieOption);
    gaugeChart.setOption(gaugeOption);

    myChart.on("mouseover", (params) => {
      if (params.componentType === "series") {
        const index = params.dataIndex;
        const bullish = data[index].bullish;
        const neutral = data[index].neutral;
        const bearish = data[index].bearish;
        const fearGreedIndex = data[index].fearGreedIndex;

        pieChart.setOption({
          series: [
            {
              data: [
                {
                  value: bullish,
                  name: intl.formatMessage({ id: "bullish" }),
                  itemStyle: { color: [1, "#7CFFB2"] },
                },
                {
                  value: neutral,
                  name: intl.formatMessage({ id: "neutral" }),
                  itemStyle: { color: "rgb(215,227,253)" },
                },
                {
                  value: bearish,
                  name: intl.formatMessage({ id: "bearish" }),
                  itemStyle: { color: [0.25, "#FF6E76"] },
                },
              ],
            },
          ],
        });

        gaugeOption.series[0].data[0].value = fearGreedIndex;
        gaugeChart.setOption(gaugeOption);
      }
    });

    myChart.on("legendselectchanged", (params) => {
      // @ts-ignore
      if (!params.selected[intl.formatMessage({ id: "fear_greed_index" })]) {
        gaugeChart.setOption({
          graphic: {
            style: {
              text: "",
            },
          },
        });
      } else {
        // @ts-ignore
        const index = myChart.getOption().xAxis[0].data.length - 1;
        const fearGreedIndex = data[index].fearGreedIndex;
        gaugeChart.setOption({
          graphic: {
            style: {
              text: `${Math.round(fearGreedIndex)}`,
            },
          },
        });
      }
    });

    return () => {
      myChart.dispose();
      pieChart.dispose();
      gaugeChart.dispose();
    };
  }, [intl.locale, data]);

  return (
    <div style={{ width: "100%", height: "600px", position: "relative" }}>
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "400px",
          position: "absolute",
          bottom: "0", // Moved up
          left: "0", // Adjusted to avoid overlap,
          zIndex: "1",
        }}
      ></div>
      <div
        ref={pieChartRef}
        style={{
          position: "absolute",
          top: "0px", // Moved down
          left: "450px", // Moved left
          width: "280px", // Smaller size
          height: "280px",
          zIndex: "1",
        }}
      ></div>
      <div
        ref={gaugeChartRef}
        style={{
          position: "absolute",
          top: "35px", // Moved up
          left: "50px", // Adjusted to avoid overlap
          width: "280px",
          height: "280px",
          zIndex: "0",
        }}
      ></div>
    </div>
  );
};
