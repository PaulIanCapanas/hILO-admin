import React from "react";
import Layout from "@/components/Layout";
import BarGraph from "@/components/BarGraph";
import UserPercentage from "@/components/Percentage";

export default function AnalyticsPage() {
  return (
    <Layout>
      <h1 className="text-4xl text-center text-black py-10">Analytics</h1>
      <div className="flex flex-row space-x-16 justify-center items-center py-10">
        <div className="shadow-lg h-1/2 w-1/2">
          <BarGraph />
        </div>
        <div className="shadow-lg h-full w-1/3">
          <UserPercentage />
        </div>
      </div>
    </Layout>
  );
}
