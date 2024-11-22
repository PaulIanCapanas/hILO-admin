import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-500 text-white">
      <nav>
        <h1 className="my-6 text-center text-2xl text-white">hILO Admin</h1>
        <ul>
          <li className="my-6 text-center hover:bg-slate-400">
            <Link href="/">Members</Link>
          </li>
          <li className="my-6 text-center hover:bg-slate-400">
            <Link href="/analytics">Analytics</Link>
          </li>
          <li className="my-6 text-center hover:bg-slate-400">
            <Link href="/colors">Colors</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
