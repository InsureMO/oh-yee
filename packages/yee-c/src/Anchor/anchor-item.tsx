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

  const { prefixCls, activeKey, onClick } = useContext(AnchorContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick?.(targetKey);
  };

  const cls = clsx(
    `${prefixCls}-item`,
    {
      [`${prefixCls}-item-active`]: targetKey === activeKey,
      [`${prefixCls}-item-${status}`]: status,
    },
    className,
  );

  const itemStyle = {
    ...style,
    paddingLeft: `${level * INDENT_WIDTH}px`,
  };

  const renderItem = (
    <li className={cls} style={itemStyle} {...rest}>
      <a href={`#${targetKey}`} onClick={handleClick}>
        <span className={`${prefixCls}-item-label`} title={String(title)}>
          {title}
        </span>
      </a>
    </li>
  );

  return (
    <>
      {renderItem}
      {children}
    </>
  );
};

export default AnchorItem;
