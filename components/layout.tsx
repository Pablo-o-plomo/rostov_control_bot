import Link from 'next/link';
import { ReactNode } from 'react';

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
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 h-full w-56 border-r border-slate-200 bg-white p-4">
        <p className="mb-6 text-lg font-bold">Rostov Control</p>
        <nav className="space-y-2">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="ml-56 p-6">{children}</main>
    </div>
  );
}
