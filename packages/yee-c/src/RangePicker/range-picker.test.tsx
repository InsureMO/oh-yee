// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import dayjs from 'dayjs';
import RangePicker from './range-picker';

beforeEach(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
  }
  if (typeof window.matchMedia === 'undefined') {
    window.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  }
});

afterEach(() => {
  cleanup();
});

const openPanel = (container: HTMLElement) => {
  fireEvent.click(
    container.querySelector('.yee-range-picker-trigger') as HTMLElement,
  );
};

describe('RangePicker datetime format', () => {
  it('renders time columns for uppercase HH datetime formats', () => {
    const { container } = render(<RangePicker format="YYYY-MM-DD HH:mm:ss" />);
    openPanel(container);

    expect(document.querySelector('.yee-picker-datetime-panel')).toBeTruthy();
    expect(document.querySelector('.yee-picker-time-panel')).toBeTruthy();
  });

  it('renders date-only panels without time columns for date formats', () => {
    const { container } = render(<RangePicker format="YYYY-MM-DD" />);
    openPanel(container);

    expect(document.querySelector('.yee-picker-time-panel')).toBeNull();
  });

  it('advances to the end input after selecting the start date', () => {
    const { container } = render(<RangePicker format="YYYY-MM-DD HH:mm:ss" />);
    openPanel(container);

    // Real usage focuses the start input first, which sets picking to 'start'
    const inputs = container.querySelectorAll(
      '.yee-range-picker-trigger input',
    );
    fireEvent.focus(inputs[0]);

    const todayCell = document.querySelector(
      `td[title="${dayjs().format('YYYY-MM-DD')}"]`,
    ) as HTMLElement;
    fireEvent.click(todayCell);

    expect(document.activeElement).toBe(inputs[1]);
  });
});

describe('RangePicker panel months', () => {
  it('shows the end panel on the month after the start panel when the range is within one month', () => {
    const { container } = render(
      <RangePicker format="YYYY-MM-DD" defaultValue={['2026/03/01', '2026/03/31']} />,
    );
    openPanel(container);

    const panels = document.querySelectorAll(
      '.yee-picker-panels > .yee-picker-panel',
    );
    expect(panels.length).toBe(2);

    const views = document.querySelectorAll(
      '.yee-picker-header .yee-picker-view',
    );
    expect(views.length).toBe(2);
    expect(views[0].textContent).not.toBe(views[1].textContent);

    // Left panel shows March, right panel shows April (mid-month cells only
    // exist in their own month's grid)
    expect(panels[0].querySelector('td[title="2026-03-15"]')).toBeTruthy();
    expect(panels[1].querySelector('td[title="2026-04-15"]')).toBeTruthy();
  });
});

describe('RangePicker inverted selection', () => {
  const pickInverted = (container: HTMLElement) => {
    const inputs = container.querySelectorAll(
      '.yee-range-picker-trigger input',
    );
    fireEvent.focus(inputs[0]);
    fireEvent.click(
      document.querySelector(
        `td[title="${dayjs().date(20).format('YYYY-MM-DD')}"]`,
      ) as HTMLElement,
    );
    fireEvent.click(
      document.querySelector(
        `td[title="${dayjs().date(5).format('YYYY-MM-DD')}"]`,
      ) as HTMLElement,
    );
    return inputs;
  };

  it('keeps the inverted pair while picking and sorts it on confirm', () => {
    const onChange = vi.fn();
    const { container } = render(
      <RangePicker format="YYYY-MM-DD" onChange={onChange} />,
    );
    openPanel(container);

    const inputs = pickInverted(container);

    // Inverted pair is kept while picking
    expect((inputs[0] as HTMLInputElement).value).toBe(
      dayjs().date(20).format('YYYY-MM-DD'),
    );
    expect((inputs[1] as HTMLInputElement).value).toBe(
      dayjs().date(5).format('YYYY-MM-DD'),
    );

    fireEvent.click(
      document.querySelector(
        '.yee-range-picker-panel-now-btn',
      ) as HTMLElement,
    );

    // Swapped on confirm
    expect((inputs[0] as HTMLInputElement).value).toBe(
      dayjs().date(5).format('YYYY-MM-DD'),
    );
    expect((inputs[1] as HTMLInputElement).value).toBe(
      dayjs().date(20).format('YYYY-MM-DD'),
    );
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual([
      dayjs().date(5).format('YYYY/MM/DD'),
      dayjs().date(20).format('YYYY/MM/DD'),
    ]);
  });

  it('sorts the inputs when the panel closes without confirm', () => {
    const onChange = vi.fn();
    const { container } = render(
      <RangePicker format="YYYY-MM-DD" onChange={onChange} />,
    );
    openPanel(container);

    const inputs = pickInverted(container);

    // Close via outside click (Trigger listens for window mousedown)
    fireEvent.mouseDown(document.body);

    expect((inputs[0] as HTMLInputElement).value).toBe(
      dayjs().date(5).format('YYYY-MM-DD'),
    );
    expect((inputs[1] as HTMLInputElement).value).toBe(
      dayjs().date(20).format('YYYY-MM-DD'),
    );
    expect(onChange).not.toHaveBeenCalled();
  });
});
