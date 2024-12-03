"use client";
import React, { useState } from "react";
import Layout from "@/components/Layout";
import CreateColor from "@/components/CreateColor";
import CreateBrand from "@/components/CreateBrand";

export default function ColorsPage() {
  const [recentlyCreatedBrands, setRecentlyCreatedBrands] =
    useState<boolean>(false);
  return (
    <Layout>
      <div className="pt-8 pl-6">
        <CreateColor recentlyCreatedBrands={recentlyCreatedBrands} />
      </div>
      <div className="pt-8 pl-6">
        <CreateBrand setRecentlyCreatedBrands={setRecentlyCreatedBrands} />
      </div>
    </Layout>
  );
}
