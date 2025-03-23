"use client";

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import trendsData from "@/constants/trends.json";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MarketTrendsProps {
  commodity: string;
}

export function MarketTrends({ commodity }: MarketTrendsProps) {
  const chartData = useMemo(() => {
    const data = trendsData.data.find(
      (row) => row[1].toLowerCase() === commodity.toLowerCase()
    );
    if (!data) return null;

    const prices = [
      parseFloat(data[4]), // 5 years back
      parseFloat(data[3]), // 1 year back
      parseFloat(data[2]), // Current price
    ];
    const labels = ["2020", "2024", "2025"];

    return {
      labels,
      datasets: [
        {
          label: `${commodity} Price Trends`,
          data: prices,
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [commodity]);

  if (!chartData) {
    return <p>No data available for the selected commodity.</p>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (₹)",
        },
        beginAtZero: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
