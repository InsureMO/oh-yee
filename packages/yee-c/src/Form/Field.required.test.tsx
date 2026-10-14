// @vitest-environment jsdom
import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { act } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

// act 需要（仓库无全局 vitest setup，逐文件声明）
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
import Field from './Field';
import FieldContext from './FieldContext';
import FormContext from './FormContext';
import Group from './Group';
import { FormStore } from './form-store';

const formContextValue = { prefixCls: 'yee-form' } as const;

function Harness({ required }: { required: boolean }) {
  return (
    <Field name="username" required={required}>
      <input />
    </Field>
  );
}

function GroupHarness({ required }: { required: boolean }) {
  return (
    <Group required={required} label="组">
      <Field name="a">
        <input />
      </Field>
    </Group>
  );
}

function renderField(required: boolean) {
  // 测试无 LocaleProvider，默认必填文案为空串（不渲染错误 DOM），手动设置
  const formStore = new FormStore();
  formStore.setDefaultValidateMessage('该字段必填');
  const store = formStore.getForm();
  const { container, rerender } = render(
    <FormContext.Provider value={formContextValue}>
      <FieldContext.Provider value={store}>
        <Harness required={required} />
      </FieldContext.Provider>
    </FormContext.Provider>,
  );
  const rerenderWith = (nextRequired: boolean) =>
    rerender(
      <FormContext.Provider value={formContextValue}>
        <FieldContext.Provider value={store}>
          <Harness required={nextRequired} />
        </FieldContext.Provider>
      </FormContext.Provider>,
    );
  const errorEl = () => container.querySelector('.yee-form-item-additional-error');
  return { store, rerenderWith, errorEl };
}

afterEach(() => {
  cleanup();
});

// required 触发校验报错后，把 required 改为 false，错误应立即消失：
// 1) store 里注册的 entity 必须读到最新 props（旧实现是首帧快照，重校验仍失败）
// 2) required/rules 变化时需对已报错字段重新校验，否则旧错误无人清除
describe('Field required 运行时切换', () => {
  it('报错后 required 改为 false，错误立即消失', async () => {
    const { store, rerenderWith, errorEl } = renderField(true);

    await act(async () => {
      await store.validateField('username');
    });
    expect(store.getFieldValidate('username')).not.toBeNull();
    expect(errorEl()).not.toBeNull();

    rerenderWith(false);

    expect(store.getFieldValidate('username')).toBeNull();
    // 错误文案经 AnimatePresence 退出动画移除，jsdom 需等动画结束
    await waitFor(() => expect(errorEl()).toBeNull());
  });

  it('required 改为 false 后再次校验通过', async () => {
    const { store, rerenderWith } = renderField(true);

    await act(async () => {
      await store.validateField('username');
    });
    rerenderWith(false);

    await act(async () => {
      await store.validateField('username');
    });
    expect(store.getFieldValidate('username')).toBeNull();
  });

  it('未报错字段在 rules 变化时保持无错（不骚扰未触碰字段）', () => {
    const { store, rerenderWith } = renderField(true);
    rerenderWith(false);
    expect(store.getFieldValidate('username')).toBeNull();
  });

  it('报错后 required 保持 true 且值仍为空，重校验仍报错', async () => {
    const { store, rerenderWith, errorEl } = renderField(true);

    await act(async () => {
      await store.validateField('username');
    });
    rerenderWith(true);

    expect(store.getFieldValidate('username')).not.toBeNull();
    expect(errorEl()).not.toBeNull();
  });
});

describe('Group required 运行时切换', () => {
  it('报错后 required 改为 false，submit 不再报组错误', async () => {
    const store = new FormStore().getForm();
    const { rerender } = render(
      <FormContext.Provider value={formContextValue}>
        <FieldContext.Provider value={store}>
          <GroupHarness required />
        </FieldContext.Provider>
      </FormContext.Provider>,
    );

    let errors: unknown[] = [];
    await act(async () => {
      errors = await store.submit();
    });
    expect(errors.length).toBeGreaterThan(0);

    rerender(
      <FormContext.Provider value={formContextValue}>
        <FieldContext.Provider value={store}>
          <GroupHarness required={false} />
        </FieldContext.Provider>
      </FormContext.Provider>,
    );

    await act(async () => {
      errors = await store.submit();
    });
    expect(errors).toHaveLength(0);
  });
});
