import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import Thinking from './thinking';

describe('Thinking', () => {
  it('renders the default label for the status', () => {
    render(<Thinking status="thinking" />);
    expect(screen.getByText('Thinking…')).toBeInTheDocument();
    expect(document.querySelector('.yee-thinking-thinking')).toBeInTheDocument();
  });

  it('renders steps and content', () => {
    render(
      <Thinking
        status="thinking"
        steps={[
          { key: 'a', title: 'Searching' },
          { title: 'Reading', content: '3 documents' },
        ]}
        content="raw reasoning"
      />,
    );
    expect(screen.getByText('Searching')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
    expect(screen.getByText('3 documents')).toBeInTheDocument();
    expect(screen.getByText('raw reasoning')).toBeInTheDocument();
  });

  it('shows a static duration', () => {
    render(<Thinking status="success" duration={75} />);
    expect(screen.getByText('1:15')).toBeInTheDocument();
  });

  it('collapses and expands the body', async () => {
    render(<Thinking status="thinking" content="details" />);

    const toggle = screen.getByRole('button', { name: 'Collapse' });
    expect(screen.getByText('details')).toBeInTheDocument();

    fireEvent.click(toggle);
    await waitFor(() => {
      expect(screen.queryByText('details')).not.toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: 'Expand' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Expand' }));
    await waitFor(() => {
      expect(screen.getByText('details')).toBeInTheDocument();
    });
  });

  it('respects the controlled collapsed state and reports changes', () => {
    const onCollapseChange = vi.fn();
    render(
      <Thinking status="thinking" collapsed content="hidden" onCollapseChange={onCollapseChange} />,
    );

    expect(screen.queryByText('hidden')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Expand' }));
    expect(onCollapseChange).toHaveBeenCalledWith(false);
    // controlled: stays collapsed
    expect(screen.queryByText('hidden')).not.toBeInTheDocument();
  });

  it('marks the error state', () => {
    render(<Thinking status="error" />);
    expect(screen.getByText('Thinking failed')).toBeInTheDocument();
    expect(document.querySelector('.yee-thinking-error')).toBeInTheDocument();
  });
});
