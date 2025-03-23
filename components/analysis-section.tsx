import { useEffect, useState } from "react";
import { MonthlyTrendsChart } from "@/components/monthly-trends-chart";
import { YearlyTrendsChart } from "@/components/yearly-trends-chart";

export default function AnalysisSection() {
  const [monthlyData, setMonthlyData] = useState<
    { month: string; averagePrice: number }[]
  >([]);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const septemberRes = await fetch(
          "/api/load-csv?file=2024/September.csv"
        );
        const octoberRes = await fetch("/api/load-csv?file=2024/October.csv");
        const augustRes = await fetch("/api/load-csv?file=2024/August.csv");
        const novemberRes = await fetch("/api/load-csv?file=2024/November.csv");
        const yearlyRes = await fetch(
          "/api/load-csv?file=2025/2025_yearly.csv"
        );

        const septemberData = await septemberRes.json();
        const octoberData = await octoberRes.json();
        const augustData = await augustRes.json();
        const novemberData = await novemberRes.json();
        const yearlyData = await yearlyRes.json();

        const monthlyData = [
          {
            month: "August",
            averagePrice:
              augustData.reduce(
                (sum: number, row: { Modal_Price: any }) =>
                  sum + parseFloat(row.Modal_Price || 0),
                0
              ) / augustData.length,
          },
          {
            month: "September",
            averagePrice:
              septemberData.reduce(
                (sum: number, row: { Modal_Price: any }) =>
                  sum + parseFloat(row.Modal_Price || 0),
                0
              ) / septemberData.length,
          },
          {
            month: "October",
            averagePrice:
              octoberData.reduce(
                (sum: number, row: { Modal_Price: any }) =>
                  sum + parseFloat(row.Modal_Price || 0),
                0
              ) / octoberData.length,
          },
          {
            month: "November",
            averagePrice:
              novemberData.reduce(
                (sum: number, row: { Modal_Price: any }) =>
                  sum + parseFloat(row.Modal_Price || 0),
                0
              ) / novemberData.length,
          },
        ];

        const yearlyChartData = yearlyData.map(
          (row: { Arrival_Date: any; Commodity: any; Modal_Price: any }) => ({
            date: row.Arrival_Date,
            commodity: row.Commodity,
            modalPrice: parseFloat(row.Modal_Price || 0),
          })
        );

        setMonthlyData(monthlyData);
        setYearlyData(yearlyChartData);
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Market Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold mb-4">2025 Monthly Trends</h2>
          <YearlyTrendsChart data={yearlyData} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-14">2024 Monthly Trends</h2>
          <MonthlyTrendsChart data={monthlyData} />
        </div>
      </div>
    </div>
  );
}
