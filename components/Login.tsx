"use client";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div className="rounded-2xl bg-slate-500 w-9/12 min-h-14 p-14 justify-center items-center flex flex-col">
      <h2 className="font-bold text-5xl align-middle justify-self-center">
        Welcome to the hILO Admin Dashboard
      </h2>
      <form onSubmit={handleSubmit} className="items-center flex flex-col">
        <div className="px-48">
          <div className="py-2 flex flex-row justify-between items-center">
            <label className="text-xl" htmlFor="email">
              Email:
            </label>
            <input
              className="m-2 p-2 rounded-2xl text-black"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="py-2 flex flex-row justify-between items-center">
            <label className="text-xl" htmlFor="password">
              Password:
            </label>
            <input
              className="m-2 p-2 rounded-2xl text-black"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          className="bg-white text-black px-4 py-2 rounded-xl"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
