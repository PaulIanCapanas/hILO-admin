import React from "react"
import Layout from "@/components/Layout";
import CreateColor from "@/components/CreateColor";
import CreateBrand from "@/components/CreateBrand";
import BrandCard from "@/components/BrandCard";

export default function ColorsPage() {
  return (
    <Layout>
      <div className="pt-8 pl-6">
        <CreateColor />
      </div>
      <div className="pt-8 pl-6">
        <CreateBrand />
      </div>
      <BrandCard/>
    </Layout>
  )
}