import clsx from 'clsx';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { InputNumberProps } from './interface';

import './style/index.less';

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (baseprops, ref) => {
    const { inputnumber } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, inputnumber);

    const {
      prefixCls = 'yee-input-number',
      bordered = true,
      value,
      defaultValue,
      min = -Infinity,
      max = Infinity,
      step = 1,
      precision,
      prefix,
      suffix,
      classNames,
      styles,
      size = 'default',
      allowClear = false,
      controls = true,
      formatter,
      parser,
      className,
      disabled,
      readOnly,
      placeholder,
      onChange,
      onPressEnter,
      onStep,
      onBlur,
      onFocus,
      ...rest
    } = props;

    const [mergedValue, setMergedValue] = useMergedState<number | null>(null, {
      value,
      defaultValue,
    });

    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Format value
    function formatValue(val: number | null | undefined): string {
      if (val === null || val === undefined || isNaN(val)) return '';

      let formattedVal =
        precision !== undefined ? Number(val).toFixed(precision) : val;

      if (formatter) {
        return formatter(Number(formattedVal));
      }

      return String(formattedVal);
    }

    const [displayValue, setDisplayValue] = useState<string>(() =>
      formatValue(mergedValue),
    );

    // Sync displayValue when mergedValue updates asynchronously (user not editing)
    useEffect(() => {
      if (!focused) {
        setDisplayValue(formatValue(mergedValue));
      }
    }, [mergedValue, focused]);

    // Parse input value
    function parseValue(val: string): number | null {
      if (!val || val.trim() === '') return null;

      let parsedVal: number;

      // Apply custom parsing
      if (parser) {
        const temp = parser(val);
        parsedVal = Number(temp);
      } else {
        // Remove non-numeric characters (keep digits, decimal point, minus sign)
        const cleanVal = val.replace(/[^\d.-]/g, '');
        parsedVal = Number(cleanVal);
      }

      if (isNaN(parsedVal)) return null;

      return parsedVal;
    }

    // Clamp value to range
    function clampValue(val: number | null): number | null {
      if (val === null) return null;

      let clampedVal = val;

      if (clampedVal < min) clampedVal = min;
      if (clampedVal > max) clampedVal = max;

      // Apply precision
      if (precision !== undefined) {
        clampedVal = Number(clampedVal.toFixed(precision));
      }

      return clampedVal;
    }

    // Update value
    function updateValue(newValue: number | null) {
      const clampedValue = clampValue(newValue);
      setMergedValue(clampedValue);
      setDisplayValue(formatValue(clampedValue));
      onChange?.(clampedValue);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setDisplayValue(inputValue);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      const parsedValue = parseValue(displayValue);
      updateValue(parsedValue);
      onBlur?.(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(event);
    };

    const handleStep = (type: 'up' | 'down') => {
      if (disabled || readOnly) return;

      const offset = type === 'up' ? step : -step;
      const currentValue = mergedValue ?? 0;
      const newValue = currentValue + offset;

      updateValue(newValue);
      onStep?.(newValue, { offset, type });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        const parsedValue = parseValue(displayValue);
        updateValue(parsedValue);
        onPressEnter?.(event);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        handleStep('up');
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        handleStep('down');
      }
    };

    const onClear = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();
      updateValue(null);
      inputRef.current?.focus();
    };

    const cls = clsx(
      prefixCls,
      [`${prefixCls}-${size}`],
      {
        [`${prefixCls}-borderless`]: bordered === false,
        [`${prefixCls}-with-clear`]: allowClear && mergedValue !== null,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-focused`]: focused,
        [`${prefixCls}-with-controls`]: controls,
      },
      className,
    );

    const renderInput = () => {
      return (
        <input
          {...rest}
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          type="text"
          className={clsx(`${prefixCls}-inner`, classNames?.input)}
          style={styles?.input}
          value={displayValue}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
      );
    };

    return (
      <span className={cls} style={props.style}>
        {prefix && (
          <span
            className={clsx(`${prefixCls}-prefix`, classNames?.prefix)}
            style={styles?.prefix}
          >
            {prefix}
          </span>
        )}

        {renderInput()}

        {(suffix || allowClear || controls) && (
          <span
            className={clsx(`${prefixCls}-suffix`, classNames?.suffix)}
            style={styles?.suffix}
          >
            {allowClear && mergedValue !== null && (
              <span
                className={clsx(`${prefixCls}-clear`, classNames?.clear)}
                style={styles?.clear}
                onClick={onClear}
              >
                <X size={12} strokeWidth={1} />
              </span>
            )}
            {suffix}
            {controls && (
              <span
                className={clsx(
                  `${prefixCls}-handler-wrap`,
                  classNames?.handler,
                )}
                style={styles?.handler}
              >
                <span
                  className={clsx(
                    `${prefixCls}-handler`,
                    `${prefixCls}-handler-up`,
                    {
                      [`${prefixCls}-handler-disabled`]:
                        disabled ||
                        (mergedValue !== null && mergedValue >= max),
                    },
                  )}
                  onClick={() => handleStep('up')}
                >
                  <ChevronUp size={12} strokeWidth={2} />
                </span>
                <span
                  className={clsx(
                    `${prefixCls}-handler`,
                    `${prefixCls}-handler-down`,
                    {
                      [`${prefixCls}-handler-disabled`]:
                        disabled ||
                        (mergedValue !== null && mergedValue <= min),
                    },
                  )}
                  onClick={() => handleStep('down')}
                >
                  <ChevronDown size={12} strokeWidth={2} />
                </span>
              </span>
            )}
          </span>
        )}
      </span>
    );
  },
);

InputNumber.displayName = 'InputNumber';

export default InputNumber;
