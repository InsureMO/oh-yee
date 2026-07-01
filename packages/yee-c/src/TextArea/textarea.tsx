import clsx from 'clsx';
import { X } from 'lucide-react';
import React, { createRef, forwardRef, useContext, useEffect } from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { TextAreaProps } from './interface';
import './style/index.less';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (baseprops, ref) => {
    const { textarea } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, textarea);

    const {
      prefixCls = 'yee-textarea',
      className,
      style,
      classNames,
      styles,
      bordered = true,
      value,
      defaultValue,
      showCount,
      allowClear,
      autoSize,
      disabled,
      onChange,
      ...rest
    } = props;

    const componentRef = (ref as any) || createRef<HTMLTextAreaElement>();

    const [mergedValue, setMergedValue] = useMergedState('', {
      value,
      defaultValue,
    });

    useEffect(() => {
      const ele = componentRef.current;
      if (ele && autoSize) {
        if (typeof autoSize === 'boolean') {
          ele.style.height = '22px';
        } else {
          const { minRows = 1, maxRows } = autoSize;
          const minHeight = minRows * 22;
          const maxHeight = maxRows ? maxRows * 22 : undefined;
          ele.style.height = 'auto';
          ele.style.minHeight = minHeight + 'px';
          ele.style.maxHeight = maxHeight + 'px';
        }
        ele.style.resize = 'none';
      }
    }, []);

    const handleAutoSize = () => {
      const ele = componentRef.current;
      if (autoSize) {
        ele.style.height = 'auto';
        const scrollHeight = ele.scrollHeight;
        if (typeof autoSize === 'boolean') {
          ele.style.height = `${scrollHeight}px`;
        } else {
          const { minRows = 1, maxRows } = autoSize;

          let height = Math.max(minRows * 22, scrollHeight);
          if (maxRows) {
            height = Math.min(height, maxRows * 22);
          }
          ele.style.height = `${height}px`;
        }
      }
      if (ele.clientHeight < ele.scrollHeight) {
        const offset = ele.scrollHeight;
        ele.scrollTo({
          top: offset,
        });
      }
    };

    useEffect(() => {
      handleAutoSize();
    }, [mergedValue]);

    const cls = clsx(
      prefixCls,
      {
        [`${prefixCls}-borderless`]: bordered === false,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-with-clear`]: allowClear && !disabled && mergedValue,
      },
      className,
    );

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setMergedValue(value);
      onChange?.(value, event);
    };

    const onClear = (event: React.MouseEvent<HTMLSpanElement>) => {
      setMergedValue('');
      onChange?.('', event);
    };

    const renderTextArea = (props: TextAreaProps) => {
      return (
        <textarea
          {...rest}
          {...props}
          value={mergedValue || ''}
          onChange={handleChange}
          ref={componentRef}
        ></textarea>
      );
    };

    const showClear = allowClear && !disabled && !rest.readOnly;

    if (showCount || showClear) {
      return (
        <div className={clsx(`${prefixCls}-wrapper`, cls)} style={style}>
          {renderTextArea({
            className: clsx(`${prefixCls}-inner`, classNames?.input),
            style: styles?.input,
            disabled,
          })}
          {showCount ? (
            <span
              className={clsx(`${prefixCls}-count`, classNames?.count)}
              style={styles?.count}
            >
              {mergedValue.length}
            </span>
          ) : null}
          {showClear ? (
            <span
              tabIndex={0}
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
          ) : null}
        </div>
      );
    }

    const TextAreaNode = renderTextArea({ className: cls, disabled, style });

    return TextAreaNode;
  },
);

export default TextArea;
