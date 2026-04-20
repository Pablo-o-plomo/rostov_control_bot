'use client';

import { useMemo, useState, useTransition } from 'react';
import { updateTaskStatus } from '@/api/services';
import { Task } from '@/types/entities';

export function TasksBoard({ tasks }: { tasks: Task[] }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [restaurantFilter, setRestaurantFilter] = useState('all');
  const [localTasks, setLocalTasks] = useState(tasks);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => localTasks.filter((t) =>
    (statusFilter === 'all' || t.status === statusFilter) &&
    (restaurantFilter === 'all' || t.restaurant === restaurantFilter)
  ), [localTasks, restaurantFilter, statusFilter]);

  const restaurants = Array.from(new Set(localTasks.map((t) => t.restaurant)));

  const changeStatus = (taskId: string, status: Task['status']) => {
    const prev = localTasks;
    setLocalTasks((list) => list.map((item) => item.id === taskId ? { ...item, status } : item));
    startTransition(async () => {
      try {
        await updateTaskStatus(taskId, status);
      } catch {
        setLocalTasks(prev);
      }
    });
  };

  return (
    <div className="space-y-3">
      <div className="grid gap-2 md:grid-cols-2">
        <select value={restaurantFilter} onChange={(e) => setRestaurantFilter(e.target.value)} className="rounded-md border bg-white p-2 text-sm">
          {['all', ...restaurants].map((r) => <option key={r} value={r}>restaurant: {r}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-md border bg-white p-2 text-sm">
          {['all','todo','in_progress','done'].map((s) => <option key={s} value={s}>status: {s}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100"><tr><th className="p-3">Title</th><th>Description</th><th>Status</th><th>Assigned</th><th>Deadline</th><th>Block</th><th>Restaurant</th></tr></thead>
          <tbody>
            {filtered.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="p-3 font-medium">{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <select value={task.status} onChange={(e) => changeStatus(task.id, e.target.value as Task['status'])} className="rounded border p-1">
                    {['todo','in_progress','done'].map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td>{task.assignedUser ?? '—'}</td>
                <td>{task.deadline ?? '—'}</td>
                <td>{task.block}</td>
                <td>{task.restaurant}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPending ? <p className="text-xs text-slate-500">Сохранение статуса...</p> : null}
    </div>
  );
}
