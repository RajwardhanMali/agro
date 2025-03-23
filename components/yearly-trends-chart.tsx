"use client";

import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface YearlyTrendsChartProps {
  data: { date: string; commodity: string; modalPrice: number }[];
}

export function YearlyTrendsChart({ data }: YearlyTrendsChartProps) {
  const [selectedCommodity, setSelectedCommodity] = useState(
    data[0]?.commodity || ""
  );

  const filteredData = data.filter(
    (item) => item.commodity === selectedCommodity
  );

  const chartData = {
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        label: `Modal Prices of ${selectedCommodity} (₹)`,
        data: filteredData.map((item) => item.modalPrice),
        backgroundColor: "rgba(16, 185, 129, 0.6)",
        borderColor: "#10b981",
        borderWidth: 1,
      },
    ],
  };

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
          text: "Date (Month)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Modal Price (₹)",
        },
        beginAtZero: true,
      },
    },
  };

  const uniqueCommodities = Array.from(
    new Set(data.map((item) => item.commodity))
  );

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Select
          onValueChange={(value) => setSelectedCommodity(value)}
          defaultValue={selectedCommodity}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Commodity" />
          </SelectTrigger>
          <SelectContent>
            {uniqueCommodities.map(
              (commodity, idx) =>
                idx % 10 == 0 && (
                  <SelectItem key={commodity} value={commodity}>
                    {commodity}
                  </SelectItem>
                )
            )}
          </SelectContent>
        </Select>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
}
