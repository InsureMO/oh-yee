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
  Element.prototype.scrollTo = Element.prototype.scrollTo || (() => {});
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

describe('DatePicker onPanelChange', () => {
  it('fires with the new view type when the panel view switches', () => {
    const onPanelChange = vi.fn();
    const { container } = render(
      <DatePicker onPanelChange={onPanelChange} />,
    );
    openPanel(container);

    const headerButtons = document.querySelectorAll(
      '.yee-picker-view button',
    );
    fireEvent.click(headerButtons[0]);

    expect(onPanelChange).toHaveBeenCalled();
    const panelArg = onPanelChange.mock.calls[0][1];
    expect(['month', 'year']).toContain(panelArg);
    const switched =
      document.querySelector('.yee-picker-month-panel') ||
      document.querySelector('.yee-picker-year-panel');
    expect(switched).toBeTruthy();
  });
});

describe('DatePicker showTime object', () => {
  it('applies hourStep to the hour column', () => {
    const { container } = render(
      <DatePicker format="YYYY/MM/DDTHH:mm:ss" showTime={{ hourStep: 2 }} />,
    );
    openPanel(container);

    const hourColumn = document.querySelector(
      '.yee-picker-time-panel-column',
    ) as HTMLUListElement;
    expect(hourColumn.querySelectorAll('li').length).toBe(12);
    expect(hourColumn.querySelectorAll('li')[1].textContent).toBe('02');
  });

  it('applies defaultValue when a date is picked without touching time', () => {
    const onChange = vi.fn();
    const { container } = render(
      <DatePicker
        format="YYYY/MM/DDTHH:mm:ss"
        showTime={{ defaultValue: '09:30:00' }}
        onChange={onChange}
      />,
    );
    openPanel(container);

    fireEvent.click(getTodayCell());
    expect(onChange).toHaveBeenCalledWith(
      expect.stringMatching(/T09:30:00$/),
      expect.anything(),
    );
  });

  it('honors timeFormat from the config', () => {
    const { container } = render(
      <DatePicker format="YYYY/MM/DDTHH:mm:ss" showTime={{ timeFormat: 'HH:mm' }} />,
    );
    openPanel(container);

    const columns = document.querySelectorAll('.yee-picker-time-panel-column');
    expect(columns.length).toBe(2);
  });
});

describe('DatePicker size, status and inputReadOnly', () => {
  it('applies size and status classes and forwards size to Input', () => {
    const { container } = render(<DatePicker size="small" status="error" />);
    const trigger = container.querySelector('.yee-picker-trigger') as HTMLElement;
    expect(trigger.className).toContain('yee-picker-trigger-small');
    expect(trigger.className).toContain('yee-picker-trigger-error');

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.closest('.yee-input')?.className).toContain('yee-input-small');
  });

  it('makes the input read-only with inputReadOnly', () => {
    const { container } = render(<DatePicker inputReadOnly />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});

describe('DatePicker disabledTime', () => {
  it('disables the returned hour values', () => {
    const { container } = render(
      <DatePicker
        format="YYYY/MM/DDTHH:mm:ss"
        disabledTime={() => ({ disabledHours: () => [0, 1, 2] })}
      />,
    );
    openPanel(container);

    const hourColumn = document.querySelector(
      '.yee-picker-time-panel-column',
    ) as HTMLUListElement;
    const cells = hourColumn.querySelectorAll('li');
    expect(cells.length).toBe(24);
    expect(cells[0].className).toContain('yee-picker-cell-disabled');
    expect(cells[2].className).toContain('yee-picker-cell-disabled');
    expect(cells[3].className).not.toContain('yee-picker-cell-disabled');
  });

  it('cascades minute disabling on the selected hour and blocks clicks', () => {
    const onChange = vi.fn();
    const { container } = render(
      <DatePicker
        format="YYYY/MM/DDTHH:mm:ss"
        value="2026-01-01T05:00:00"
        disabledTime={() => ({
          disabledMinutes: (hour) => (hour === 5 ? [30] : []),
        })}
        onChange={onChange}
      />,
    );
    openPanel(container);

    const columns = document.querySelectorAll('.yee-picker-time-panel-column');
    const minuteCells = columns[1].querySelectorAll('li');
    expect(minuteCells[30].className).toContain('yee-picker-cell-disabled');
    expect(minuteCells[31].className).not.toContain('yee-picker-cell-disabled');

    fireEvent.click(minuteCells[30]);
    expect(onChange).not.toHaveBeenCalled();
  });
});
