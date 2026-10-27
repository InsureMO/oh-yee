// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
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
