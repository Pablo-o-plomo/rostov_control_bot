import { getPrices } from '@/api/services';
import { AppLayout } from '@/components/layout';
import { PricesTable } from '@/components/prices';
import { PageTitle } from '@/components/ui';

export default async function PricesPage() {
  const prices = await getPrices();

  return (
    <AppLayout>
      <PageTitle title="Prices" subtitle="Контроль закупочных цен" />
      <PricesTable initial={prices} />
    </AppLayout>
  );
}
