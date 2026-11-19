import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import PlanCard from './plan-card';

const steps = [
  { key: 'a', title: 'Fetch documents' },
  { key: 'b', title: 'Parse fields' },
  { key: 'c', title: 'Draft reply' },
];

describe('PlanCard review mode', () => {
  it('renders numbered steps', () => {
    render(<PlanCard steps={steps} onStepsChange={() => {}} />);
    expect(screen.getByText('Fetch documents')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renames a step via inline input', () => {
    const onStepsChange = vi.fn();
    render(<PlanCard steps={steps} onStepsChange={onStepsChange} />);

    fireEvent.click(screen.getByText('Parse fields'));
    const input = screen.getByDisplayValue('Parse fields');
    fireEvent.change(input, { target: { value: 'Parse and validate fields' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onStepsChange).toHaveBeenCalledWith([
      expect.objectContaining({ title: 'Fetch documents' }),
      expect.objectContaining({ title: 'Parse and validate fields' }),
      expect.objectContaining({ title: 'Draft reply' }),
    ]);
    expect(screen.getByText('Parse and validate fields')).toBeInTheDocument();
  });

  it('keeps the old title when renaming to blank', () => {
    const onStepsChange = vi.fn();
    render(<PlanCard steps={steps} onStepsChange={onStepsChange} />);

    fireEvent.click(screen.getByText('Parse fields'));
    const input = screen.getByDisplayValue('Parse fields');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.blur(input);

    expect(onStepsChange).not.toHaveBeenCalled();
    expect(screen.getByText('Parse fields')).toBeInTheDocument();
  });

  it('removes a step', () => {
    const onStepsChange = vi.fn();
    render(<PlanCard steps={steps} onStepsChange={onStepsChange} />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Remove step' })[1]);
    expect(onStepsChange).toHaveBeenCalledWith([
      expect.objectContaining({ title: 'Fetch documents' }),
      expect.objectContaining({ title: 'Draft reply' }),
    ]);
  });

  it('moves a step down', () => {
    const onStepsChange = vi.fn();
    render(<PlanCard steps={steps} onStepsChange={onStepsChange} />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Move down' })[0]);
    expect(onStepsChange).toHaveBeenCalledWith([
      expect.objectContaining({ title: 'Parse fields' }),
      expect.objectContaining({ title: 'Fetch documents' }),
      expect.objectContaining({ title: 'Draft reply' }),
    ]);
  });

  it('adds a step and opens the rename input', () => {
    const onStepsChange = vi.fn();
    render(<PlanCard steps={steps} onStepsChange={onStepsChange} />);

    fireEvent.click(screen.getByRole('button', { name: /Add step/ }));
    expect(onStepsChange).toHaveBeenCalledWith([
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.objectContaining({ title: 'New step' }),
    ]);
    expect(screen.getByDisplayValue('New step')).toBeInTheDocument();
  });

  it('confirms with the current steps', () => {
    const onConfirm = vi.fn();
    render(<PlanCard steps={steps} onStepsChange={() => {}} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByRole('button', { name: 'Run plan' }));
    expect(onConfirm).toHaveBeenCalledWith(steps);
  });
});

describe('PlanCard run mode', () => {
  it('derives statuses from the current cursor and shows static durations', () => {
    render(
      <PlanCard
        mode="run"
        steps={[
          { title: 'done', duration: 1.2 },
          { title: 'current' },
          { title: 'future' },
        ]}
        current={1}
        onStepsChange={() => {}}
      />,
    );

    expect(document.querySelector('.yee-plan-card-step-success')).not.toBeNull();
    expect(document.querySelector('.yee-plan-card-step-running')).not.toBeNull();
    expect(document.querySelector('.yee-plan-card-step-pending')).not.toBeNull();
    expect(screen.getByText('1.2s')).toBeInTheDocument();
  });

  it('honors explicit per-step status and shows retry on error', () => {
    const onStepRetry = vi.fn();
    render(
      <PlanCard
        mode="run"
        steps={[
          { title: 'one', status: 'success' },
          { title: 'two', status: 'error' },
        ]}
        current={0}
        onStepRetry={onStepRetry}
      />,
    );

    const retry = screen.getByRole('button', { name: 'Retry' });
    fireEvent.click(retry);
    expect(onStepRetry).toHaveBeenCalledWith(1);
  });

  it('shows a live timer for the running step when startedAt is given', () => {
    render(
      <PlanCard
        mode="run"
        steps={[{ title: 'only' }]}
        current={0}
        startedAt={Date.now() - 5000}
        onStepsChange={() => {}}
      />,
    );
    expect(screen.getByText('5s')).toBeInTheDocument();
  });

  it('does not render edit affordances in run mode', () => {
    render(<PlanCard mode="run" steps={steps} current={0} onStepsChange={() => {}} />);
    expect(screen.queryByRole('button', { name: 'Remove step' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Add step/ })).not.toBeInTheDocument();
  });
});

describe('PlanCard rename safety', () => {
  it('does not retarget the rename when another step is removed mid-edit', () => {
    const onStepsChange = vi.fn();
    render(<PlanCard steps={steps} onStepsChange={onStepsChange} />);

    // start renaming "Parse fields" (middle step), then remove the first step
    fireEvent.click(screen.getByText('Parse fields'));
    fireEvent.change(screen.getByDisplayValue('Parse fields'), { target: { value: 'X' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove step' })[0]);
    fireEvent.blur(screen.getByDisplayValue('X'));

    const last = onStepsChange.mock.calls.at(-1)![0] as Array<{ title: string }>;
    expect(last.map((s) => s.title)).toEqual(['X', 'Draft reply']);
  });
});
