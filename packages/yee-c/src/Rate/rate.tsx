import clsx from 'clsx';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { RateProps } from './interface';
import Star from './star';

import './style/index.less';

const Rate = React.forwardRef<HTMLUListElement, RateProps>((baseprops, ref) => {
  const { rate } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, rate);
  const {
    prefixCls = 'yee-rate',
    children,
    count = 5,
    value,
    defaultValue,
    disabled,
    allowHalf,
    allowClear,
    character,
    style,
    className,
    onChange,
    onHoverChange,
    ...rest
  } = props;

  const [mergedValue, setMergedValue] = useMergedState(0, {
    value,
    defaultValue,
  });

  const [previous, setPrevious] = useState(mergedValue || 0);
  const [open, setOpen] = useState(false);

  const internalRef = useRef<HTMLUListElement>(null);
  const componentRef = (ref as React.Ref<HTMLUListElement>) || internalRef;

  useEffect(() => {
    if (typeof defaultValue !== 'undefined') {
      setMergedValue(defaultValue);
      setPrevious(defaultValue);
    }
  }, [defaultValue, setMergedValue]);

  useEffect(() => {
    const ul = (componentRef as any).current;
    if (ul) {
      const lis = ul.querySelectorAll('li');
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          (event.target as HTMLElement).click();
        }
      };

      lis.forEach((li: HTMLIFrameElement) => {
        li.addEventListener('keydown', handleKeyDown);
      });

      return () => {
        lis.forEach((li: HTMLIFrameElement) => {
          li.removeEventListener('keydown', handleKeyDown);
        });
      };
    }
  }, [componentRef]);

  const onclick = (index: number): void => {
    if (allowClear && index + 1 === previous) {
      setMergedValue(0);
      onChange?.(0);
      setPrevious(0);
    } else {
      setMergedValue(index + 1);
      onChange?.(index + 1);
      setPrevious(index + 1);
    }
  };

  const onHover = (index: number): void => {
    setMergedValue(index + 1);
    setOpen(true);
    onHoverChange?.(index + 1);
  };

  const onLeave = () => {
    setMergedValue(previous);
    setOpen(false);
  };

  return (
    <ul
      {...rest}
      className={clsx(
        prefixCls,
        {
          [`${prefixCls}-disabled`]: disabled,
        },
        className,
      )}
      style={style}
      onMouseLeave={onLeave}
      ref={componentRef}
      role="radiogroup"
      aria-label="Rating"
      aria-disabled={disabled || undefined}
      aria-valuemin={0}
      aria-valuemax={count}
      aria-valuenow={mergedValue}
      aria-valuetext={`${mergedValue} out of ${count} stars`}
    >
      {Array(count)
        .fill(0)
        .map((_: number, index: number) => {
          const cls = clsx(`${prefixCls}-star`, {
            [`${prefixCls}-star-full`]: index < mergedValue,
            [`${prefixCls}-star-half-active`]:
              allowHalf && index + 0.5 === mergedValue,
          });

          return (
            <Star
              prefixCls={prefixCls}
              value={mergedValue}
              className={cls}
              onClick={onclick}
              onHover={onHover}
              index={index}
              visible={mergedValue === index + 1 && open ? true : false}
              active={index < mergedValue}
              allowHalf={allowHalf}
              character={character}
              count={count}
              key={index}
            >
              {children}
            </Star>
          );
        })}
    </ul>
  );
});

Rate.displayName = 'Rate';

export default Rate;
