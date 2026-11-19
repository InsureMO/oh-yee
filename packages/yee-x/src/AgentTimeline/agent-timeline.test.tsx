import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import AgentTimeline from './agent-timeline';
import type { AgentEvent } from './interface';

const events: Array<AgentEvent> = [
  {
    key: 'start',
    agent: 'Orchestrator',
    kind: 'agent',
    title: 'Received the request',
    timestamp: new Date('2026-01-01T10:20:30').getTime(),
  },
  {
    key: 'handoff',
    kind: 'handoff',
    title: 'Handed off to the intake agent',
    children: [
      { key: 'fetch', kind: 'tool', title: 'fetch_documents', duration: 4.2 },
      { key: 'parse', kind: 'tool', title: 'parse_pdf', status: 'running' },
    ],
  },
  { key: 'note', kind: 'note', title: 'Draft ready', status: 'error', duration: 130 },
];

describe('AgentTimeline', () => {
  it('renders events with agents, durations and timestamps', () => {
    render(<AgentTimeline events={events} />);

    expect(screen.getByText('Received the request')).toBeInTheDocument();
    expect(screen.getByText('Orchestrator')).toBeInTheDocument();
    expect(screen.getByText('2:10')).toBeInTheDocument();
    expect(screen.getByText('10:20:30')).toBeInTheDocument();
  });

  it('collapses nested runs by default and shows the step count', () => {
    render(<AgentTimeline events={events} />);

    expect(screen.queryByText('fetch_documents')).not.toBeInTheDocument();
    expect(screen.getByText('2 steps')).toBeInTheDocument();
  });

  it('expands nested runs on click', () => {
    render(<AgentTimeline events={events} />);

    fireEvent.click(screen.getByRole('button', { name: /2 steps/ }));
    expect(screen.getByText('fetch_documents')).toBeInTheDocument();
    expect(screen.getByText('parse_pdf')).toBeInTheDocument();
    expect(screen.getByText('4.2s')).toBeInTheDocument();
  });

  it('expands all nested runs with defaultExpandAll', () => {
    render(<AgentTimeline events={events} defaultExpandAll />);
    expect(screen.getByText('fetch_documents')).toBeInTheDocument();
  });

  it('marks error events', () => {
    const { container } = render(<AgentTimeline events={events} />);
    expect(container.querySelector('.yee-agent-timeline-event-error')).not.toBeNull();
  });
});
