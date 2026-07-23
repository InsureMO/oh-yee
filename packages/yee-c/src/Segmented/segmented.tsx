import clsx from 'clsx';
import { motion } from 'motion/react';
import React, { useContext, useId, useMemo } from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import type {
  SegmentedLabeledOption,
  SegmentedOption,
  SegmentedProps,
  SegmentedValue,
} from './interface';

import './style/index.less';

const normalizeOption = (option: SegmentedOption): SegmentedLabeledOption => {
  if (typeof option === 'string' || typeof option === 'number') {
    return { label: String(option), value: option };
  }
  return option;
};

const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>(
  (baseprops, ref) => {
    const { segmented } = useContext(GlobalContext);
    const props = mergeContextToProps<SegmentedProps>(baseprops, segmented);

    const uid = useId();

    const {
      prefixCls = 'yee-segmented',
      className,
      style,
      classNames,
      styles,
      options = [],
      value,
      defaultValue,
      disabled,
      size,
      variant = 'default',
      block,
      name = uid,
      onChange,
      ...rest
    } = props;

    const items = useMemo(() => options.map(normalizeOption), [options]);

    const firstValue = items[0]?.value;

    const [mergedValue, setMergedValue] = useMergedState<
      SegmentedValue | undefined
    >(firstValue, {
      value,
      defaultValue,
    });

    const cls = clsx(
      prefixCls,
      {
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-${variant}`]: variant && variant !== 'default',
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-disabled`]: disabled,
      },
      className,
    );

    const handleChange = (itemValue: SegmentedValue) => {
      setMergedValue(itemValue);
      onChange?.(itemValue);
    };

    return (
      <div {...rest} ref={ref} className={cls} style={style} role="radiogroup">
        {items.map((item) => {
          const selected = item.value === mergedValue;
          const itemDisabled = disabled || item.disabled;
          return (
            <label
              key={item.value}
              className={clsx(`${prefixCls}-item`, item.className, {
                [`${prefixCls}-item-selected`]: selected,
                [`${prefixCls}-item-disabled`]: itemDisabled,
              })}
            >
              {selected ? (
                <motion.span
                  layoutId={`${prefixCls}-thumb-${uid}`}
                  className={clsx(`${prefixCls}-thumb`, classNames?.thumb)}
                  style={styles?.thumb}
                  transition={{
                    type: 'spring',
                    visualDuration: 0.3,
                    bounce: 0.2,
                  }}
                />
              ) : null}
              <span className={`${prefixCls}-item-inner`}>
                {item.icon ? (
                  <span className={`${prefixCls}-item-icon`}>{item.icon}</span>
                ) : null}
                {item.label !== undefined && item.label !== null ? (
                  <span className={`${prefixCls}-item-label`}>
                    {item.label}
                  </span>
                ) : null}
              </span>
              <input
                type="radio"
                className={`${prefixCls}-input`}
                name={name}
                value={item.value}
                checked={selected}
                disabled={itemDisabled}
                onChange={() => handleChange(item.value)}
              />
            </label>
          );
        })}
      </div>
    );
  },
);

Segmented.displayName = 'Segmented';

export default Segmented;
