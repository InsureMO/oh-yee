import clsx from 'clsx';
import React, { useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import { CheckboxGroupCtx } from './checkbox-group';
import type { CheckboxProps } from './interface';

import './style/index.less';

const Checkbox = (baseprops: CheckboxProps) => {
  const { checkbox } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, checkbox);
  const {
    prefixCls = 'yee-checkbox',
    className,
    value,
    checked,
    defaultChecked,
    children,
    style,
    disabled,
    classNames,
    styles,
    indeterminate,
    onChange,
    ...rest
  } = props;

  const { name, onChange: onGroupChange } = useContext(CheckboxGroupCtx);

  const [mergedChecked, setMergedChecked] = useMergedState(false, {
    value: checked,
    defaultValue: defaultChecked,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setMergedChecked(checked);
    onChange?.(event);
    onGroupChange?.(event);
  };

  return (
    <label
      className={clsx(
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-wrapper-disabled`]: disabled,
        },
        className,
      )}
      style={style}
    >
      <span
        className={clsx(`${prefixCls}`, {
          [`${prefixCls}-checked`]: mergedChecked,
          [`${prefixCls}-indeterminate`]: indeterminate,
          [`${prefixCls}-disabled`]: disabled,
        })}
      >
        <input
          {...rest}
          className={`${prefixCls}-input`}
          type="checkbox"
          name={name}
          value={value}
          disabled={disabled}
          checked={mergedChecked}
          onChange={handleChange}
        />
        <span
          className={clsx(`${prefixCls}-inner`, classNames?.inner)}
          style={styles?.inner}
        ></span>
      </span>
      {children ? (
        <span
          className={clsx(`${prefixCls}-label`, classNames?.label)}
          style={styles?.label}
        >
          {children}
        </span>
      ) : null}
    </label>
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
