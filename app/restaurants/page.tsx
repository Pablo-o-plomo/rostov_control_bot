import Link from 'next/link';
import { AppLayout } from '@/components/layout';
import { getRestaurants } from '@/api/services';
import { Card, PageTitle } from '@/components/ui';

export default async function RestaurantsPage() {
  const items = await getRestaurants();
  return (
    <AppLayout>
      <PageTitle title="Рестораны" />
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <Link key={item.id} href={`/restaurants/${item.id}`}>
            <Card>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-slate-600">Активная неделя: {item.activeWeekLabel}</p>
            </Card>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
