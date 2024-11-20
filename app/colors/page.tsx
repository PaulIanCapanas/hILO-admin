import React from "react"
import Layout from "@/components/Layout";
import CreateColor from "@/components/CreateColor";

export default function ColorsPage() {
  return (
    <Layout>
      <div className="pt-8 pl-6">
        <CreateColor />
      </div>
    </Layout>
  )
}