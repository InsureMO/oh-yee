import clsx from 'clsx';
import { motion } from 'motion/react';
import React, { useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import Spin from '../Spin';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';

import type { SwitchProps } from './interface';
import './style/index.less';

const Switch = (baseprops: SwitchProps) => {
  const { switch: sw } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, sw);
  const {
    prefixCls = 'yee-switch',
    className,
    style,
    classNames,
    styles,
    checked,
    defaultChecked,
    disabled,
    checkedChildren,
    unCheckedChildren,
    loading,
    size,
    onChange,
    ...rest
  } = props;

  const [mergedChecked, setMergedChecked] = useMergedState(false, {
    value: checked,
    defaultValue: defaultChecked,
  });

  const cls = clsx(
    prefixCls,
    [`${prefixCls}-${mergedChecked ? 'checked' : 'unchecked'}`],
    {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-disabled`]: disabled,
    },
    className,
  );

  const onClick = () => {
    if (!disabled) {
      setMergedChecked((state) => !state);
      onChange?.(!mergedChecked);
    }
  };

  return (
    <button
      {...rest}
      type="button"
      role="switch"
      aria-checked={mergedChecked}
      className={cls}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
    >
      <motion.span
        className={clsx(`${prefixCls}-handle`, classNames?.handle)}
        style={styles?.handle}
        transition={{
          type: 'spring',
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      >
        {/* {loading ? (
          
        ) : ( */}
        <span className={clsx(`${prefixCls}-handle-inner`)}>
          {loading ? (
            <Spin
              size="small"
              className={`${prefixCls}-spin`}
              color={checked ? '#fff' : undefined}
            />
          ) : null}
        </span>
        {/* )} */}
      </motion.span>
      <span
        className={clsx(`${prefixCls}-inner`, classNames?.inner)}
        style={styles?.inner}
      >
        {mergedChecked ? (
          <span
            className={clsx(`${prefixCls}-inner-checked`, classNames?.checked)}
            style={styles?.checked}
          >
            {checkedChildren}
          </span>
        ) : (
          <span
            className={clsx(
              `${prefixCls}-inner-unchecked`,
              classNames?.unchecked,
            )}
            style={styles?.unchecked}
          >
            {unCheckedChildren}
          </span>
        )}
      </span>
    </button>
  );
};

export default Switch;
