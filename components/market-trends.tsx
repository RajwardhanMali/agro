"use client";

import { useEffect, useRef } from "react";
import trendsData from "@/constants/trends.json";

interface MarketTrendsProps {
  commodity: string;
}

export function MarketTrends({ commodity }: MarketTrendsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Get data for the selected commodity
    const data = trendsData.data.find(
      (row) => row[1].toLowerCase() === commodity.toLowerCase()
    );
    if (!data) return;

    const prices = [
      parseFloat(data[4]), // 5 years back
      parseFloat(data[3]), // 1 year back
      parseFloat(data[2]), // Current price
    ];
    const labels = ["2020", "2024", "2025"];

    const padding = { top: 20, right: 20, bottom: 30, left: 50 };
    const chartWidth = rect.width - padding.left - padding.right;
    const chartHeight = rect.height - padding.top - padding.bottom;

    // Find min and max values
    const minPrice = Math.min(...prices) * 0.95;
    const maxPrice = Math.max(...prices) * 1.05;

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, rect.height - padding.bottom);
    ctx.lineTo(rect.width - padding.right, rect.height - padding.bottom);
    ctx.stroke();

    // Draw y-axis labels
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";

    const yTickCount = 5;
    for (let i = 0; i <= yTickCount; i++) {
      const y = padding.top + (chartHeight * i) / yTickCount;
      const price = maxPrice - ((maxPrice - minPrice) * i) / yTickCount;
      ctx.fillText(`₹${Math.round(price)}`, padding.left - 10, y);

      // Draw horizontal grid lines
      ctx.beginPath();
      ctx.strokeStyle = "#e2e8f0";
      ctx.moveTo(padding.left, y);
      ctx.lineTo(rect.width - padding.right, y);
      ctx.stroke();
    }

    // Draw x-axis labels
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    labels.forEach((label, i) => {
      const x = padding.left + (chartWidth * i) / (labels.length - 1);
      ctx.fillText(label, x, rect.height - padding.bottom + 10);
    });

    // Draw line chart
    ctx.beginPath();
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;

    const points: { x: number; y: number }[] = [];

    prices.forEach((price, i) => {
      const x = padding.left + (chartWidth * i) / (prices.length - 1);
      const y =
        padding.top +
        chartHeight -
        ((price - minPrice) / (maxPrice - minPrice)) * chartHeight;

      points.push({ x, y });

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Add gradient fill under the line
    const gradient = ctx.createLinearGradient(
      0,
      padding.top,
      0,
      rect.height - padding.bottom
    );
    gradient.addColorStop(0, "rgba(16, 185, 129, 0.2)");
    gradient.addColorStop(1, "rgba(16, 185, 129, 0)");

    ctx.beginPath();
    points.forEach(({ x, y }, i) => {
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.lineTo(points[points.length - 1].x, rect.height - padding.bottom);
    ctx.lineTo(points[0].x, rect.height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw data points
    prices.forEach((price, i) => {
      const x = padding.left + (chartWidth * i) / (prices.length - 1);
      const y =
        padding.top +
        chartHeight -
        ((price - minPrice) / (maxPrice - minPrice)) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2); // Draws a circle
      ctx.fillStyle = "#ffffff"; // Circle fill color
      ctx.fill();
      ctx.strokeStyle = "#10b981"; // Circle border color
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [commodity]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
