'use client';

import { useEffect, useMemo, useState } from 'react';
import { getWeekMetrics, saveWeekMetrics } from '@/api/services';
import { MetricsForm } from '@/components/forms';
import { AppLayout } from '@/components/layout';
import { Card, PageTitle } from '@/components/ui';
import { WeekMetrics } from '@/types/entities';

const emptyMetrics: WeekMetrics = {
  weekId: 'w16',
  revenue: 0,
  avg_check: 0,
  guest_count: 0,
  food_cost_value: 0,
  food_cost_percent: 0,
  fot_value: 0,
  fot_percent: 0,
  write_offs_value: 0,
  inventory_diff_value: 0,
  negative_stock_value: 0,
  comments: '',
};

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<WeekMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const weekId = useMemo(() => {
    if (typeof window === 'undefined') return 'w16';
    const value = new URLSearchParams(window.location.search).get('weekId');
    return value || 'w16';
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getWeekMetrics(weekId);
        setMetrics(data);
      } catch (err) {
        setError((err as Error).message || 'Не удалось загрузить метрики');
        setMetrics({ ...emptyMetrics, weekId });
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [weekId]);

  return (
    <AppLayout>
      <PageTitle title="Метрики" subtitle={`Редактирование метрик недели ${weekId}`} />
      {loading ? <Card><p className="text-sm text-slate-600">Загрузка метрик...</p></Card> : null}
      {error ? <Card><p className="text-sm text-red-600">{error}</p></Card> : null}
      {metrics ? <MetricsForm initial={metrics} onSave={(payload) => saveWeekMetrics(weekId, payload)} /> : null}
    </AppLayout>
  );
}
