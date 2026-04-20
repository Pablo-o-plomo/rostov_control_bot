'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Issue } from '@/types/entities';
import { StatusBadge } from '@/components/ui';

export function IssuesTable({ issues }: { issues: Issue[] }) {
  const [status, setStatus] = useState('all');
  const [severity, setSeverity] = useState('all');
  const [restaurant, setRestaurant] = useState('all');
  const [period, setPeriod] = useState('all');

  const filtered = useMemo(() => issues.filter((i) =>
    (status === 'all' || i.status === status) &&
    (severity === 'all' || i.severity === severity) &&
    (restaurant === 'all' || i.restaurantName === restaurant) &&
    (period === 'all' || i.weekLabel === period)
  ), [issues, period, restaurant, severity, status]);

  const restaurants = Array.from(new Set(issues.map((i) => i.restaurantName)));
  const periods = Array.from(new Set(issues.map((i) => i.weekLabel)));

  return (
    <div className="space-y-3">
      <div className="grid gap-2 md:grid-cols-4">
        {[['status', status, setStatus, ['all','open','in_progress','resolved','closed']], ['severity', severity, setSeverity, ['all','low','medium','high','critical']], ['restaurant', restaurant, setRestaurant, ['all', ...restaurants]], ['period', period, setPeriod, ['all', ...periods]]].map(([label, value, setter, opts]) => (
          <select key={String(label)} value={String(value)} onChange={(e) => (setter as (x:string)=>void)(e.target.value)} className="rounded-md border bg-white p-2 text-sm">
            {(opts as string[]).map((opt) => <option key={opt} value={opt}>{label}: {opt}</option>)}
          </select>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100"><tr><th className="p-3">Title</th><th>Type</th><th>Severity</th><th>Status</th><th>Restaurant</th><th>Week</th><th>Assigned</th><th>Deadline</th></tr></thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3"><Link className="underline" href={`/issues/${item.id}`}>{item.title}</Link></td>
                <td>{item.type}</td>
                <td>{item.severity}</td>
                <td><StatusBadge value={item.status} /></td>
                <td>{item.restaurantName}</td>
                <td>{item.weekLabel}</td>
                <td>{item.assignedUser ?? '—'}</td>
                <td>{item.deadline ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
