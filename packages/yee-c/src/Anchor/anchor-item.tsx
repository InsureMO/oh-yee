import clsx from 'clsx';
import React, { useContext } from 'react';
import { AnchorContext } from './anchor';
import type { AnchorItemProps } from './interface';

const INDENT_WIDTH = 16; // Indent width constant

const AnchorItem: React.FC<AnchorItemProps> = (props) => {
  const {
    targetKey,
    title,
    status,
    className,
    style,
    level = 1,
    children,
    ...rest
  } = props;

  const { prefixCls, activeKey, onClick, classNames, styles } =
    useContext(AnchorContext);

  const isActive = targetKey === activeKey;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick?.(targetKey);
  };

  const cls = clsx(
    `${prefixCls}-item`,
    {
      [`${prefixCls}-item-active`]: isActive,
      [`${prefixCls}-item-${status}`]: status,
    },
    className,
    isActive && classNames?.active,
  );

  const itemStyle = {
    ...style,
    ...(isActive ? styles?.active : undefined),
    paddingLeft: `${level * INDENT_WIDTH}px`,
  };

  const node = (
    <li className={cls} style={itemStyle} {...rest}>
      <a href={`#${targetKey}`} onClick={handleClick}>
        <span
          className={clsx(`${prefixCls}-item-label`, classNames?.label)}
          style={styles?.label}
          title={String(title)}
        >
          {title}
        </span>
      </a>
    </li>
  );

  return (
    <>
      {node}
      {children}
    </>
  );
};

export default AnchorItem;
