'use client';

import React, { FormEvent, useState } from 'react';
import uploadDocument from '@/helpers/firebase/uploadDocument';

export default function CreateColor() {
  const [name, setName] = useState<string>('');
  const [hex, setHex] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await uploadDocument('colors', {
        name: name,
        hex: hex,
        code: code,
      });
      console.log('Successfully uploaded color to database');

      setName('');
      setHex('');
      setCode('');
    } catch (error) {
      console.error('Failed to create color', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 border border-black px-10 py-12 shadow-md"
    >
      <div className="space-y-3 pb-4">
        <p className="text-lg text-black">Color:</p>
        <input
          className="h-8 w-2/4 rounded-md border border-black px-4"
          placeholder="Purple Haze"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-3 pb-4">
        <p className="text-lg text-black">Category:</p>
      </div>
      <div className="space-y-4 pb-4">
        <p className="text-lg text-black">Hex Code:</p>
      </div>
      <div className="space-y-3 pb-8">
        <p className="text-lg text-black">Code:</p>
        <input
          className="h-8 w-2/4 rounded-md border border-black px-4"
          placeholder="201"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <button className="h-10 w-24 rounded-md bg-purple-500 text-white">
        Submit
      </button>
    </form>
  );
}
