"use client";

import React, { useEffect, useState, useCallback } from "react";
import queryAllDocument from "@/helpers/firebase/queryAllDocument";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Copy, Check, Trash } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { ColorCardProps, Color } from "@/types/brands";
import { cn } from "@/lib/utils";
import deleteDocument from "@/helpers/firebase/deleteDocument";

export default function ColorCard({ brandId }: ColorCardProps) {
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState<Color[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const fetchColors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedColors = (await queryAllDocument(
        `brands/${brandId}/colors`
      )) as unknown as Color[];
      if (fetchedColors.length > 0) {
        setColors(fetchedColors);
      } else {
        setError("No colors found for this brand.");
      }
    } catch (err) {
      setError("Error fetching colors: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [brandId]);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  const getHexValue = (color: Color): string => {
    if (typeof color.hex === "string") {
      return color.hex;
    }
    if (typeof color.hex === "object" && color.hex?.hex) {
      return color.hex.hex;
    }
    return "#000000";
  };

  const copyToClipboard = async (hexValue: string) => {
    try {
      await navigator.clipboard.writeText(hexValue);
      setCopiedColor(hexValue);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDelete = async (colorId: string) => {
    try {
      await deleteDocument(`brands/${brandId}/colors`, colorId);
      console.log('Color card deleted successfully');
      setColors((prevColors) => prevColors.filter(color => color.id !== colorId));
    } catch (error) {
      console.error('Error deleting color card:', error);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="rounded-lg">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3">
      {colors.map((color) => {
        const hexValue = getHexValue(color);
        const isCopied = copiedColor === hexValue;

        return (
          <Card
            key={color.code}
            className={cn(
              "group relative overflow-hidden transition-all hover:shadow-lg",
              "hover:scale-105 active:scale-100"
            )}
          >
            <CardContent className="p-3">
              <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundColor: hexValue }}
              />
              <div className="relative space-y-2">
                <div
                  className="w-full h-12 rounded-md shadow-sm"
                  style={{ backgroundColor: hexValue }}
                />
                <div className="space-y-1">
                  <p className="font-medium line-clamp-1 text-sm">{color.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{color.code}</p>
                    <button
                      onClick={() => copyToClipboard(hexValue)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {isCopied ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">
                    {hexValue}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(color.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity mt-2"
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}