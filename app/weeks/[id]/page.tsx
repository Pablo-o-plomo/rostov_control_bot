import { getRestaurants, getWeekBlocks, getWeekMetrics, getWeeks } from '@/api/services';
import { AppLayout } from '@/components/layout';
import { Card, PageTitle, SectionLink, StatusBadge } from '@/components/ui';
import { formatMoney } from '@/lib/utils';

export default async function WeekPage({ params }: { params: { id: string } }) {
  const [weeks, blocks, metrics, restaurants] = await Promise.all([
    getWeeks(),
    getWeekBlocks(params.id),
    getWeekMetrics(params.id),
    getRestaurants(),
  ]);
  const week = weeks.find((w) => w.id === params.id) ?? weeks[0];
  const restaurant = restaurants[0];

  return (
    <AppLayout>
      <PageTitle title={`Неделя ${week?.label ?? params.id}`} subtitle={week?.dateRange} />
      <Card className="mb-4 grid gap-4 md:grid-cols-4">
        <div>
          <p className="text-sm text-slate-500">Ресторан</p>
          <p className="font-semibold">{restaurant?.name ?? '—'}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Статус недели</p>
          <StatusBadge value={week?.status ?? 'unknown'} />
        </div>
        <div>
          <p className="text-sm text-slate-500">Выручка</p>
          <p className="font-semibold">{formatMoney(metrics.revenue)}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Food Cost / FOT</p>
          <p className="font-semibold">{metrics.food_cost_percent}% / {metrics.fot_percent}%</p>
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {blocks.map((block) => (
          <SectionLink key={block.id} href={block.name === 'Решения и результат' ? '/tasks' : '/issues'} title={block.name} subtitle={`${block.metricSummary} · Проблемы: ${block.problemsCount} · Задачи: ${block.tasksCount} · Статус: ${block.status}`} />
        ))}
      </div>
    </AppLayout>
  );
}
