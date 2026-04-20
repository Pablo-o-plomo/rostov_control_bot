'use client';

import { useState } from 'react';
import { addPrice } from '@/api/services';
import { PriceRecord } from '@/types/entities';
import { StatusBadge } from '@/components/ui';

export function PricesTable({ initial }: { initial: PriceRecord[] }) {
  const [records, setRecords] = useState(initial);
  const [form, setForm] = useState({ product: '', supplier: '', restaurant: '', price: '', date: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    try {
      const created = await addPrice(payload);
      setRecords((x) => [created, ...x]);
      setForm({ product: '', supplier: '', restaurant: '', price: '', date: '' });
    } catch {
      setRecords((x) => [{ id: `local-${Date.now()}`, ...payload, deltaPercent: 0, status: 'yellow' }, ...x]);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="grid gap-2 rounded-lg border bg-white p-3 md:grid-cols-5">
        {['product','supplier','restaurant','price','date'].map((field) => (
          <input key={field} required value={(form as Record<string,string>)[field]} onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))} type={field === 'price' ? 'number' : field === 'date' ? 'date' : 'text'} placeholder={field} className="rounded-md border p-2 text-sm" />
        ))}
        <button className="rounded-md bg-slate-900 px-3 py-2 text-white md:col-span-5">Добавить новую цену</button>
      </form>
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100"><tr><th className="p-3">Продукт</th><th>Поставщик</th><th>Ресторан</th><th>Цена</th><th>Дата</th><th>Изм.</th><th>Статус</th></tr></thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.product}</td><td>{r.supplier}</td><td>{r.restaurant}</td><td>{r.price}</td><td>{r.date}</td><td>{r.deltaPercent}%</td><td><StatusBadge value={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
