import Link from 'next/link';
import { getRestaurantWeeks, getRestaurants } from '@/api/services';
import { AppLayout } from '@/components/layout';
import { Card, EmptyState, PageTitle, StatusBadge } from '@/components/ui';

export default async function RestaurantPage({ params }: { params: { id: string } }) {
  const [restaurants, weeks] = await Promise.all([getRestaurants(), getRestaurantWeeks(params.id)]);
  const restaurant = restaurants.find((i) => i.id === params.id) ?? restaurants[0];

  return (
    <AppLayout>
      <PageTitle title={restaurant?.name ?? 'Ресторан'} subtitle="Недели и статус контроля" />
      {weeks.length === 0 ? <EmptyState text="Недели не найдены" /> : (
        <div className="space-y-3">
          {weeks.map((week) => (
            <Link key={week.id} href={`/weeks/${week.id}`}>
              <Card className="flex items-center justify-between hover:border-slate-400">
                <div>
                  <h3 className="font-semibold">{week.label}</h3>
                  <p className="text-sm text-slate-600">{week.dateRange}</p>
                </div>
                <div className="text-right text-sm">
                  <StatusBadge value={week.status} />
                  <p>Проблем: {week.issuesCount}</p>
                  <p>Задач: {week.tasksCount}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
