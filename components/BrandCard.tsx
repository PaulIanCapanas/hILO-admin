"use client";
import React, { useEffect, useState } from "react";
import queryAllDocument from "@/helpers/firebase/queryAllDocument"; // Adjust the import path accordingly

export default function BrandCard() {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchBrands = async () => {
    setLoading(true);
    setError(null); 

    try {
      const fetchedBrands = await queryAllDocument("brands");
      if (fetchedBrands.length > 0) {
        setBrands(fetchedBrands); // Set the fetched brands
      } else {
        setError("No brands found.");
      }
    } catch (err) {
      setError("Error fetching brands: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []); // Removed brands from dependency array to prevent infinite loop


  const handleCardClick = (brandId: string) => {
    console.log("Brand clicked:", brandId);

  };

  return (
    <div className="flex flex-col items-center">
      {loading && <p>Loading brands...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {brands.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {brands.map((brand) => (
            <button
              key={brand.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleCardClick(brand.id)} // Handle click event
            >
              <h5 className="text-lg text-black font-semibold">{brand.name}</h5>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}