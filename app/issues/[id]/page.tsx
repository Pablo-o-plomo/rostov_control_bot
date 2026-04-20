import { getIssueById } from '@/api/services';
import { IssueDetail } from '@/components/issue-detail';
import { AppLayout } from '@/components/layout';
import { PageTitle } from '@/components/ui';

export default async function IssuePage({ params }: { params: { id: string } }) {
  const issue = await getIssueById(params.id);

  return (
    <AppLayout>
      <PageTitle title="Issue details" subtitle={`ID: ${params.id}`} />
      <IssueDetail issue={issue} />
    </AppLayout>
  );
}
