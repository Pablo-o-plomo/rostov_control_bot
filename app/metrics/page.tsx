import { MetricsForm } from '@/components/forms';
import { AppLayout } from '@/components/layout';
import { PageTitle } from '@/components/ui';
import { getWeekMetrics, saveWeekMetrics } from '@/api/services';

export default async function MetricsPage({ searchParams }: { searchParams: { weekId?: string } }) {
  const weekId = searchParams.weekId ?? 'w16';
  const metrics = await getWeekMetrics(weekId);

  return (
    <AppLayout>
      <PageTitle title="Metrics" subtitle={`Редактирование метрик недели ${weekId}`} />
      <MetricsForm initial={metrics} onSave={(payload) => saveWeekMetrics(weekId, payload)} />
    </AppLayout>
  );
}
