'use client';

import { useState } from 'react';
import { fillIssueAnalysis } from '@/api/services';
import { Issue } from '@/types/entities';
import { Card, StatusBadge } from '@/components/ui';

export function IssueDetail({ issue }: { issue: Issue }) {
  const [reason, setReason] = useState(issue.analysis?.reason ?? '');
  const [solution, setSolution] = useState(issue.analysis?.solution ?? '');
  const [result, setResult] = useState(issue.analysis?.result ?? '');
  const [assignedUser, setAssignedUser] = useState(issue.assignedUser ?? '');
  const [deadline, setDeadline] = useState(issue.deadline ?? '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const canEdit = !issue.analysis;

  const submitAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await fillIssueAnalysis(issue.id, { reason, solution, result, assignedUser, deadline });
      setMessage('Анализ сохранен. Обновите страницу для актуальных данных.');
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-bold">{issue.title}</h2>
        <p className="mt-2 text-sm text-slate-600">{issue.description}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <span>Severity: {issue.severity}</span>
          <StatusBadge value={issue.status} />
          <span>Assigned: {issue.assignedUser ?? '—'}</span>
          <span>Deadline: {issue.deadline ?? '—'}</span>
        </div>
      </Card>

      <Card>
        <h3 className="mb-2 font-semibold">Причины / Решения / Результат</h3>
        <form onSubmit={submitAnalysis} className="space-y-2">
          <textarea className="w-full rounded-md border p-2" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason" disabled={!canEdit} required={canEdit} />
          <textarea className="w-full rounded-md border p-2" value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="Solution" disabled={!canEdit} required={canEdit} />
          <textarea className="w-full rounded-md border p-2" value={result} onChange={(e) => setResult(e.target.value)} placeholder="Result" disabled={!canEdit} required={canEdit} />
          <input className="w-full rounded-md border p-2" value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)} placeholder="Assigned user" disabled={!canEdit} />
          <input className="w-full rounded-md border p-2" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} disabled={!canEdit} />
          {canEdit ? <button disabled={saving} className="rounded-md bg-slate-900 px-3 py-2 text-white">{saving ? 'Сохранение...' : 'Сохранить анализ'}</button> : <p className="text-sm text-slate-600">Анализ уже заполнен.</p>}
          {message ? <p className="text-sm text-slate-700">{message}</p> : null}
        </form>
      </Card>

      <Card>
        <h3 className="mb-2 font-semibold">История комментариев</h3>
        <div className="space-y-2 text-sm">
          {issue.comments.map((comment) => (
            <div key={comment.id} className="rounded border p-2">
              <p className="font-medium">{comment.author} · {comment.createdAt}</p>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
