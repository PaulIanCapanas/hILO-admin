"use client";
import React from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { ChartContainer, ChartConfig } from "./ui/chart";

export default function BarGraph() {
  const chartData = [
    { type: "Designers", value: "180", color: "#2563eb" },
    { type: "Weavers", value: "200", color: "#60a5fa" },
    { type: "Others", value: "100", color: "#34d399" },
  ];

  const chartConfig: ChartConfig = {
    designers: {
      label: "Designers",
      color: "#2563eb",
    },
    weavers: {
      label: "Weavers",
      color: "#60a5fa",
    },
    others: {
      label: "Others",
      color: "#34d399",
    },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] h-full w-full"
    >
      <BarChart width={500} height={300} data={chartData}>
        <XAxis
          dataKey="type"
          stroke="#000"
          tick={{ fill: "#000", fontSize: 12 }}
        />
        <YAxis stroke="#000" />
        <Tooltip
          formatter={(value: number) => [`${value}`, "Value"]}
        /> 
        <Bar dataKey="value" radius={4}>
          {chartData.map((entry, index) => (
            <Cell 
            key={`cell-${index}`} 
            fill={entry.color} 
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
