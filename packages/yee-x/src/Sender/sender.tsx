import { Button, TextArea, useMergedState } from '@rainbow-oh/yee-c';
import clsx from 'clsx';
import { CircleStop, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SenderProps } from './interface';
import './style/index.less';

const Sender = React.forwardRef<HTMLTextAreaElement, SenderProps>(
  (props, ref) => {
    const {
      prefixCls = 'yee-sender',
      className,
      style,
      classNames,
      styles,
      header,
      footer,
      affix,
      prefix,
      loading,
      disabled,
      value,
      defaultValue,
      sendKey = 'enter',
      actions,
      theme = 'light',
      placeholder,
      autoSize = { minRows: 2, maxRows: 4 },
      onChange,
      onSend,
      onStop,
      onKeyDown,
    } = props;

    const [mergedValue, setMergedValue] = useMergedState('', {
      value,
      defaultValue,
    });

    //   Controls whether sending is allowed
    const [sendable, setSendable] = useState(false);

    useEffect(() => {
      if (mergedValue) {
        setSendable(true);
      } else {
        setSendable(false);
      }
    }, [mergedValue]);

    const affixNode = affix ? (
      <div
        className={clsx(`${prefixCls}-affix`, classNames?.affix)}
        style={styles?.affix}
      >
        {affix}
      </div>
    ) : null;

    const handleClick = (isGenerate?: boolean) => {
      // Currently generating a response, so this click means pause
      if (isGenerate) {
        if (loading) {
          onStop?.();
          return;
        }
      }

      if (disabled || !sendable || loading) {
        return;
      }

      onSend?.(mergedValue);
      setMergedValue('');
    };

    // ------ textarea events start --------------------------

    const handleKeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const next = onKeyDown?.(event);
      if (next === false) return;
      if (sendKey === 'enter') {
        if (event.key === 'Enter') {
          if (event.altKey) {
            setMergedValue((s) => s + '\n');
            onChange?.(mergedValue + '\n');
          } else {
            event.preventDefault();
            handleClick();
          }
        }
      } else if (sendKey === 'altEnter') {
        if (event.altKey && event.key === 'Enter') {
          event.preventDefault();
          handleClick();
        }
      }
    };

    const handleChange = (value: string) => {
      // const { value } = event.target;
      setMergedValue(value);
      onChange?.(value);
    };

    // ------ textarea events end ---------------------------

    return (
      <div
        className={clsx(
          `${prefixCls}`,
          {
            [`${prefixCls}-theme-${theme}`]: theme,
          },
          className,
        )}
        style={style}
      >
        {affixNode}
        {header}
        <div
          className={clsx(`${prefixCls}-content`, classNames?.content)}
          style={styles?.content}
        >
          {prefix && (
            <span
              className={clsx(`${prefixCls}-prefix`, classNames?.prefix)}
              style={styles?.prefix}
            >
              {prefix}
            </span>
          )}
          <TextArea
            ref={ref}
            value={mergedValue}
            className={`${prefixCls}-input`}
            bordered={false}
            placeholder={placeholder}
            autoSize={autoSize}
            onKeyDown={handleKeydown}
            onChange={handleChange}
          />
          <div
            className={clsx(`${prefixCls}-actions`, classNames?.actions)}
            style={styles?.actions}
          >
            {actions}
            <div className={`${prefixCls}-actions-preset`}>
              <Button
                type="primary"
                shape="round"
                disabled={!sendable && !loading}
                icon={
                  loading ? (
                    <CircleStop size={16} strokeWidth={1.5} />
                  ) : (
                    <Send size={16} strokeWidth={1.5} />
                  )
                }
                onClick={() => handleClick(loading)}
              />
            </div>
          </div>
        </div>
        {footer}
      </div>
    );
  },
);

export default Sender;
