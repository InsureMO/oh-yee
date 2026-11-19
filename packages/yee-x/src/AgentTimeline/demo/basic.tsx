import { AgentTimeline, type AgentEvent } from '@rainbow-oh/yee-x';
import React from 'react';

const now = Date.now();

const events: Array<AgentEvent> = [
  {
    key: 'start',
    agent: 'Orchestrator',
    kind: 'agent',
    title: 'Received the claim review request',
    timestamp: now - 120_000,
  },
  {
    key: 'handoff',
    kind: 'handoff',
    agent: 'Orchestrator',
    title: 'Handed document parsing to the intake agent',
    timestamp: now - 115_000,
    children: [
      {
        key: 'intake-fetch',
        kind: 'tool',
        agent: 'Intake',
        title: 'fetch_documents',
        detail: '3 files retrieved from the SFTP inbox',
        status: 'success',
        duration: 4.2,
        timestamp: now - 112_000,
      },
      {
        key: 'intake-parse',
        kind: 'tool',
        agent: 'Intake',
        title: 'parse_pdf',
        status: 'success',
        duration: 11.8,
        timestamp: now - 96_000,
      },
    ],
  },
  {
    key: 'approve',
    kind: 'approval',
    agent: 'Orchestrator',
    title: 'Waiting for approval to overwrite the reserve amount',
    status: 'running',
    timestamp: now - 40_000,
  },
  {
    key: 'note',
    kind: 'note',
    agent: 'Orchestrator',
    title: 'Reserve delta: +$1,240 vs. initial estimate',
    detail: 'Driven by clause 3.2 of the policy terms.',
    status: 'success',
    timestamp: now - 30_000,
  },
];

export default function Basic() {
  return (
    <div style={{ width: 560 }}>
      <AgentTimeline events={events} defaultExpandedKeys={['handoff']} />
    </div>
  );
}
