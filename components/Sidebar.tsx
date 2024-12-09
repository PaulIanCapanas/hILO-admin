"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Routes } from "@/enums/routes";
import Logout from "@/helpers/logout";

const menuItems = [
  { title: "Members", route: Routes.MEMBERS },
  { title: "Analytics", route: Routes.ANALYTICS },
  { title: "Colors", route: Routes.COLORS },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-purple-800 text-white flex flex-col min-h-full">
      <nav className="flex-grow">
        <h1 className="text-2xl text-white text-center my-6">hILO Admin</h1>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.route}>
              <Link
                href={`/${item.route}`}
                className={`block text-center py-3 px-4 hover:bg-purple-900 transition-colors ${
                  pathname === `/${item.route}` ? "bg-purple-900" : ""
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex justify-center items-center p-4">
        <button
          className="w-full bg-purple-950 border-purple-950 border-2 rounded-md px-4 py-2 hover:bg-purple-900 transition-colors"
          onClick={() => Logout()}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}