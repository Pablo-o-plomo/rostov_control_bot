'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  ['Dashboard', '/dashboard'],
  ['Restaurants', '/restaurants'],
  ['Weeks', '/weeks'],
  ['Metrics', '/metrics'],
  ['Issues', '/issues'],
  ['Tasks', '/tasks'],
  ['Prices', '/prices'],
] as const;

export function AppLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-lg font-bold">Rostov Control</p>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
          >
            {menuOpen ? 'Закрыть' : 'Меню'}
          </button>
        </div>
      </header>

      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-full w-64 border-r border-slate-200 bg-white p-4 transition-transform md:w-56',
          menuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        <p className="mb-6 text-lg font-bold">Rostov Control</p>
        <nav className="space-y-2">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {menuOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-label="Закрыть меню"
        />
      ) : null}

      <main className="px-4 py-4 md:ml-56 md:p-6">{children}</main>
    </div>
  );
}
