import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import ToolCall from './tool-call';

describe('ToolCall', () => {
  it('renders the summary line collapsed by default', () => {
    render(
      <ToolCall
        name="search_docs"
        status="success"
        duration={0.8}
        args={{ q: 'x' }}
        result={{ hits: 1 }}
      />,
    );

    expect(screen.getByText('search_docs')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByText('0.8s')).toBeInTheDocument();
    expect(screen.queryByText('Arguments')).not.toBeInTheDocument();
  });

  it('expands to show args and result JSON', () => {
    render(<ToolCall name="search_docs" args={{ q: 'x' }} result={{ hits: 1 }} />);

    // collapsed by default
    fireEvent.click(screen.getByRole('button', { name: 'Expand' }));

    expect(screen.getByText('Arguments')).toBeInTheDocument();
    expect(screen.getByText('Result')).toBeInTheDocument();
    expect(screen.getByText(/"q": "x"/)).toBeInTheDocument();
    expect(screen.getByText(/"hits": 1/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Collapse' }));
    expect(screen.queryByText('Arguments')).not.toBeInTheDocument();
  });

  it('does not render a collapse affordance without a body', () => {
    render(<ToolCall name="ping" status="pending" />);
    expect(screen.queryByRole('button', { name: 'Collapse' })).not.toBeInTheDocument();
  });

  it('shows a retry button on error', () => {
    const onRetry = vi.fn();
    render(
      <ToolCall
        name="send_email"
        status="error"
        error={{ message: 'SMTP refused' }}
        onRetry={onRetry}
        defaultCollapsed={false}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText(/SMTP refused/)).toBeInTheDocument();
  });

  it('shows a static duration over one minute as m:ss', () => {
    render(<ToolCall name="slow" status="success" duration={130} />);
    expect(screen.getByText('2:10')).toBeInTheDocument();
  });

  it('summarizes a group and expands its items', () => {
    render(
      <ToolCall.Group
        items={[
          { name: 'a', status: 'success' },
          { name: 'b', status: 'success' },
          { name: 'c', status: 'error' },
          { name: 'd', status: 'running' },
        ]}
      />,
    );

    expect(screen.getByText('4 tool calls · 2 success · 1 failed · 1 running')).toBeInTheDocument();
    // group starts expanded
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('d')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Collapse' }));
    expect(screen.queryByText('a')).not.toBeInTheDocument();
  });
});

describe('ToolCall duration formatting', () => {
  it('rounds past the minute boundary without 1:60', () => {
    render(<ToolCall name="x" status="success" duration={119.7} />);
    expect(screen.getByText('2:00')).toBeInTheDocument();
  });
});
