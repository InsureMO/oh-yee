import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import InlineDiff from './inline-diff';

const original = 'Submit the claim within 30 days of the incident.';
const modified = 'Submit the claim within 14 days of the incident.';

describe('InlineDiff', () => {
  it('renders the diff with deletions and insertions', () => {
    const { container } = render(<InlineDiff original={original} modified={modified} />);

    expect(container.querySelector('del')).toHaveTextContent('30');
    expect(container.querySelector('ins')).toHaveTextContent('14');
    expect(screen.getByText(/Submit the claim/)).toBeInTheDocument();
  });

  it('shows no toolbar when the texts are identical', () => {
    render(<InlineDiff original={original} modified={original} />);
    expect(screen.queryByRole('button', { name: 'Accept all' })).not.toBeInTheDocument();
  });

  it('accepts a change by clicking it', () => {
    const onDecide = vi.fn();
    const onResolve = vi.fn();
    render(
      <InlineDiff original={original} modified={modified} onDecide={onDecide} onResolve={onResolve} />,
    );

    fireEvent.click(screen.getByTitle('Click to accept, again to reject'));

    expect(onDecide).toHaveBeenCalledWith('0', 'accepted');
    expect(onResolve).toHaveBeenLastCalledWith(modified);
    expect(screen.getByText('14')).toBeInTheDocument();
    expect(screen.queryByText('30')).not.toBeInTheDocument();
  });

  it('cycles a change to rejected and back to pending', () => {
    const onResolve = vi.fn();
    render(<InlineDiff original={original} modified={modified} onResolve={onResolve} />);

    const pending = screen.getByTitle('Click to accept, again to reject');
    fireEvent.click(pending); // accepted
    fireEvent.click(screen.getByTitle('Accepted — click to reset')); // rejected
    expect(onResolve).toHaveBeenLastCalledWith(original); // rejected keeps the original

    fireEvent.click(screen.getByTitle('Rejected — click to reset')); // back to pending
    expect(screen.getByTitle('Click to accept, again to reject')).toBeInTheDocument();
    expect(onResolve).toHaveBeenLastCalledWith(original); // pending keeps the original too
  });

  it('accepts and rejects all from the toolbar', () => {
    render(<InlineDiff original={original} modified={modified} />);

    fireEvent.click(screen.getByRole('button', { name: 'Accept all' }));
    expect(screen.getByText('14')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Reject all' }));
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.queryByText('14')).not.toBeInTheDocument();
  });

  it('supports a long replacement pair (delete and insert merged)', () => {
    const { container } = render(
      <InlineDiff
        original="Late claims are rejected by the desk."
        modified="Late claims may be accepted with justification by the desk."
      />,
    );
    // the shared words around the change stay plain
    expect(container.textContent).toContain('Late claims are');
    expect(container.querySelector('del')).toHaveTextContent('are rejected');
    expect(container.querySelector('ins')).toHaveTextContent('may be accepted');
  });
});

describe('InlineDiff large inputs', () => {
  it('keeps the tail of texts beyond the diff budget as one whole-text change', () => {
    const words = (n: number) => Array.from({ length: n }, (_, i) => `w${i}`).join(' ');
    const original = words(1200);
    const modified = `${words(1100)} tail-changed`;
    const { container } = render(<InlineDiff original={original} modified={modified} />);

    // nothing silently dropped: the pending change holds both full texts
    expect(container.textContent).toContain('w1199');
    expect(container.textContent).toContain('tail-changed');
    expect(container.querySelectorAll('del')).toHaveLength(1);
    expect(container.querySelectorAll('ins')).toHaveLength(1);
  });
});
