'use client'

import React, { useState } from "react";
import uploadDocument from "@/helpers/firebase/uploadDocument";

export default function CreateBrand() {
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await uploadDocument("Colors", {
        name: name
      })
      console.log("Successfully uploaded brand")

      setName("");
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className="w-1/2 px-10 py-12 border border-black shadow-md" onSubmit={handleSubmit}>
      <div className="space-y-2 pb-6">
        <p className="text-lg text-black">Brand Name:</p>
        <input
          className="h-10 w-2/4 border border-black rounded-md px-3"
          placeholder="Apple"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button className="h-10 w-24 bg-blue-500 rounded-md text-white">Submit</button>
    </form>
  )
}