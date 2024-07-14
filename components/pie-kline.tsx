"use client";

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { generateData } from './generate-data';

export const PieKline = () => {
  const chartRef = useRef(null);
  const pieChartRef = useRef(null); // 新增环形图表的引用

  useEffect(() => {
    const chartDom = chartRef.current;
    const pieChartDom = pieChartRef.current; // 获取环形图表的 DOM 元素
    const myChart = echarts.init(chartDom);
    const pieChart = echarts.init(pieChartDom); // 初始化环形图表

    const dataCount = 60;
    const data = generateData(dataCount);

    const lastIndex = dataCount - 1;
    const initialPieData = [
      { value: data.bullish[lastIndex].value, name: 'Bullish', itemStyle: { color: 'rgb(25,166,4)' } },
      { value: data.neutral[lastIndex].value, name: 'Neutral', itemStyle: { color: 'rgb(215,227,253)' } },
      { value: data.bearish[lastIndex].value, name: 'Bearish', itemStyle: { color: 'rgb(244,39,103)' } }
    ];

    const pieOption = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'inside'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: initialPieData
        }
      ]
    };

    const lineOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        backgroundColor: '#1F1F1F', // 暗黑模式下背景色
        textStyle: {
          color: '#FFF'
        },
        formatter: (params: any[]) => {
          const date = params[0].axisValue;
          const price = params.find(param => param.seriesName === 'Bitcoin Price')?.data ?? 0;
          const bullishData = params.find(param => param.seriesName === 'Sentiment Index');
          const index = bullishData?.dataIndex;
          const bullish = index !== undefined ? data.bullish[index].value : 0;
          const neutral = index !== undefined ? data.neutral[index].value : 0;
          const bearish = index !== undefined ? data.bearish[index].value : 0;
          const sentimentIndex = bullishData?.data ?? 0;
          return `
            <div>
              <p>Date: ${date}</p>
              <p>Bitcoin Price: $${price.toFixed(2)}</p>
              <p>Bullish: ${bullish.toFixed(2)}(${(bullish).toFixed(2)}%)</p>
              <p>Neutral: ${neutral.toFixed(2)}(${(neutral).toFixed(2)}%)</p>
              <p>Bearish: ${bearish.toFixed(2)}(${(bearish).toFixed(2)}%)</p>
              <p>Sentiment Index: ${sentimentIndex.toFixed(2)}</p>
            </div>
          `;
        }
      },
      legend: {
        data: ['Sentiment Index', 'Bitcoin Price'],
        top: '40%'
      },
      grid: {
        left: '10%',
        right: '10%',
        top: '50%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        data: data.dates,
        boundaryGap: true,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      },
      yAxis: [
        {
          name: 'Sentiment Index',
          type: 'value',
          min: 0,
          max: 100,
          splitLine: {
            lineStyle: {
              color: 'rgba(115,112,112,0.27)',
              type: 'dashed'
            }
          }
        },
        {
          name: 'Bitcoin Price',
          type: 'value',
          min: 0,
          max: 100000,
          position: 'right',
          axisLine: {
            lineStyle: {
              color: '#737070' // 调整为与左边一样的颜色值
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(115,112,112,0.27)',
              type: 'dashed'
            }
          }
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0],
          start: 10,
          end: 100
        },
        {
          show: true,
          xAxisIndex: [0],
          type: 'slider',
          bottom: 0,
          height: 45,
          start: 10,
          end: 100
        }
      ],
      series: [
        {
          name: 'Sentiment Index',
          type: 'bar',
          yAxisIndex: 0, // 使用左侧的y轴
          data: data.sentimentIndices,
          itemStyle: {
            color: 'rgb(215,227,253)' // 浅蓝色
          },
          lineStyle: {
            color: 'rgb(215,227,253)', // 浅蓝色
            width: 2 // 增加折线宽度
          }
        },
        {
          name: 'Bitcoin Price',
          type: 'line',
          yAxisIndex: 1,
          data: data.prices, // 取收盘价
          itemStyle: {
            color: '#FFD700' // 深黄色
          },
          lineStyle: {
            color: '#FFD700', // 深黄色
            width: 4 // 增加折线宽度
          }
        }
      ]
    };

    myChart.setOption(lineOption);
    pieChart.setOption(pieOption); // 设置环形图表的初始配置

    // 添加鼠标事件
    myChart.on('mouseover', params => {
      if (params.componentType === 'series') {
        const index = params.dataIndex;
        const bullish = data.bullish[index].value;
        const neutral = data.neutral[index].value;
        const bearish = data.bearish[index].value;

        pieChart.setOption({
          series: [
            {
              data: [
                { value: bullish, name: 'Bullish', itemStyle: { color: 'rgb(25,166,4)' } },
                { value: neutral, name: 'Neutral', itemStyle: { color: 'rgb(215,227,253)' } },
                { value: bearish, name: 'Bearish', itemStyle: { color: 'rgb(244,39,103)' } }
              ]
            }
          ]
        });
      }
    });

    return () => {
      myChart.dispose();
      pieChart.dispose(); // 组件卸载时销毁环形图表实例
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '900px', position: 'relative' }}>
      <div ref={chartRef} style={{ width: '100%', height: '600px' }}></div>
      <div ref={pieChartRef} style={{ position: 'absolute', top: '10px', left: '50px', width: '300px', height: '300px' }}></div>
    </div>
  );
};