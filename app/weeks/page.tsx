import Link from 'next/link';
import { getWeeks } from '@/api/services';
import { AppLayout } from '@/components/layout';
import { Card, PageTitle, StatusBadge } from '@/components/ui';

export default async function WeeksPage() {
  const weeks = await getWeeks();

  return (
    <AppLayout>
      <PageTitle title="Weeks" subtitle="Сводный список недель" />
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
                <p>Issues: {week.issuesCount}</p>
                <p>Tasks: {week.tasksCount}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
