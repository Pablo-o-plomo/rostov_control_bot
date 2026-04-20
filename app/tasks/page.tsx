import { getTasks } from '@/api/services';
import { AppLayout } from '@/components/layout';
import { TasksBoard } from '@/components/tasks';
import { PageTitle } from '@/components/ui';

export default async function TasksPage() {
  const tasks = await getTasks();
  return (
    <AppLayout>
      <PageTitle title="Задачи" subtitle="Управление задачами" />
      <TasksBoard tasks={tasks} />
    </AppLayout>
  );
}
