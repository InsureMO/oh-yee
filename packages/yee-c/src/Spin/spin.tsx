import clsx from 'clsx';
import React, { FC, useContext } from 'react';
import ReactDOM from 'react-dom';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import { pickDataAttrs } from '../utils/types';
import Indicator from './indicator';
import { SpinProps } from './interface';
import './style/index.less';

const loadingSize = new Map([
  ['small', { width: '16px', height: '16px' }],
  ['default', { width: '24px', height: '24px' }],
  ['large', { width: '40px', height: '40px' }],
]);

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
          [`${prefixCls}-fullscreen`]: fullscreen
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
        { mask && node && <div className={`${prefixCls}-mask-layer`}></div> }
        {node}
        {children}
      </div>
    )
  }

  return node;
};

export default Spin;
