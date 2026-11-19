import { AgentTasks, type AgentTask } from '@rainbow-oh/yee-x';
import React from 'react';

const tasks: Array<AgentTask> = [
  {
    key: 't1',
    title: 'Reconcile November premium files',
    status: 'running',
    createdAt: Date.now() - 203_000,
    meta: 'worker-2',
    steps: [
      { key: 's1', title: 'Downloaded 3 files from SFTP', status: 'success' },
      { key: 's2', title: 'Parsing row 14,204 of 42,000', status: 'running' },
      { key: 's3', title: 'Post to ledger', status: 'pending' },
    ],
  },
  {
    key: 't2',
    title: 'Send renewal notices (batch #41)',
    status: 'waiting',
    meta: 'needs approval',
    steps: [
      { key: 's1', title: 'Built 128 drafts', status: 'success' },
      { key: 's2', title: 'Waiting for send approval', status: 'running' },
    ],
  },
  {
    key: 't3',
    title: 'Update risk scores for Q4',
    status: 'failed',
    duration: 312,
    steps: [
      { key: 's1', title: 'Loaded 1,240 policies', status: 'success' },
      { key: 's2', title: 'Scoring API returned 503', status: 'error' },
    ],
  },
  {
    key: 't4',
    title: 'Nightly document archive',
    status: 'success',
    duration: 87,
  },
];

export default function Basic() {
  return (
    <div style={{ width: 560 }}>
      <AgentTasks
        tasks={tasks}
        defaultExpandedKeys={['t1']}
        onApprove={() => {}}
        onReject={() => {}}
        onRetry={() => {}}
        onOpen={() => {}}
      />
    </div>
  );
}
