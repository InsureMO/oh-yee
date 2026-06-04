import React, { ChangeEvent, createContext, useContext, useId } from 'react';
import clsx from 'clsx';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import Checkbox from './checkbox';
import type { CheckboxGroupProps } from './interface';

export const CheckboxGroupCtx = createContext<{
  name: string;
  buttonStyle?: 'solid' | 'outline' | 'cornermark';
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}>({
  name: '',
  onChange: () => { },
});

const CheckboxGroup = (baseprops: CheckboxGroupProps) => {
  const { checkboxgroup } = useContext(GlobalContext);
  const props = mergeContextToProps<CheckboxGroupProps>(
    baseprops,
    checkboxgroup,
  );

  const uid = useId();

  const {
    prefixCls = 'yee-checkbox-group',
    className,
    style,
    name = uid,
    value,
    defaultValue,
    options,
    buttonStyle,
    disabled,
    onChange,
  } = props;

  const [mergedValue, setMergedValue] = useMergedState([], {
    value,
    defaultValue,
  });

  const cls = clsx(
    prefixCls,
    {
      [`${prefixCls}-${buttonStyle}`]: buttonStyle,
      [`${prefixCls}-disabled`]: disabled,
    },
    className,
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newValue = mergedValue.includes(value)
      ? mergedValue.filter((i) => i !== value)
      : [...mergedValue, value];
    setMergedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={cls} style={style}>
      <CheckboxGroupCtx.Provider
        value={{ name, buttonStyle, onChange: handleChange }}
      >
        {options?.map((option, index) => (
          <Checkbox
            disabled={disabled}
            {...option}
            checked={mergedValue.includes(option.value)}
            key={option.value || index}
          />
        ))}
      </CheckboxGroupCtx.Provider>
    </div>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

export default CheckboxGroup;
