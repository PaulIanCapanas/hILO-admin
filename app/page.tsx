import Login from "@/components/Login";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 bg-purple-700 p-4 items-center flex flex-col justify-between">
        <Login />
      </main>
    </div>
  );
}