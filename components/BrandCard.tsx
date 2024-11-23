"use client"

import React, { useEffect, useState } from "react";
import queryAllDocument from "@/helpers/firebase/queryAllDocument";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from 'lucide-react';

interface Brand {
  id: string;
  name: string;
}

export default function BrandCard() {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchBrands = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedBrands = await queryAllDocument("brands") as Brand[]
      if (fetchedBrands.length > 0) {
        setBrands(fetchedBrands);
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
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {brands.map((brand) => (
        <Card key={brand.id}>
          <CardHeader>
            <CardTitle>{brand.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* ColorCard.tsx Component Here */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}