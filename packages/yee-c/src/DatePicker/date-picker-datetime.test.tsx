// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import DatePicker from './date-picker';

beforeEach(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
  }
  // jsdom has no Element.scrollTo; TimeColumn scrolls the selected cell into view
  Element.prototype.scrollTo =
    Element.prototype.scrollTo ||
    (() => {});
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
  fireEvent.click(container.querySelector('.yee-picker-trigger') as HTMLElement);
};

const getTodayCell = () =>
  document.querySelector(
    `td[title="${dayjs().format('YYYY-MM-DD')}"]`,
  ) as HTMLElement;

const getConfirmButton = () => {
  const buttons = document.querySelectorAll('.yee-picker-footer button');
  return buttons[buttons.length - 1] as HTMLButtonElement;
};

describe('DatePicker datetime picking', () => {
  it('opens the datetime panel automatically when format contains hours', () => {
    const { container } = render(
      <DatePicker format="YYYY-MM-DDTHH:mm:ss" />,
    );
    openPanel(container);

    expect(document.querySelector('.yee-picker-datetime-panel')).toBeTruthy();
    expect(document.querySelector('.yee-picker-time-panel')).toBeTruthy();
  });

  it('keeps the panel open on date click and commits on confirm', () => {
    const onChange = vi.fn();
    const { container } = render(
      <DatePicker format="YYYY-MM-DDTHH:mm:ss" onChange={onChange} />,
    );
    openPanel(container);

    fireEvent.click(getTodayCell());
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toMatch(
      new RegExp(`^${dayjs().format('YYYY-MM-DD')}T\\d{2}:\\d{2}:\\d{2}$`),
    );
    // Date click alone must not close the datetime panel
    expect(
      document.querySelector('.yee-trigger-hidden'),
    ).toBeNull();
    expect(document.querySelector('.yee-picker-datetime-panel')).toBeTruthy();

    fireEvent.click(getConfirmButton());
    expect(onChange).toHaveBeenCalledTimes(2);
    // saveFormat defaults to format when time picking is on
    expect(onChange.mock.calls[1][0]).toMatch(/T\d{2}:\d{2}:\d{2}$/);
    const popup = document.querySelector(
      '.yee-picker-panel',
    ) as HTMLElement | null;
    expect(
      popup?.closest('.yee-trigger-hidden') ?? document.querySelector('.yee-trigger-hidden'),
    ).toBeTruthy();
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toMatch(/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);
  });

  it('stays date-only with showTime={false} and closes on date click', () => {
    const onChange = vi.fn();
    const { container } = render(
      <DatePicker
        format="YYYY-MM-DDTHH:mm:ss"
        showTime={false}
        onChange={onChange}
      />,
    );
    openPanel(container);

    expect(document.querySelector('.yee-picker-time-panel')).toBeNull();

    fireEvent.click(getTodayCell());
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).not.toMatch(/T\d{2}:/);
    expect(document.querySelector('.yee-trigger-hidden')).toBeTruthy();
  });
});
