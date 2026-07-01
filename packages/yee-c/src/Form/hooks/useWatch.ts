import { useContext, useLayoutEffect, useState } from 'react';
import FieldContext from '../FieldContext';
import type { FormInstance, NamePath } from '../interface';

function useWatch<T = any>(
  namePath?: NamePath,
  form?: FormInstance,
): T | undefined {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formInstance = form ?? useContext(FieldContext);

  const isWatchAll = namePath === undefined;

  const [value, setValue] = useState<T | undefined>(() =>
    isWatchAll
      ? formInstance.getFieldsValue()
      : formInstance.getFieldValue(
          Array.isArray(namePath) ? namePath.join('.') : (namePath as string),
        ),
  );

  useLayoutEffect(() => {
    const getWatchedValue = () =>
      isWatchAll
        ? formInstance.getFieldsValue()
        : formInstance.getFieldValue(
            Array.isArray(namePath) ? namePath.join('.') : (namePath as string),
          );

    const unsubscribe = formInstance.subscribe(namePath, () => {
      const newValue = getWatchedValue();
      setValue((prev) => (prev === newValue ? prev : newValue));
    });
    return unsubscribe;
  }, [formInstance, namePath]);

  return value;
}

export default useWatch;
