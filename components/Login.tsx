"use client";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Routes } from "@/enums/routes";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const auth = getAuth();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User has signed in!");
      router.replace(`/${Routes.MEMBERS}`);
    } catch (error) {
      alert("User sign in has failed.");
    }
  }

  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <div className="w-full max-w-5xl px-4 py-14 flex flex-col items-center">
        <h2 className="font-bold text-3xl md:text-6xl text-center mb-8">
          Welcome to the hILO Admin Dashboard
        </h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <label className="text-2xl mb-2 sm:mb-0" htmlFor="email">
                Email:
              </label>
              <input
                className="m-2 p-2 rounded-md text-black w-full sm:w-2/3"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <label className="text-2xl mb-2 sm:mb-0" htmlFor="password">
                Password:
              </label>
              <input
                className="m-2 p-2 rounded-md text-black w-full sm:w-2/3"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              className="bg-white text-purple-700 px-6 py-2 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-colors"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
