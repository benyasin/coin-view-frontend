"use client";

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const PieLine = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    let option = {
      legend: {top: 'center'},
      color:[
        '#33cb6c',
        '#f42767',
        '#5d77c9'
      ],
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      dataset: {
        source: [
          ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
          ['Bullish', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
          ['Bearish', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
          ['Neutral', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
        ]
      },
      xAxis: { type: 'category' },
      yAxis: { gridIndex: 0 },
      grid: { top: '55%' },
      series: [
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          emphasis: { focus: 'series' }
        },
        {
          type: 'pie',
          id: 'pie',
          radius: ['18%', '34%'],
          itemStyle: {
            borderRadius: 6,
            borderColor: '#fff',
            borderWidth: 1
          },
          center: ['30%', '25%'],
          emphasis: {
            focus: 'self'
          },
          label: {
            formatter: '{b}: {@2012} ({d}%)'
          },
          encode: {
            itemName: 'product',
            value: '2012',
            tooltip: '2012'
          }
        }
      ]
    };

    myChart.on('updateAxisPointer', function (event) {
      // @ts-ignore
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        myChart.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        });
      }
    });

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
      <div id="main" ref={chartRef} style={{ width: '100%', height: '600px' }}></div>
  );
};