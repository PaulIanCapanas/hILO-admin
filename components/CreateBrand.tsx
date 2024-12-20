"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import uploadDocument from "@/helpers/firebase/uploadDocument";
import { Collection } from "@/enums/collection";

interface CreateBrandProps {
  setRecentlyCreatedBrands: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateBrand: (newBrand: {id: string; name: string}) => void
}

export default function CreateBrand(props: CreateBrandProps) {
  const { setRecentlyCreatedBrands, onCreateBrand } = props;
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newBrandId = await uploadDocument(Collection.BRANDS, {
        name: name,
      });
      console.log("Successfully uploaded brand");

      onCreateBrand({ id: newBrandId, name });

      setRecentlyCreatedBrands(true);
      setName("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <Card className="w-full max-w-md bg-primary">
        <CardHeader>
          <CardTitle>Create New Brand</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input
                id="brandName"
                placeholder="Apple"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-button text-black hover:bg-white">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
  );
}