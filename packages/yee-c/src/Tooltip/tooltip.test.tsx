// @vitest-environment jsdom
import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Field from '../Form/Field';
import FieldContext from '../Form/FieldContext';
import FormContext from '../Form/FormContext';
import { FormStore } from '../Form/form-store';
import Tooltip from './tooltip';

// act 需要（仓库无全局 vitest setup，逐文件声明）
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const getPopup = () => document.querySelector('.yee-tooltip');

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

// Tooltip 默认 trigger 为 ['hover', 'focus']，mouseEnterDelay 0.1s。
// RTL 的 mouseEnter 会同时派发 mouseover/mouseenter，rc-trigger 才能收到。
const hover = (el: Element) => fireEvent.mouseEnter(el);

describe('Tooltip 空 title 不弹气泡', () => {
  it('title 为非空字符串时正常弹出', async () => {
    const { getByText } = render(
      <Tooltip title="hello">
        <button type="button">btn</button>
      </Tooltip>,
    );
    hover(getByText('btn'));

    await waitFor(() => expect(getPopup()).not.toBeNull());
    expect(getPopup()?.textContent).toBe('hello');
    expect(document.querySelector('[role="tooltip"]')).not.toBeNull();
  });

  it('title 缺省（undefined）时不包 Trigger，children 透传渲染', async () => {
    const { container, getByText } = render(
      <Tooltip>
        <button type="button">btn</button>
      </Tooltip>,
    );
    hover(getByText('btn'));
    fireEvent.focus(getByText('btn'));
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });

    expect(getByText('btn')).toBeTruthy();
    expect(getPopup()).toBeNull();
    expect(container.querySelector('.yee-trigger')).toBeNull();
  });

  it('title 为空串时不弹气泡', async () => {
    const { container, getByText } = render(
      <Tooltip title="">
        <button type="button">btn</button>
      </Tooltip>,
    );
    hover(getByText('btn'));
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });

    expect(getByText('btn')).toBeTruthy();
    expect(getPopup()).toBeNull();
    expect(container.querySelector('.yee-trigger')).toBeNull();
  });

  it('title 为纯空白字符串（trim 后为空）时不弹气泡', async () => {
    const { getByText } = render(
      <Tooltip title="   ">
        <button type="button">btn</button>
      </Tooltip>,
    );
    hover(getByText('btn'));
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });

    expect(getPopup()).toBeNull();
  });

  it('title 为 null 时不弹气泡', async () => {
    const { getByText } = render(
      <Tooltip title={null}>
        <button type="button">btn</button>
      </Tooltip>,
    );
    hover(getByText('btn'));
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });

    expect(getPopup()).toBeNull();
  });

  it('title 为数字 0 时正常弹出（合法内容不误伤）', async () => {
    const { getByText } = render(
      <Tooltip title={0}>
        <button type="button">btn</button>
      </Tooltip>,
    );
    hover(getByText('btn'));

    await waitFor(() => expect(getPopup()).not.toBeNull());
    expect(getPopup()?.textContent).toBe('0');
  });

  it('title 为非字符串 ReactNode 时正常弹出', async () => {
    const { getByText } = render(
      <Tooltip title={<span>node-title</span>}>
        <button type="button">btn</button>
      </Tooltip>,
    );
    hover(getByText('btn'));

    await waitFor(() => expect(getPopup()).not.toBeNull());
    expect(getPopup()?.textContent).toBe('node-title');
  });

  it('title 为函数时正常弹出（返回值渲染）', async () => {
    const { getByText } = render(
      <Tooltip title={() => 'fn-title'}>
        <button type="button">btn</button>
      </Tooltip>,
    );
    hover(getByText('btn'));

    await waitFor(() => expect(getPopup()).not.toBeNull());
    expect(getPopup()?.textContent).toBe('fn-title');
  });
});

// Form.Field 是 Tooltip 的消费方之一：label 旁的 HelpCircle 图标由
// tooltipConfig 包 Tooltip 实现。Field 对 undefined/null/false 已提前
// 拦截，但空串会落到 <Tooltip title="">——由 Tooltip 层兜底。
describe('Form.Field tooltip 消费链', () => {
  const renderField = (tooltip: React.ComponentProps<typeof Field>['tooltip']) => {
    const formStore = new FormStore();
    const store = formStore.getForm();
    const { container } = render(
      <FormContext.Provider value={{ prefixCls: 'yee-form' } as const}>
        <FieldContext.Provider value={store}>
          <Field name="memo" label="Memo" tooltip={tooltip}>
            <input />
          </Field>
        </FieldContext.Provider>
      </FormContext.Provider>,
    );
    return container;
  };

  it('tooltip 为空串时不弹空气泡（图标仍渲染，无 Trigger 包裹）', async () => {
    const container = renderField('');
    const icon = container.querySelector('.yee-form-item-tooltip-icon');
    expect(icon).not.toBeNull();

    hover(icon as Element);
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });

    expect(getPopup()).toBeNull();
    expect(container.querySelector('.yee-trigger')).toBeNull();
  });

  it('tooltip 有内容时 hover 图标正常弹出', async () => {
    const container = renderField('tip text');
    const icon = container.querySelector('.yee-form-item-tooltip-icon');
    expect(icon).not.toBeNull();
    hover(icon as Element);

    await waitFor(() => expect(getPopup()).not.toBeNull());
    expect(getPopup()?.textContent).toBe('tip text');
  });
});
