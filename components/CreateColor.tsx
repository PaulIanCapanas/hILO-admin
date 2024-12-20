"use client";

import React, { FormEvent, useEffect, useState } from "react";
import queryAllDocument from "@/helpers/firebase/queryAllDocument";
import { Brand } from "@/types/brands";
import { Collection } from "@/enums/collection";
import uploadDocumentToSubCol from "@/helpers/firebase/uploadDocumentToSubCol";
import { SubCollection } from "@/enums/subcollection";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CreateColorProps {
  recentlyCreatedBrands?: boolean;
  onCreateColor?: () => void;
}

export default function CreateColor(props: CreateColorProps) {
  const { recentlyCreatedBrands, onCreateColor } = props;
  const [name, setName] = useState<string>("");
  const [hex, setHex] = useColor("hex");
  const [code, setCode] = useState<string>("");
  const [brand, setBrand] = useState<string>("Brands");
  const [queriedBrands, setQueriedBrands] = useState<Brand[]>([]);
  const [fetchingBrands, setFetchingBrands] = useState<boolean>(true);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);

  useEffect(() => {
    queryAllDocument("brands")
      .then((data) => setQueriedBrands(data as Brand[]))
      .then(() => setFetchingBrands(false));
  }, [recentlyCreatedBrands, fetchingBrands]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await uploadDocumentToSubCol(
        Collection.BRANDS,
        brand,
        SubCollection.BRANDCOLORS,
        {
          name: name,
          hex: hex.hex,
          code: code,
        }
      );
      console.log("Successfully uploaded color to database");

      setName("");
      setCode("");
      if (onCreateColor) {
        onCreateColor();
      }
    } catch (error) {
      console.error("Failed to create color", error);
    }
  };

  const handleColorConfirm = () => {
    setIsColorPickerOpen(false);
  };

  return (
    <div className="flex items-center justify-center max-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg">Create New Color</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-6">
            <div className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="color-name">Color Name</Label>
                <Input
                  id="color-name"
                  placeholder="Purple Haze"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="brand-select">Brand</Label>
                <Select
                  value={brand}
                  onValueChange={setBrand}
                  disabled={fetchingBrands}
                >
                  <SelectTrigger id="brand-select">
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {queriedBrands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="color-code">Color Code</Label>
                <Input
                  id="color-code"
                  placeholder="201"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Selected Color</Label>
                <Dialog
                  open={isColorPickerOpen}
                  onOpenChange={setIsColorPickerOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full flex justify-between items-center"
                    >
                      <span>{`Selected Color: ${hex.hex}`}</span>

                      <div
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: hex.hex }}
                      />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Pick a Color</DialogTitle>
                    </DialogHeader>
                    <ColorPicker height={200} color={hex} onChange={setHex} />
                    <DialogFooter>
                      <Button onClick={handleColorConfirm}>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-button hover:bg-white text-secondary border border-secondary" disabled={!hex.hex}>
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
