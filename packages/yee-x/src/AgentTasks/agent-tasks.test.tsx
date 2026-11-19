import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import AgentTasks from './agent-tasks';
import type { AgentTask } from './interface';

const tasks: Array<AgentTask> = [
  {
    key: 't1',
    title: 'Running task',
    status: 'running',
    createdAt: Date.now() - 64_000,
    steps: [{ key: 's1', title: 'Step one', status: 'success' }],
  },
  { key: 't2', title: 'Waiting task', status: 'waiting' },
  { key: 't3', title: 'Failed task', status: 'failed', duration: 312 },
  { key: 't4', title: 'Done task', status: 'success', duration: 87 },
];

describe('AgentTasks', () => {
  it('renders rows with status tags and tab counts', () => {
    const { container } = render(<AgentTasks tasks={tasks} />);

    expect(screen.getByText('Running task')).toBeInTheDocument();
    expect(container.querySelectorAll('.yee-agent-tasks-item-status-waiting')).toHaveLength(1);
    expect(screen.getAllByText('All')).toHaveLength(1);
    expect(screen.getByText('1m4s')).toBeInTheDocument(); // live clock for t1
    expect(screen.getByText('5m12s')).toBeInTheDocument(); // static duration for t3
  });

  it('filters by status via tabs', () => {
    render(<AgentTasks tasks={tasks} />);

    fireEvent.click(screen.getAllByRole('button', { name: /Failed/ })[0]);
    expect(screen.queryByText('Running task')).not.toBeInTheDocument();
    expect(screen.getByText('Failed task')).toBeInTheDocument();
  });

  it('unfolds steps for expanded rows', () => {
    render(<AgentTasks tasks={tasks} defaultExpandedKeys={['t1']} />);
    expect(screen.getByText('Step one')).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: 'Collapse' })[0]);
    expect(screen.queryByText('Step one')).not.toBeInTheDocument();
  });

  it('mounts actions per status', () => {
    const onApprove = vi.fn();
    const onRetry = vi.fn();
    render(<AgentTasks tasks={tasks} onApprove={onApprove} onRetry={onRetry} />);

    fireEvent.click(screen.getByRole('button', { name: 'Approve' }));
    expect(onApprove).toHaveBeenCalledWith(expect.objectContaining({ key: 't2' }));

    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledWith(expect.objectContaining({ key: 't3' }));
  });

  it('shows the empty state when nothing matches', () => {
    render(<AgentTasks tasks={tasks} defaultFilter="cancelled" />);
    expect(screen.getByText('No tasks')).toBeInTheDocument();
  });
});
