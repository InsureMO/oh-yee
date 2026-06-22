import clsx from 'clsx';
import React, { FC, useContext } from 'react';
import ReactDOM from 'react-dom';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import { pickDataAttrs } from '../utils/types';
import Indicator from './indicator';
import { SpinProps } from './interface';
import './style/index.less';

const PRESET_COLORS = ['info', 'success', 'warning', 'error'] as const;

const Spin: FC<SpinProps> = (baseprops) => {
  const { spin } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, spin);
  const {
    prefixCls = 'yee-spin',
    className,
    style,
    tip,
    spinning = true,
    fullscreen,
    classNames,
    styles,
    mask,
    children,
    size,
    variant,
    color,
    getContainer,
    ...rest
  } = props;

  const dataAttrs = pickDataAttrs(rest as Record<string, unknown>);

  const node = spinning ? (
    <div
      className={clsx(
        prefixCls,
        {
          [`${prefixCls}-blur`]: children,
          [`${prefixCls}-fullscreen`]: fullscreen,
          [`${prefixCls}-${color}`]: PRESET_COLORS.includes(
            color as (typeof PRESET_COLORS)[number],
          ),
        },
        className,
      )}
      style={style}
      {...(!children ? dataAttrs : undefined)}
    >
      <Indicator
        prefixCls={prefixCls}
        classNames={classNames}
        styles={styles}
        size={size}
        variant={variant}
        color={color}
      />
      {tip && (
        <span
          className={clsx(`${prefixCls}-tip`, classNames?.tip)}
          style={styles?.tip}
        >
          {tip}
        </span>
      )}
    </div>
  ) : null;

  if (fullscreen) {
    const container = getContainer ? getContainer() : document.body;
    return ReactDOM.createPortal(node, container);
  }

  if (children) {
    return (
      <div className={clsx(`${prefixCls}-container`)} {...dataAttrs}>
        {mask && node && <div className={`${prefixCls}-mask-layer`}></div>}
        {node}
        {children}
      </div>
    );
  }

  return node;
};

export default Spin;
