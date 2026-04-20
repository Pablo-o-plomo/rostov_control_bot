'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Ошибка загрузки</h2>
      <p className="mt-2 text-sm text-slate-600">{error.message}</p>
      <button className="mt-4 rounded-md bg-slate-900 px-3 py-2 text-white" onClick={reset}>Повторить</button>
    </div>
  );
}
