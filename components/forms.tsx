'use client';

import { useState } from 'react';
import { getTelegramAuthStatus, login, startTelegramAuth } from '@/api/services';
import { WeekMetrics } from '@/types/entities';

const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_EMAIL ?? 'demo@company.com';
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_PASSWORD ?? 'demo1234';
const TELEGRAM_BOT_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? '';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [telegramLoading, setTelegramLoading] = useState(false);

  const onTelegramLogin = async () => {
    setError(null);
    setTelegramLoading(true);
    try {
      const session = await startTelegramAuth();
      const botUsername = session.botUsername || TELEGRAM_BOT_USERNAME;
      if (!botUsername) {
        throw new Error('Не задан Telegram bot username');
      }

      window.open(`https://t.me/${botUsername}?start=${session.token}`, '_blank');

      const poll = async () => {
        const status = await getTelegramAuthStatus(session.token);
        if (status.status === 'confirmed') {
          window.location.href = '/dashboard';
          return;
        }
        if (status.status === 'expired') {
          setError('Сессия Telegram входа истекла. Запустите снова.');
          setTelegramLoading(false);
          return;
        }
        setTimeout(poll, 3000);
      };

      setTimeout(poll, 3000);
    } catch (err) {
      if (TELEGRAM_BOT_USERNAME) {
        window.open(`https://t.me/${TELEGRAM_BOT_USERNAME}`, '_blank');
      }
      setError((err as Error).message || 'Не удалось начать вход через Telegram');
      setTelegramLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await login(email, password);
      window.location.href = '/dashboard';
    } catch (err) {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        window.location.href = '/dashboard';
        return;
      }
      setError((err as Error).message || 'Ошибка входа');
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-24 max-w-md space-y-4 rounded-xl border bg-white p-6">
      <h1 className="text-2xl font-bold">Вход в систему</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border p-2" required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" type="password" className="w-full rounded-md border p-2" required />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button className="w-full rounded-md bg-slate-900 px-3 py-2 text-white">Войти</button>
      <button type="button" onClick={onTelegramLogin} className="w-full rounded-md border border-slate-300 px-3 py-2" disabled={telegramLoading}>
        {telegramLoading ? 'Ожидание подтверждения в Telegram...' : 'Войти через Telegram'}
      </button>
      <p className="text-xs text-slate-500">Demo: {DEMO_EMAIL} / {DEMO_PASSWORD}</p>
    </form>
  );
}

export function MetricsForm({ initial, onSave }: { initial: WeekMetrics; onSave: (payload: WeekMetrics) => Promise<unknown> }) {
  const [form, setForm] = useState<WeekMetrics>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const updateNumber = (key: keyof WeekMetrics, value: string) => setForm((prev) => ({ ...prev, [key]: Number(value) }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setOk(null);
    try {
      await onSave(form);
      setOk('Метрики сохранены.');
    } catch (err) {
      setError((err as Error).message || 'Не удалось сохранить');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border bg-white p-4 md:grid-cols-2">
      {['revenue','avg_check','guest_count','food_cost_value','food_cost_percent','fot_value','fot_percent','write_offs_value','inventory_diff_value','negative_stock_value'].map((field) => (
        <label key={field} className="text-sm font-medium">
          {field}
          <input
            type="number"
            value={String(form[field as keyof WeekMetrics] ?? '')}
            onChange={(e) => updateNumber(field as keyof WeekMetrics, e.target.value)}
            className="mt-1 w-full rounded-md border p-2 font-normal"
          />
        </label>
      ))}
      <label className="md:col-span-2 text-sm font-medium">comments
        <textarea value={form.comments} onChange={(e) => setForm((p) => ({ ...p, comments: e.target.value }))} className="mt-1 w-full rounded-md border p-2 font-normal" />
      </label>
      {error ? <p className="md:col-span-2 text-sm text-red-600">{error}</p> : null}
      {ok ? <p className="md:col-span-2 text-sm text-green-600">{ok}</p> : null}
      <button disabled={saving} className="md:col-span-2 rounded-md bg-slate-900 px-3 py-2 text-white disabled:opacity-60">{saving ? 'Сохранение...' : 'Сохранить метрики'}</button>
    </form>
  );
}
