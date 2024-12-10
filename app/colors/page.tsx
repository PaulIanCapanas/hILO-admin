"use client";
import React, { useState } from "react";
import Layout from "@/components/Layout";
import CreateBrand from "@/components/CreateBrand";
import BrandCard from "@/components/BrandCard";
import { Brand } from "@/types/brands";

export default function ColorsPage() {
  const [recentlyCreatedBrands, setRecentlyCreatedBrands] =
    useState<boolean>(false);
    const [brands, setBrands] = useState<Brand[]>([])


    const handleBrandCreated = (newBrand: { id: string; name: string }) => {
      setBrands((prevBrands) => [...prevBrands, newBrand]);
    };
    
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Colors and Brands</h1>
        <div className="bg-card p-4 w-full max-w-md mb-6  bg-primary rounded-lg">
        <CreateBrand setRecentlyCreatedBrands={setRecentlyCreatedBrands} onCreateBrand={handleBrandCreated}/>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">Thread Brands</h2>
          <BrandCard initialBrands={brands} />
        </div>
      </div>
    </Layout>
  );
}
