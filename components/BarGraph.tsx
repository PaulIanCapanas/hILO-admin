"use client";

import React, { useState, useEffect } from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { ChartContainer, ChartConfig } from "./ui/chart";
import queryAllDocument from "@/helpers/firebase/queryAllDocument";

interface User {
  id: string,
  type?: string
}

export default function BarGraph() {
  const [chartData, setChartData] = useState([
    { type: "Designers", value: 0, color: "#2563eb" },
    { type: "Weavers", value: 0, color: "#60a5fa" },
    { type: "Others", value: 0, color: "#34d399" },
  ]);

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

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const users: User[] = await queryAllDocument("users");

        const designersCount = users.filter(user => user.type === "designer").length;
        const weaversCount = users.filter(user => user.type === "weaver").length;
        const othersCount = users.filter(user => user.type === "other").length;

        setChartData([
          { type: "Designers", value: designersCount, color: "#2563eb" },
          { type: "Weavers", value: weaversCount, color: "#60a5fa" },
          { type: "Others", value: othersCount, color: "#34d399" },
        ]);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);


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
