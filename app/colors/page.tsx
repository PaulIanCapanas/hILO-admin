"use client";
import React, { useState } from "react";
import Layout from "@/components/Layout"
import CreateColor from "@/components/CreateColor"
import CreateBrand from "@/components/CreateBrand"
import BrandCard from "@/components/BrandCard"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-2">Create Color</h2>
            <CreateColor recentlyCreatedBrands={recentlyCreatedBrands} />
          </div>
          <div className="bg-card rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-2">Create Brand</h2>
            <CreateBrand setRecentlyCreatedBrands={setRecentlyCreatedBrands} onCreateBrand={handleBrandCreated}/>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-2">Thread Brands</h2>
          <BrandCard initialBrands={brands} />
        </div>
      </div>
    </Layout>
  );
}

