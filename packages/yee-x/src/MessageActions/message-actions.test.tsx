import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import MessageActions from './message-actions';

describe('MessageActions', () => {
  it('renders nothing built-in without handlers', () => {
    const { container } = render(<MessageActions extra={<span>x</span>} />);
    expect(container.querySelector('.yee-message-actions')).toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(screen.getByText('x')).toBeInTheDocument();
  });

  it('copies text and shows the copied state', async () => {
    const onCopy = vi.fn();
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });

    render(<MessageActions text="hello" onCopy={onCopy} />);

    const button = screen.getByRole('button', { name: 'Copy' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello');
      expect(onCopy).toHaveBeenCalledWith('hello', true);
      expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
    });
  });

  it('does not show Copied for an empty text and reports the failure', async () => {
    const onCopy = vi.fn();
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });

    render(<MessageActions text="" onCopy={onCopy} />);

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() => {
      expect(onCopy).toHaveBeenCalledWith('', false);
    });
    expect(screen.queryByRole('button', { name: 'Copied' })).not.toBeInTheDocument();
  });

  it('regenerates', () => {
    const onRegenerate = vi.fn();
    render(<MessageActions onRegenerate={onRegenerate} />);
    fireEvent.click(screen.getByRole('button', { name: 'Regenerate' }));
    expect(onRegenerate).toHaveBeenCalledTimes(1);
  });

  it('switches versions and clamps bounds', () => {
    const onVersionChange = vi.fn();
    render(<MessageActions version={2} total={3} onVersionChange={onVersionChange} />);

    expect(screen.getByText('2/3')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next version' }));
    expect(onVersionChange).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByRole('button', { name: 'Previous version' }));
    expect(onVersionChange).toHaveBeenCalledWith(1);
  });

  it('toggles feedback off when clicking the active button', () => {
    const onFeedbackChange = vi.fn();
    render(<MessageActions onFeedbackChange={onFeedbackChange} />);

    const like = screen.getByRole('button', { name: 'Like' });
    fireEvent.click(like);
    expect(onFeedbackChange).toHaveBeenLastCalledWith('like');

    fireEvent.click(like);
    expect(onFeedbackChange).toHaveBeenLastCalledWith(undefined);
  });

  it('toggles read aloud', () => {
    const onReadAloud = vi.fn();
    render(<MessageActions onReadAloud={onReadAloud} />);

    fireEvent.click(screen.getByRole('button', { name: 'Read aloud' }));
    expect(onReadAloud).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
  });
});
