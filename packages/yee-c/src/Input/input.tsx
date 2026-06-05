import clsx from 'clsx';
import { X } from 'lucide-react';
import React, { forwardRef, useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { InputProps } from './interface';

import './style/index.less';

type RenderInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> & {
  className?: string;
  style?: React.CSSProperties;
};

const Input = forwardRef<HTMLInputElement, InputProps>((baseprops, ref) => {
  const { input } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, input);

  const {
    prefixCls = 'yee-input',
    bordered = true,
    value,
    defaultValue,
    prefix,
    suffix,
    classNames,
    styles,
    size = 'default',
    allowClear = true,
    className,
    disabled,
    onChange,
    ...rest
  } = props;

  const [mergedValue, setMergedValue] = useMergedState('', {
    value,
    defaultValue,
  });

  const cls = clsx(
    prefixCls,
    [`${prefixCls}-${size}`],
    {
      [`${prefixCls}-borderless`]: bordered === false,
      [`${prefixCls}-with-clear`]: allowClear && mergedValue,
      [`${prefixCls}-disabled`]: disabled,
    },
    className,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMergedValue(value);
    onChange?.(value, event);
  };

  const onClear = (event: React.MouseEvent<HTMLSpanElement>) => {
    setMergedValue('');
    onChange?.('', event);
  };

  const renderInput = (props: RenderInputProps) => {
    return (
      <input
        autoComplete="off"
        {...props}
        value={mergedValue || ''}
        onChange={handleChange}
        ref={ref}
      />
    );
  };

  const showClear = allowClear && !disabled && !rest.readOnly;

  if (prefix || suffix || showClear) {
    return (
      <span className={cls}>
        {prefix && (
          <span
            className={clsx(`${prefixCls}-prefix`, classNames?.prefix)}
            style={styles?.prefix}
          >
            {prefix}
          </span>
        )}
        {renderInput({
          className: clsx(`${prefixCls}-inner`, classNames?.input),
          style: styles?.input,
          disabled,
          ...rest,
        })}
        {(suffix || showClear) && (
          <span
            className={clsx(`${prefixCls}-suffix`, classNames?.suffix)}
            style={styles?.suffix}
          >
            {showClear && (
              <span
                className={clsx(`${prefixCls}-clear`, classNames?.clear)}
                style={styles?.clear}
                onClick={onClear}
                onKeyDown={(event: React.KeyboardEvent<HTMLSpanElement>) => {
                  if (event.key === 'Enter') {
                    onClear(
                      event as unknown as React.MouseEvent<HTMLSpanElement>,
                    );
                  }
                }}
              >
                <X size={12} strokeWidth={1} />
              </span>
            )}
            {suffix}
          </span>
        )}
      </span>
    );
  }

  return renderInput({ className: cls, disabled, ...rest });
});

export default Input;
