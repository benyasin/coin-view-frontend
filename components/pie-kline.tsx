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
  sentimentIndices: number;
};

export const PieKline = () => {
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
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
          sentimentIndices: d.sentimentIndices || 0,
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
    const myChart = echarts.init(chartDom);
    const pieChart = echarts.init(pieChartDom);

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
      graphic: {
        type: "text",
        left: "center",
        top: "middle",
        style: {
          text: `${Math.round(data[lastIndex].sentimentIndices)}`,
          fontSize: 24,
          fontWeight: "bold",
          fill: "rgba(30,129,255,0.5)",
        },
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
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
              param.seriesName === intl.formatMessage({ id: "bullish_index" })
          );
          const index = bullishData?.dataIndex;
          const bullish = index !== undefined ? data[index].bullish : 0;
          const neutral = index !== undefined ? data[index].neutral : 0;
          const bearish = index !== undefined ? data[index].bearish : 0;
          const sentimentIndex = bullishData?.data ?? 0;
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
              <p>${intl.formatMessage({ id: "bullish_index" })}: ${Math.round(
            sentimentIndex
          )}</p>
            </div>
          `;
        },
      },
      legend: {
        data: [
          intl.formatMessage({ id: "bullish_index" }),
          intl.formatMessage({ id: "bitcoin_price" }),
        ],
        top: "42%",
      },
      grid: {
        left: "8%",
        right: "10%",
        top: "50%",
        bottom: "15%",
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
          name: intl.formatMessage({ id: "bullish_index" }),
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
          name: intl.formatMessage({ id: "bullish_index" }),
          type: "bar",
          yAxisIndex: 0,
          data: data.map((item) => item.sentimentIndices),
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

    myChart.on("mouseover", (params) => {
      if (params.componentType === "series") {
        const index = params.dataIndex;
        const bullish = data[index].bullish;
        const neutral = data[index].neutral;
        const bearish = data[index].bearish;
        const sentimentIndex = data[index].sentimentIndices;

        pieChart.setOption({
          graphic: [
            {
              type: "text",
              left: "center",
              top: "middle",
              style: {
                text: `${Math.round(sentimentIndex)}`,
                fontSize: 24,
                fontWeight: "bold",
                fill: "#87CEEB",
              },
            },
          ],
          series: [
            {
              data: [
                {
                  value: bullish,
                  name: intl.formatMessage({ id: "bullish" }),
                  itemStyle: { color: "rgb(25,166,4)" },
                },
                {
                  value: neutral,
                  name: intl.formatMessage({ id: "neutral" }),
                  itemStyle: { color: "rgb(215,227,253)" },
                },
                {
                  value: bearish,
                  name: intl.formatMessage({ id: "bearish" }),
                  itemStyle: { color: "rgb(244,39,103)" },
                },
              ],
            },
          ],
        });
      }
    });

    myChart.on("legendselectchanged", (params) => {
      // @ts-ignore
      if (!params.selected[intl.formatMessage({ id: "bullish_index" })]) {
        pieChart.setOption({
          graphic: {
            style: {
              text: "",
            },
          },
        });
      } else {
        // @ts-ignore
        const index = myChart.getOption().xAxis[0].data.length - 1;
        const sentimentIndex = data[index].sentimentIndices;
        pieChart.setOption({
          graphic: {
            style: {
              text: `${Math.round(sentimentIndex)}`,
            },
          },
        });
      }
    });

    return () => {
      myChart.dispose();
      pieChart.dispose();
    };
  }, [intl.locale, data]);

  return (
    <div style={{ width: "100%", height: "600px", position: "relative" }}>
      <div ref={chartRef} style={{ width: "100%", height: "600px" }}></div>
      <div
        ref={pieChartRef}
        style={{
          position: "absolute",
          top: "10px",
          left: "50px",
          width: "300px",
          height: "300px",
        }}
      ></div>
    </div>
  );
};
