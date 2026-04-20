import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
    </div>
  );
}

export function StatusBadge({ value }: { value: string }) {
  const normalized = value.toLowerCase();
  const cls =
    normalized.includes('red') || normalized.includes('critical') || normalized.includes('open')
      ? 'bg-red-100 text-red-700'
      : normalized.includes('yellow') || normalized.includes('warning') || normalized.includes('progress')
        ? 'bg-amber-100 text-amber-700'
        : 'bg-green-100 text-green-700';

  return <span className={cn('rounded-full px-2 py-1 text-xs font-medium', cls)}>{value}</span>;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-lg border border-slate-200 bg-white p-4 shadow-sm', className)}>{children}</div>;
}

export function EmptyState({ text }: { text: string }) {
  return <Card><p className="text-sm text-slate-500">{text}</p></Card>;
}

export function SectionLink({ href, title, subtitle }: { href: string; title: string; subtitle?: string }) {
  return (
    <Link href={href} className="block rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-400">
      <h3 className="font-semibold">{title}</h3>
      {subtitle ? <p className="mt-2 text-sm text-slate-600">{subtitle}</p> : null}
    </Link>
  );
}
