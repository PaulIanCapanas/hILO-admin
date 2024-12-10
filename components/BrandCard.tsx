"use client";

import React, { useEffect, useState } from "react";
import queryAllDocument from "@/helpers/firebase/queryAllDocument";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Palette } from 'lucide-react';
import { Brand } from "@/types/brands";
import { Button } from "@/components/ui/button";
import ColorModal from "./ColorModal";

export default function BrandCard() {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openColorModal = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-4">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full rounded-lg" />
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
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {brands.map((brand) => (
          <Card
            key={brand.id}
            className="relative overflow-hidden transition-all hover:shadow-md bg-primary border-b border-secondary"
          >
            <CardHeader className="pb-1 border-b border-secondary">
              <CardTitle className="flex items-center gap-1 text-lg text-secondary">
                <Palette className="h-4 w-4" />
                {brand.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10">
              <Button
                onClick={() => openColorModal(brand)}
                className="w-full text-secondary bg-button hover hover:bg-white"
                variant="outline"
              >
                View Colors
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <ColorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        brand={selectedBrand}
      />
    </>
  );
}

