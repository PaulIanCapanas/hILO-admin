import React from "react";
import Layout from "@/components/Layout";
import BarGraph from "@/components/BarGraph";

export default function AnalyticsPage() {
  return (
    <Layout>
      <h1 className="text-4xl text-center text-black">Analytics</h1>
      <div className="shadow-lg h-1/2 w-1/2">
        <BarGraph />
      </div>
    </Layout>
  );
}
