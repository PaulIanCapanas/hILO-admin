import React from "react"
import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-500 text-white">
      <nav>
        <h1 className="text-2xl text-white text-center my-6">hILO Admin</h1>
        <ul>
          <li className="text-center my-6 hover:bg-slate-400">
            <Link href="/">Members</Link>
          </li>
          <li className="text-center my-6 hover:bg-slate-400">
            <Link href="/analytics">Analytics</Link>
          </li>
          <li className="text-center my-6 hover:bg-slate-400">
            <Link href="/colors">Colors</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}