"use client";

import React, { FormEvent, useEffect, useState } from "react";
import queryAllDocument from "@/helpers/firebase/queryAllDocument";
import { Brand } from "@/types/brands";
import { Collection } from "@/enums/collection";
import uploadDocumentToSubCol from "@/helpers/firebase/uploadDocumentToSubCol";
import { SubCollection } from "@/enums/subcollection";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

interface CreateColorProps {
  recentlyCreatedBrands: boolean;
}

export default function CreateColor(props: CreateColorProps) {
  const { recentlyCreatedBrands } = props;
  const [name, setName] = useState<string>("");
  const [hex, setHex] = useColor("hex");
  const [code, setCode] = useState<string>("");
  const [brand, setBrand] = useState<string>("Brands");

  const [queriedBrands, setQueriedBrands] = useState<Brand[]>([]);
  const [fetchingBrands, setFetchingBrands] = useState<boolean>(true);

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
          hex: hex,
          code: code,
        }
      );
      console.log("Successfully uploaded color to database");

      setName("");
      setCode("");
    } catch (error) {
      console.error("Failed to create color", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 px-10 py-12 border border-black shadow-md"
    >
      <div className="space-y-3 pb-4">
        <p className="text-black text-lg">Color:</p>
        <input
          className="h-8 w-2/4 border border-black rounded-md px-4 text-black"
          placeholder="Purple Haze"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-3 pb-4">
        <p className="text-black text-lg">Brand:</p>
        <select
          className="h-8 w-2/4 border border-black rounded-md px-4 text-black"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          disabled={fetchingBrands}
        >
          <option value="" className="hidden" disabled></option>
          {queriedBrands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
      <div className=" pb-4">
        <p className="text-black text-lg">Hex Code:</p>
        <ColorPicker height={300} color={hex} onChange={setHex} />
      </div>
      <div className="space-y-3 pb-8">
        <p className="text-black text-lg">Code:</p>
        <input
          className="h-8 w-2/4 border border-black rounded-md px-4 text-black"
          placeholder="201"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button className="h-10 w-24 bg-purple-500 rounded-md text-white">
        Submit
      </button>
    </form>
  );
}
