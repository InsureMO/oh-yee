// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react';
import React, { useState } from 'react';
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

const getInput = (container: HTMLElement) =>
  container.querySelector('input') as HTMLInputElement;

describe('DatePicker typed input and clear', () => {
  it('commits a typed date on Enter', () => {
    const onChange = vi.fn();
    const { container } = render(<DatePicker onChange={onChange} />);
    const input = getInput(container);

    fireEvent.change(input, { target: { value: '2026-01-05' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith('2026-01-05', expect.anything());
    expect(input.value).toBe('2026-01-05');
  });

  it('commits a typed date on blur', () => {
    const onChange = vi.fn();
    const { container } = render(<DatePicker onChange={onChange} />);
    const input = getInput(container);

    fireEvent.change(input, { target: { value: '2026-03-08' } });
    fireEvent.blur(input);

    expect(onChange).toHaveBeenCalledWith('2026-03-08', expect.anything());
  });

  it('clears the value and fires onChange when the input is emptied', () => {
    const onChange = vi.fn();
    const { container } = render(
      <DatePicker defaultValue="2026-10-27" onChange={onChange} />,
    );
    const input = getInput(container);
    expect(input.value).toBe('2026-10-27');

    fireEvent.change(input, { target: { value: '' } });

    expect(onChange).toHaveBeenCalledWith('', undefined);
    expect(input.value).toBe('');
  });

  it('reverts unparseable text to the committed value on blur', () => {
    const onChange = vi.fn();
    const { container } = render(
      <DatePicker defaultValue="2026-10-27" onChange={onChange} />,
    );
    const input = getInput(container);

    fireEvent.change(input, { target: { value: 'garbage' } });
    fireEvent.blur(input);

    expect(onChange).not.toHaveBeenCalled();
    expect(input.value).toBe('2026-10-27');
  });
});

describe('DatePicker open control', () => {
  it('supports controlled open with onOpenChange', () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return <DatePicker open={open} onOpenChange={setOpen} />;
    };
    const { container } = render(<Demo />);

    expect(document.querySelector('.yee-picker-panel')).toBeNull();

    fireEvent.click(container.querySelector('.yee-picker-trigger') as HTMLElement);
    expect(document.querySelector('.yee-picker-panel')).toBeTruthy();

    fireEvent.keyDown(getInput(container), { key: 'Escape' });
    expect(document.querySelector('.yee-trigger-hidden')).toBeTruthy();
  });

  it('fires onOpenChange(false) when Escape closes an uncontrolled panel', () => {
    const onOpenChange = vi.fn();
    const { container } = render(<DatePicker onOpenChange={onOpenChange} />);

    fireEvent.click(container.querySelector('.yee-picker-trigger') as HTMLElement);
    expect(onOpenChange).toHaveBeenCalledWith(true);

    fireEvent.keyDown(getInput(container), { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(document.querySelector('.yee-trigger-hidden')).toBeTruthy();
  });

  it('keeps hover preview from leaking into the input after closing', () => {
    const { container } = render(<DatePicker defaultValue="2026-10-27" />);
    fireEvent.click(container.querySelector('.yee-picker-trigger') as HTMLElement);
    fireEvent.keyDown(getInput(container), { key: 'Escape' });

    const input = getInput(container);
    expect(input.value).toBe('2026-10-27');
  });
});
