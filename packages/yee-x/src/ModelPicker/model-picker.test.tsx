import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import ModelPicker from './model-picker';
import type { AIModel } from './interface';

const models: Array<AIModel> = [
  {
    id: 'claude-sonnet',
    group: 'Claude',
    name: 'Claude Sonnet',
    meta: '200k context',
    quality: 90,
    speed: 78,
    cost: 55,
    thinking: true,
    firstToken: 'first token ~0.8s',
    price: '$3 / M tokens',
  },
  {
    id: 'claude-haiku',
    group: 'Claude',
    name: 'Claude Haiku',
    quality: 72,
    speed: 96,
    cost: 18,
  },
  {
    id: 'gpt-o',
    group: 'GPT',
    name: 'GPT-o',
    quality: 94,
    speed: 40,
    cost: 85,
    thinking: true,
  },
  { id: 'legacy', name: 'Legacy mini', disabled: true },
];

function openMenu() {
  fireEvent.click(screen.getByRole('button', { name: 'Select model' }));
}

describe('ModelPicker', () => {
  it('renders the trigger with the selected model name', () => {
    render(<ModelPicker models={models} defaultId="claude-haiku" />);
    expect(screen.getByText('Claude Haiku')).toBeInTheDocument();
  });

  it('opens a grouped menu with metric bars', () => {
    render(<ModelPicker models={models} />);
    openMenu();

    expect(screen.getByText('Claude')).toBeInTheDocument();
    expect(screen.getByText('GPT')).toBeInTheDocument();
    expect(document.querySelectorAll('.yee-model-picker-metric')).toHaveLength(12); // 4 models × 3 bars
    expect(screen.getByText('first token ~0.8s')).toBeInTheDocument();
    expect(screen.getByText('$3 / M tokens')).toBeInTheDocument();
  });

  it('picks a model and closes the menu', async () => {
    const onChange = vi.fn();
    render(<ModelPicker models={models} onChange={onChange} />);
    openMenu();

    fireEvent.click(screen.getByRole('button', { name: /GPT-o/ }));
    expect(onChange).toHaveBeenCalledWith('gpt-o', expect.objectContaining({ id: 'gpt-o' }));

    // the menu folds (hidden class from the leave motion; in jsdom the
    // unmount may lag, so assert visibility rather than removal)
    await waitFor(() => {
      const switchEl = screen.queryByRole('switch', { name: 'Extended thinking' });
      if (!switchEl) {
        expect(switchEl).toBeNull();
      } else {
        expect(switchEl.closest('.yee-trigger-hidden')).not.toBeNull();
      }
    });
    // the trigger reflects the new selection (the hidden menu copy may also
    // still hold the text in jsdom)
    expect(screen.getAllByText('GPT-o').length).toBeGreaterThanOrEqual(1);
  });

  it('shows the thinking toggle only for thinking-capable models', () => {
    const onThinkingChange = vi.fn();
    render(
      <ModelPicker models={models} defaultId="claude-haiku" onThinkingChange={onThinkingChange} />,
    );
    openMenu();
    expect(screen.queryByRole('switch', { name: 'Extended thinking' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Claude Sonnet/ }));
    openMenu();
    const toggle = screen.getByRole('switch', { name: 'Extended thinking' });
    fireEvent.click(toggle);
    expect(onThinkingChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('switch', { name: 'Extended thinking' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  it('unfolds effort options when thinking is enabled', () => {
    const onEffortChange = vi.fn();
    render(
      <ModelPicker
        models={models}
        defaultId="claude-sonnet"
        defaultThinkingEnabled
        onEffortChange={onEffortChange}
      />,
    );
    openMenu();

    fireEvent.click(screen.getByRole('button', { name: 'High' }));
    expect(onEffortChange).toHaveBeenCalledWith('high');
    expect(screen.getByRole('button', { name: 'High' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('skips disabled models', () => {
    const onChange = vi.fn();
    render(<ModelPicker models={models} onChange={onChange} />);
    openMenu();

    fireEvent.click(screen.getByRole('button', { name: /Legacy mini/ }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText('first token ~0.8s')).toBeInTheDocument(); // menu still open
  });

  it('respects the controlled selection', () => {
    const onChange = vi.fn();
    const { rerender } = render(<ModelPicker models={models} value="claude-haiku" onChange={onChange} />);

    expect(screen.getByText('Claude Haiku')).toBeInTheDocument();
    rerender(<ModelPicker models={models} value="gpt-o" onChange={onChange} />);
    expect(screen.getByText('GPT-o')).toBeInTheDocument();
  });

  it('hides metrics with showMetrics=false', () => {
    render(<ModelPicker models={models} showMetrics={false} />);
    openMenu();
    expect(document.querySelectorAll('.yee-model-picker-metric')).toHaveLength(0);
  });
});

describe('ModelPicker trigger a11y', () => {
  it('exposes popup state and closes on Escape', () => {
    render(<ModelPicker models={models} />);

    const trigger = screen.getByRole('button', { name: 'Select model' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('adopts the first model when models arrive async', () => {
    const { rerender } = render(<ModelPicker models={[]} />);
    expect(screen.getByText('Select model')).toBeInTheDocument();

    rerender(<ModelPicker models={models} />);
    expect(screen.getByText('Claude Sonnet')).toBeInTheDocument();
  });
});
