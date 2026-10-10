// @vitest-environment jsdom
import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { act } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

// act 需要（仓库无全局 vitest setup，逐文件声明）
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
import Field from './Field';
import FieldContext from './FieldContext';
import List from './List';
import { FormStore } from './form-store';

function renderListWithStore() {
  const store = new FormStore().getForm();
  const { getByTestId } = render(
    <FieldContext.Provider value={store}>
      <List name="options">
        {(fields) => (
          <div data-testid="rows">
            {fields.map((field) => (
              <Field key={field.key} name={[field.name, 'label']}>
                <input />
              </Field>
            ))}
          </div>
        )}
      </List>
    </FieldContext.Provider>,
  );
  return { getByTestId, store };
}

afterEach(() => {
  cleanup();
});

// List 只在自身 render 时读 store：外部 form.setFieldsValue 整体替换 List 值时
// 若不订阅自身 path，行数不刷新、新行永不挂载（app 侧 issue #99 首开不显示的根因）
describe('Form.List 外部 setFieldsValue 驱动重渲染', () => {
  it('整体替换 List 值后行数更新', () => {
    const { getByTestId, store } = renderListWithStore();
    expect(getByTestId('rows').children.length).toBe(0);

    act(() => {
      store.setFieldsValue({ options: [{ label: 'a' }, { label: 'b' }, { label: 'c' }] });
    });
    expect(getByTestId('rows').children.length).toBe(3);
  });

  it('缩减 List 值后行数同步减少', () => {
    const { getByTestId, store } = renderListWithStore();
    act(() => {
      store.setFieldsValue({ options: [{ label: 'a' }, { label: 'b' }] });
    });
    expect(getByTestId('rows').children.length).toBe(2);

    act(() => {
      store.setFieldsValue({ options: [{ label: 'a' }] });
    });
    expect(getByTestId('rows').children.length).toBe(1);
  });

  it('resetFields 后行数清零', () => {
    const { getByTestId, store } = renderListWithStore();
    act(() => {
      store.setFieldsValue({ options: [{ label: 'a' }, { label: 'b' }] });
    });
    expect(getByTestId('rows').children.length).toBe(2);

    act(() => {
      store.resetFields();
    });
    expect(getByTestId('rows').children.length).toBe(0);
  });

  it('行内编辑不重渲染 List（长度未变时跳过）', () => {
    let renders = 0;
    const store = new FormStore().getForm();
    render(
      <FieldContext.Provider value={store}>
        <List name="options">
          {() => {
            renders += 1;
            return null;
          }}
        </List>
      </FieldContext.Provider>,
    );
    act(() => {
      store.setFieldsValue({ options: [{ label: 'a' }, { label: 'b' }] });
    });
    const afterInit = renders;

    act(() => {
      store.setFieldsValue({ 'options.0.label': 'z' });
    });
    expect(renders).toBe(afterInit);
  });

  it('订阅按 path 隔离：改无关字段不触发渲染，改本 List path 触发', () => {
    let renders = 0;
    const store = new FormStore().getForm();
    render(
      <FieldContext.Provider value={store}>
        <List name="options">
          {() => {
            renders += 1;
            return null;
          }}
        </List>
      </FieldContext.Provider>,
    );
    const before = renders;

    act(() => {
      store.setFieldsValue({ other: 'x' });
    });
    expect(renders).toBe(before);

    act(() => {
      store.setFieldsValue({ options: [{ label: 'a' }] });
    });
    expect(renders).toBeGreaterThan(before);
  });
});
