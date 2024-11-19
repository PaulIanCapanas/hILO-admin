import React, { ReactNode} from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <main className="flex bg-white p-4">
        {children}
      </main>
    </div>
  )
}