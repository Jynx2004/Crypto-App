// src/components/CandlestickChart.js
import React from 'react';
import { Chart, registerables } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { Chart as ChartJS } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; // Import the date-fns adapter

// Register Chart.js components
Chart.register(...registerables, CandlestickController, CandlestickElement);

const CandlestickChart = ({ priceData }) => {
  // Prepare data for the candlestick chart
  const chartData = {
    datasets: [
      {
        label: 'Candlestick',
        data: priceData.map((price) => ({
          x: new Date(price.t),
          o: price.o,
          h: price.h,
          l: price.l,
          c: price.c,
        })),
        borderColor: 'rgba(0, 255, 0, 1)', // Green for up candles
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
      },
    ],
  };

  return (
    <ChartJS
      type="candlestick"
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute',
            },
          },
          y: {
            beginAtZero: false,
          },
        },
      }}
    />
  );
};

export default CandlestickChart;
