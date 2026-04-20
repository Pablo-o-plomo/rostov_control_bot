import { getIssues } from '@/api/services';
import { AppLayout } from '@/components/layout';
import { PageTitle } from '@/components/ui';
import { IssuesTable } from '@/components/issues';

export default async function IssuesPage() {
  const issues = await getIssues();
  return (
    <AppLayout>
      <PageTitle title="Проблемы" subtitle="Проблемы с фильтрами" />
      <IssuesTable issues={issues} />
    </AppLayout>
  );
}
