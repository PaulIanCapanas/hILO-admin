import React, { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex bg-white p-4">
        {children}
      </main>
    </div>
  )
}