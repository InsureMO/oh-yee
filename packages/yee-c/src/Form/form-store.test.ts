import { describe, expect, it, vi } from 'vitest';
import type { ReactElement } from 'react';
import { FormStore } from './form-store';
import type { FieldEntity, Rule } from './interface';

const createEntity = (
  name: string,
  onStoreChange = vi.fn(),
  rules?: Rule[],
): FieldEntity => ({
  props: {
    name,
    rules,
    children: {} as unknown as ReactElement,
  },
  onStoreChange,
});

describe('FormStore.clearFields', () => {
  it('keeps values of unrelated fields on partial clear', () => {
    const store = new FormStore();
    store.setFieldsValue({ a: 1, b: 2 }, 'fill');

    store.clearFields(['a']);

    expect(store.getFieldsValue()).toEqual({ a: undefined, b: 2 });
  });

  it('clears a nested path leaf and keeps its siblings', () => {
    const store = new FormStore();
    store.setFieldsValue({ 'user.name': 'tom', 'user.age': 18 }, 'fill');

    store.clearFields(['user.name']);

    expect(store.getFieldValue('user.name')).toBeUndefined();
    expect(store.getFieldValue('user.age')).toBe(18);
  });

  it('sets every top-level key to undefined when name is omitted', () => {
    const store = new FormStore();
    store.setFieldsValue({ a: 1, 'user.name': 'tom' }, 'fill');

    store.clearFields();

    const values = store.getFieldsValue();
    expect(values.a).toBeUndefined();
    expect(store.getFieldValue('user.name')).toBeUndefined();
    expect(Object.keys(values)).toEqual(['a', 'user']);
  });

  it('clears validation messages only for cleared fields', async () => {
    const store = new FormStore();
    store.registerFieldEntities(
      createEntity('a', vi.fn(), [{ required: true, message: 'a required' }]),
    );
    store.registerFieldEntities(
      createEntity('b', vi.fn(), [{ required: true, message: 'b required' }]),
    );

    const errors = await store.validateFields();
    expect(errors).toHaveLength(2);
    expect(store.getFieldValidate('a')?.message).toBe('a required');

    store.clearFields(['a']);

    expect(store.getFieldValidate('a')).toBeNull();
    expect(store.getFieldValidate('b')?.message).toBe('b required');
  });

  it('clears manual field statuses only for cleared fields', () => {
    const store = new FormStore();
    store.setFieldStatus('a', { status: 'warning', message: 'check a' });
    store.setFieldStatus('b', { status: 'warning', message: 'check b' });

    store.clearFields(['a']);

    expect(store.getFieldStatus('a')).toBeNull();
    expect(store.getFieldStatus('b')?.message).toBe('check b');
  });

  it('refreshes only fields related to the cleared names', () => {
    const store = new FormStore();
    const onChangeA = vi.fn();
    const onChangeB = vi.fn();
    const onChangeNested = vi.fn();
    store.registerFieldEntities(createEntity('a', onChangeA));
    store.registerFieldEntities(createEntity('b', onChangeB));
    store.registerFieldEntities(createEntity('a.x', onChangeNested));
    store.setFieldsValue({ a: 1, b: 2 }, 'fill');
    onChangeA.mockClear();
    onChangeB.mockClear();
    onChangeNested.mockClear();

    store.clearFields(['a']);

    expect(onChangeA).toHaveBeenCalled();
    expect(onChangeNested).toHaveBeenCalled();
    expect(onChangeB).not.toHaveBeenCalled();
  });

  it('notifies only watchers related to the cleared names', () => {
    const store = new FormStore();
    const watchA = vi.fn();
    const watchB = vi.fn();
    const watchAll = vi.fn();
    store.subscribe('a', watchA);
    store.subscribe('b', watchB);
    store.subscribe(undefined, watchAll);

    store.setFieldsValue({ a: 1, b: 2 }, 'fill');
    watchA.mockClear();
    watchB.mockClear();
    watchAll.mockClear();

    store.clearFields(['a']);

    expect(watchA).toHaveBeenCalled();
    expect(watchAll).toHaveBeenCalled();
    expect(watchB).not.toHaveBeenCalled();
  });

  it('fires the onClear callback', () => {
    const store = new FormStore();
    const onClear = vi.fn();
    store.setCallbacks({ onClear });

    store.clearFields(['a']);

    expect(onClear).toHaveBeenCalled();
  });
});

describe('FormStore.initialize initialValues', () => {
  it('resolves nested objects by field path', () => {
    const store = new FormStore();
    store.initialize({ initialValues: { user: { name: 'tom' }, age: 18 } });

    expect(store.getFieldValue('user.name')).toBe('tom');
    expect(store.getFieldValue('age')).toBe(18);

    store.setFieldsValue({ 'user.name': 'jerry' }, 'fill');
    store.resetFields(['user.name']);
    expect(store.getFieldValue('user.name')).toBe('tom');
  });
});

describe('FormStore.setFieldsValue with clear trigger', () => {
  it('merges over the store instead of replacing it', () => {
    const store = new FormStore();
    store.setFieldsValue({ a: 1, b: 2 }, 'fill');

    store.setFieldsValue({ a: undefined }, 'clear');

    expect(store.getFieldsValue()).toEqual({ a: undefined, b: 2 });
  });
});
