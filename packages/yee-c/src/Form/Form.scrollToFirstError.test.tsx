// @vitest-environment jsdom
import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

// act 需要（仓库无全局 vitest setup，逐文件声明）
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
// Form.Field 在 index.ts 组装，从包入口导入
import Form from './index';
import { FormStore } from './form-store';

describe('Form scrollToFirstError', () => {
  const scrollSpy = vi.fn();

  beforeAll(() => {
    // jsdom 未实现 scrollIntoView，替换为 spy
    Element.prototype.scrollIntoView =
      scrollSpy as unknown as typeof Element.prototype.scrollIntoView;
  });

  afterEach(() => {
    scrollSpy.mockClear();
    cleanup();
  });

  function renderForm(scrollToFirstError?: boolean | Record<string, unknown>) {
    const formStore = new FormStore();
    // 测试无 LocaleProvider，默认必填文案为空串，手动设置
    formStore.setDefaultValidateMessage('必填');
    const form = formStore.getForm();
    const { container } = render(
      <Form form={form} scrollToFirstError={scrollToFirstError}>
        <Form.Field name="a" label="A" required>
          <input />
        </Form.Field>
        <Form.Field name="b" label="B" required>
          <input />
        </Form.Field>
      </Form>,
    );
    return { container, form };
  }

  const submit = async (container: HTMLElement) => {
    await act(async () => {
      fireEvent.submit(container.querySelector('form')!);
    });
  };

  it('failed submit scrolls to the first error field', async () => {
    const { container } = renderForm(true);
    await submit(container);
    await waitFor(() => expect(scrollSpy).toHaveBeenCalledTimes(1));
    // 滚动目标是字段项 wrapper（label 一并进视口，scroll-margin 生效）
    expect(
      (scrollSpy.mock.contexts[0] as HTMLElement).getAttribute('data-form-item'),
    ).toBe('a');
    expect(scrollSpy).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  });

  it('form.scrollToField scrolls to the requested field', () => {
    const { form } = renderForm();
    form.scrollToField('b');
    expect(scrollSpy).toHaveBeenCalledTimes(1);
    expect(
      (scrollSpy.mock.contexts[0] as HTMLElement).getAttribute('data-form-item'),
    ).toBe('b');
  });

  it('falls back to the control id when the wrapper anchor is missing', () => {
    const { container, form } = renderForm();
    const wrapper = container.querySelector('[data-form-item="b"]');
    wrapper?.removeAttribute('data-form-item');
    form.scrollToField('b');
    expect(scrollSpy).toHaveBeenCalledTimes(1);
    expect((scrollSpy.mock.contexts[0] as HTMLElement).id).toBe('b');
  });

  it('does not scroll on failed submit without scrollToFirstError', async () => {
    const { container } = renderForm(undefined);
    await submit(container);
    // 等异步校验周期结束再断言
    await act(async () => {
      await Promise.resolve();
    });
    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it('does not scroll on successful submit', async () => {
    const { container, form } = renderForm(true);
    act(() => {
      form.setFieldsValue({ a: 'x', b: 'y' }, 'fill');
    });
    await submit(container);
    await act(async () => {
      await Promise.resolve();
    });
    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it('passes scrollIntoView options through to the scroll call', async () => {
    const { container } = renderForm({ block: 'center' });
    await submit(container);
    await waitFor(() => expect(scrollSpy).toHaveBeenCalledTimes(1));
    expect(scrollSpy).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  });

  it('options can override the default smooth behavior', async () => {
    const { container } = renderForm({ behavior: 'instant' });
    await submit(container);
    await waitFor(() => expect(scrollSpy).toHaveBeenCalledTimes(1));
    expect(scrollSpy).toHaveBeenCalledWith({
      behavior: 'instant',
      block: 'nearest',
      inline: 'nearest',
    });
  });

  it('group error with child-name array scrolls to the first rendered child field', async () => {
    const formStore = new FormStore();
    formStore.setDefaultValidateMessage('必填');
    const form = formStore.getForm();
    const { container } = render(
      <Form form={form} scrollToFirstError>
        <Form.Field.Group required label="Group">
          <Form.Field name="ga">
            <input />
          </Form.Field>
          <Form.Field name="gb">
            <input />
          </Form.Field>
        </Form.Field.Group>
      </Form>,
    );
    await submit(container);
    // 组错误 name=['ga','gb']：先试 join('ga.gb') 未命中，回退到第一个子字段
    await waitFor(() => expect(scrollSpy).toHaveBeenCalledTimes(1));
    expect(
      (scrollSpy.mock.contexts[0] as HTMLElement).getAttribute('data-form-item'),
    ).toBe('ga');
  });
});
