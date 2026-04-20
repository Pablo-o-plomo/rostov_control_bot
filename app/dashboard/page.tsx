import Link from 'next/link';
import { getRestaurants } from '@/api/services';
import { AppLayout } from '@/components/layout';
import { Card, EmptyState, PageTitle, StatusBadge } from '@/components/ui';
import { formatMoney } from '@/lib/utils';

export default async function DashboardPage() {
  const restaurants = await getRestaurants();

  return (
    <AppLayout>
      <PageTitle title="Dashboard бухгалтера" subtitle="Еженедельный контроль ресторанов" />
      {restaurants.length === 0 ? <EmptyState text="Нет ресторанов для отображения" /> : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {restaurants.map((item) => (
            <Link key={item.id} href={`/restaurants/${item.id}`}>
              <Card className="space-y-3 hover:border-slate-400">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{item.name}</h3>
                  <StatusBadge value={item.weekStatus} />
                </div>
                <p className="text-sm text-slate-600">Активная неделя: {item.activeWeekLabel}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>Red issues: <span className="font-semibold text-red-600">{item.redIssues}</span></p>
                  <p>Open tasks: <span className="font-semibold">{item.openTasks}</span></p>
                  <p>Revenue: <span className="font-semibold">{formatMoney(item.revenue)}</span></p>
                  <p>Food Cost: <span className="font-semibold">{item.foodCostPercent}%</span></p>
                  <p>FOT: <span className="font-semibold">{item.fotPercent}%</span></p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
