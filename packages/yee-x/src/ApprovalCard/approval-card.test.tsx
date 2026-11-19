import '@testing-library/jest-dom/vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ApprovalCard from './approval-card';

afterEach(() => {
  vi.useRealTimers();
});

describe('ApprovalCard', () => {
  it('renders the title, risk badge and description', () => {
    render(
      <ApprovalCard title="Delete 3 rows" risk="high" description="Duplicates from a retried import" />,
    );

    expect(screen.getByText('Delete 3 rows')).toBeInTheDocument();
    expect(screen.getByText('High risk')).toBeInTheDocument();
    expect(screen.getByText('Duplicates from a retried import')).toBeInTheDocument();
  });

  it('renders the agent chip and payload preview', () => {
    render(<ApprovalCard title="Send emails" agent="Email agent" preview={'ids: [1, 2]'} />);
    expect(screen.getByText('Email agent')).toBeInTheDocument();
    expect(screen.getByText('ids: [1, 2]')).toBeInTheDocument();
  });

  it('decides with the selected scope', () => {
    const onDecide = vi.fn();
    render(
      <ApprovalCard
        title="Send emails"
        scopes={['once', 'session', 'always']}
        onDecide={onDecide}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Always' }));
    fireEvent.click(screen.getByRole('button', { name: 'Approve' }));

    expect(onDecide).toHaveBeenCalledWith('approved', 'always');
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('collapses into a resolved row with undo', () => {
    const onUndo = vi.fn();
    render(<ApprovalCard title="Archive policies" onDecide={() => {}} onUndo={onUndo} />);

    fireEvent.click(screen.getByRole('button', { name: 'Deny' }));
    expect(screen.getByText('Denied')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onUndo).toHaveBeenCalledTimes(1);
    // uncontrolled mode: the card reopens for a new decision
    expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
  });

  it('expires to denied and calls onExpire when the countdown runs out', () => {
    vi.useFakeTimers();
    const onExpire = vi.fn();
    const onDecide = vi.fn();
    render(
      <ApprovalCard title="Send emails" countdown={3} onExpire={onExpire} onDecide={onDecide} />,
    );

    expect(screen.getByText('0:03')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(3100);
    });

    expect(onExpire).toHaveBeenCalledTimes(1);
    expect(onDecide).not.toHaveBeenCalled(); // expiry is not a user decision
    expect(screen.getByText('Expired without approval')).toBeInTheDocument();
  });

  it('respects the controlled decision', () => {
    render(<ApprovalCard title="Archive" decision="approved" />);
    expect(screen.getByText('Approved')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Approve' })).not.toBeInTheDocument();
  });
});

describe('ApprovalCard countdown lifecycle', () => {
  it('restarts the countdown when a controlled decision clears (undo/reopen)', () => {
    vi.useFakeTimers();
    const onExpire = vi.fn();
    const { rerender } = render(
      <ApprovalCard title="Send" countdown={30} onExpire={onExpire} />,
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('0:29')).toBeInTheDocument();

    // resolve externally: the clock must stop
    rerender(<ApprovalCard title="Send" countdown={30} onExpire={onExpire} decision="denied" />);
    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(onExpire).not.toHaveBeenCalled();

    // reopen: the countdown restarts from the full budget, not from 0
    rerender(
      <ApprovalCard title="Send" countdown={30} onExpire={onExpire} decision={undefined} />,
    );
    expect(screen.getByText('0:30')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('0:29')).toBeInTheDocument();
    expect(onExpire).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
