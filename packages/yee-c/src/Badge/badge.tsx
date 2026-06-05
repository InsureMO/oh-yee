import clsx from 'clsx';
import React, { useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import Ribbon from './Ribbon';
import type { BadgeProps } from './interface';

import './style/index.less';

const InternalBadge: React.FC<BadgeProps> = (baseprops) => {
  const { badge } = useContext(GlobalContext);
  const props = mergeContextToProps<BadgeProps>(baseprops, badge);
  const {
    prefixCls = 'yee-badge',
    children,
    count,
    showZero = false,
    dot = false,
    size = 'default',
    status,
    offset,
    style,
    color,
    overflowCount = 99,
    text,
    active = false,
    className,
    styles,
    classNames,
    ...rest
  } = props;

  let supNode: React.ReactNode;
  let supTitle = '';

  const cls = clsx(`${prefixCls}-content`, {
    [`${prefixCls}-status-${status}`]: status,
    [`${prefixCls}-active`]: active,
  });

  // Handle count display logic
  const renderCountNode = () => {
    if (count === null || count === undefined) return null;

    if (typeof count === 'number') {
      supTitle = String(count);

      // When count is 0 and showZero is false, return null
      if (count === 0 && !showZero) return null;

      return (
        <span
          className={clsx(
            cls,
            `${prefixCls}-count`,
            {
              [`${prefixCls}-multi`]: count > 9,
              [`${prefixCls}-sup-${size}`]: size,
            },
            classNames?.badge,
          )}
          style={{ backgroundColor: color, ...styles?.badge }}
        >
          {count > overflowCount ? `${overflowCount}+` : count}
        </span>
      );
    }

    // count is React.ReactNode (custom content)
    return (
      <span
        className={clsx(`${prefixCls}-custom-content`, classNames?.badge)}
        style={styles?.badge}
      >
        {count}
      </span>
    );
  };

  // Handle status dot or red dot
  const renderStatusNode = () => {
    if (dot || status) {
      return (
        <span
          className={clsx(cls, `${prefixCls}-dot`, classNames?.dot)}
          style={{ backgroundColor: color, ...styles?.dot }}
        />
      );
    }
    return null;
  };

  // Determine the content to display
  supNode = renderCountNode() || renderStatusNode();

  const renderBadge = () => {
    if (!supNode) return null;

    if (children) {
      const supStyle = offset
        ? { marginTop: offset[1], right: -offset[0] }
        : {};

      return (
        <sup
          className={clsx(
            `${prefixCls}-sup`,
            {
              [`${prefixCls}-sup-${size}`]: size,
            },
            classNames?.sup,
          )}
          title={supTitle}
          style={{ ...supStyle, ...styles?.sup }}
        >
          {supNode}
        </sup>
      );
    }
    return supNode;
  };

  return (
    <span {...rest} className={clsx(prefixCls, className)} style={style}>
      {children}
      {renderBadge()}
      {text && (
        <span
          className={clsx(`${prefixCls}-status-text`, classNames?.text)}
          style={styles?.text}
        >
          {text}
        </span>
      )}
    </span>
  );
};

export type InternalBadgeType = typeof InternalBadge & {
  Ribbon: typeof Ribbon;
};

const Badge = InternalBadge as InternalBadgeType;

Badge.Ribbon = Ribbon;
Badge.displayName = 'Badge';

export default Badge;
