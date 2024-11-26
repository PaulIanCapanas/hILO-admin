"use client";

import React, { useEffect, useState } from "react";
import queryAllDocument from "@/helpers/firebase/queryAllDocument";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Palette } from 'lucide-react';
import { Brand } from "@/types/brands";
import ColorCard from "./ColorCard";

export default function BrandCard() {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchBrands = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedBrands = (await queryAllDocument("brands")) as Brand[];
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
      <div className="grid gap-6 sm:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-4">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {brands.map((brand) => (
        <Card
          key={brand.id}
          className="relative overflow-hidden transition-all hover:shadow-md"
        >
          <CardHeader className="pb-4 border-b">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Palette className="h-4 w-4" />
              {brand.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ColorCard brandId={brand.id} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

