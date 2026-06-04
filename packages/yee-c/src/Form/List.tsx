import React, { useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import FieldContext from './FieldContext';
import { getNamePath } from './utils/path';
import type { FormListProps, InternalNamePath, NamePath } from './interface';


// Helper function: move array element
function move<T>(array: T[], from: number, to: number): T[] {
  if (from === to) return array;
  const result = [...array];
  const [item] = result.splice(from, 1);
  result.splice(to, 0, item);
  return result;
}

// Create ListNameContext for passing list name prefix
export const ListNameContext = React.createContext<InternalNamePath | null>(null);

const List: React.FC<FormListProps> = ({
  name,
  children,
  initialValue = [],
}) => {
  const {
    getFieldValue,
    setFieldsValue,
    validateFields,
  } = useContext(FieldContext);

  // Normalize list name path
  const listNamePath = useMemo(() => getNamePath(name), [name]);

  // Get parent prefixName (from nested List)
  const parentPrefixName = useContext(ListNameContext) || [];

  // Compute full prefixName (parent + current list name)
  const prefixName = useMemo<InternalNamePath>(
    () => [...parentPrefixName, ...listNamePath],
    [parentPrefixName, listNamePath],
  );

  // Key manager for maintaining stable keys for list items
  const keyManager = useRef({ keys: [] as number[], id: 0 }).current;

  // State for triggering re-renders
  const [, forceUpdate] = useState(0);

  // Initialize list value - Fix: use prefixName instead of listNamePath
  useLayoutEffect(() => {
    const pathStr = prefixName.join('.');
    const currentValue = getFieldValue?.(pathStr);
    if (currentValue === undefined) {
      setFieldsValue?.(
        { [pathStr]: initialValue },
        'update' as any,
      );
      forceUpdate(prev => prev + 1);
    }

  }, [prefixName, initialValue, getFieldValue, setFieldsValue]);

  // Get current list value
  const getListValue = (): any[] => {
    const pathStr = prefixName.join('.');
    const value = getFieldValue?.(pathStr);
    return Array.isArray(value) ? value : [];
  };

  // List operation methods
  const operations = useMemo(() => {

    const add = (defaultValue?: any, insertIndex?: number) => {
      const currentValue = getListValue();
      const pathStr = prefixName.join('.');

      // Validate existing fields - build set of fields to validate
      const fieldPaths = [] as string[];
      currentValue.forEach((item: any, index: number) => {
        if (item && typeof item === 'object') {
          Object.keys(item).forEach(key => {
            const fieldPath = `${pathStr}.${index}.${key}`;
            fieldPaths.push(fieldPath);
          });
        }
      });

      // Execute validation
      const errors = validateFields?.(fieldPaths);

      // If errors exist, prevent adding and show errors
      if (errors && errors.length > 0) {
        // Trigger refresh to show errors
        forceUpdate(prev => prev + 1);
        return;
      }

      if (insertIndex !== undefined && insertIndex >= 0 && insertIndex <= currentValue.length) {
        // Insert at specified position
        keyManager.keys = [
          ...keyManager.keys.slice(0, insertIndex),
          keyManager.id,
          ...keyManager.keys.slice(insertIndex),
        ];
        const newList = [
          ...currentValue.slice(0, insertIndex),
          defaultValue !== undefined ? defaultValue : {},
          ...currentValue.slice(insertIndex),
        ];
        setFieldsValue?.({ [pathStr]: newList }, 'update' as any);
      } else {
        // Append to end
        keyManager.keys.push(keyManager.id);
        const newList = [
          ...currentValue,
          defaultValue !== undefined ? defaultValue : {},
        ];
        setFieldsValue?.({ [pathStr]: newList }, 'update' as any);
      }
      keyManager.id += 1;
      forceUpdate(prev => prev + 1);
    };

    const remove = (index: number | number[]) => {
      const indices = Array.isArray(index) ? index : [index];
      const indexSet = new Set(indices);
      const currentValue = getListValue();
      const pathStr = prefixName.join('.');

      if (indexSet.size <= 0) return;

      // Update keys
      keyManager.keys = keyManager.keys.filter((_, i) => !indexSet.has(i));

      // Update list values
      const newList = currentValue.filter((_, i) => !indexSet.has(i));
      setFieldsValue?.({ [pathStr]: newList }, 'update' as any);
      forceUpdate(prev => prev + 1);
    };

    const moveFunc = (from: number, to: number) => {
      if (from === to) return;
      const currentValue = getListValue();
      const pathStr = prefixName.join('.');

      if (from < 0 || from >= currentValue.length || to < 0 || to >= currentValue.length) {
        return;
      }

      // Move keys
      keyManager.keys = move(keyManager.keys, from, to);

      // Move list values
      const newList = move(currentValue, from, to);
      setFieldsValue?.({ [pathStr]: newList }, 'update' as any);
      forceUpdate(prev => prev + 1);
    };

    return { add, remove, move: moveFunc };
  }, [prefixName, getFieldValue, setFieldsValue]);

  // Build field list - removed useMemo, compute directly
  const listValue = getListValue();

  // Ensure enough keys
  while (keyManager.keys.length < listValue.length) {
    keyManager.keys.push(keyManager.id++);
  }

  const fields = listValue.map((_, index) => {
    let key = keyManager.keys[index];
    if (key === undefined) {
      key = keyManager.id++;
      keyManager.keys[index] = key;
    }

    return {
      key,
      name: index,
      isListField: true,
      value: _
    };
  });
  const meta = { errors: [] };

  // Validate children is a function
  if (typeof children !== 'function') {
    console.warn('Form.List only accepts function as children.');
    return null;
  }

  return (
    <ListNameContext.Provider value={prefixName}>
      {children(fields, operations, meta)}
    </ListNameContext.Provider>
  );
};

export default List;
