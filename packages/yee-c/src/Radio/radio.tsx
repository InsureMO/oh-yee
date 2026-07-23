import clsx from 'clsx';
import React, { useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { RadioProps } from './interface';
import { GroupCtx } from './radio-group';

import './style/index.less';

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (baseprops, ref) => {
    const { radio } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, radio);
    const {
      prefixCls = 'yee-radio',
      className,
      classNames,
      style,
      styles,
      label,
      children,
      value,
      checked,
      defaultChecked,
      disabled,
      toggleable,
      onChange,
      ...rest
    } = props;

    const { name, buttonStyle, onChange: onGroupChange } = useContext(GroupCtx);
    const [mergedChecked, setMergedChecked] = useMergedState(false, {
      value: checked,
      defaultValue: defaultChecked,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setMergedChecked(true);
      onChange?.(event);
      onGroupChange?.(event);
    };

    const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
      if (toggleable && !disabled) {
        const nextChecked = !mergedChecked;
        setMergedChecked(nextChecked);
        if (!nextChecked) {
          event.preventDefault();
          (event.target as any).value = '';
          onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>);
          onGroupChange?.(
            event as unknown as React.ChangeEvent<HTMLInputElement>,
          );
        }
      }
    };

    const cls = clsx(
      {
        [`${prefixCls}-wrapper`]: !buttonStyle,
        [`${prefixCls}-button-wrapper`]: buttonStyle,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-checked`]: mergedChecked,
      },
      className,
    );

    return (
      <label
        className={cls}
        style={style}
        onClick={handleClick}
        aria-disabled={disabled || undefined}
      >
        <span
          className={clsx(prefixCls, {
            [`${prefixCls}-disabled`]: disabled,
          })}
        >
          <input
            {...rest}
            ref={ref}
            className={`${prefixCls}-input`}
            type="radio"
            name={name}
            value={value}
            checked={mergedChecked}
            disabled={disabled}
            onChange={handleChange}
          />
          {!buttonStyle && (
            <span
              className={clsx(`${prefixCls}-inner`, classNames?.inner)}
              style={styles?.inner}
              aria-hidden="true"
            ></span>
          )}
        </span>
        <span
          className={clsx(`${prefixCls}-label`, classNames?.label)}
          style={styles?.label}
        >
          {children || label}
        </span>
      </label>
    );
  },
);

Radio.displayName = 'Radio';

export default Radio;
