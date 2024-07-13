"use client";
import React from 'react';
import dynamic from 'next/dynamic';
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

export const PieChart = () => {
  const option = {
    title: {
      text: 'bullish and bearish probabilities in the market',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    color:[ '#33cb6c',
            '#f42767',
            'rgba(84,112,198,0.76)'],
    series: [
      {
        name: 'Probabilities',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Bullish' },
          { value: 735, name: 'Bearish' },
          { value: 580, name: 'Neutral' },
        ],
      }
    ]
  };

  return (
    <div className="w-full z-20">
      <ReactECharts option={option} />
    </div>
  );
};