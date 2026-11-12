import React, { useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import Trigger from '../Trigger';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { TooltipProps } from './interface';

import './style/index.less';

const Tooltip = (baseprops: TooltipProps) => {
  const { tooltip } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, tooltip);
  const {
    prefixCls = 'yee-tooltip',
    title,
    arrow = { className: `${prefixCls}-arrow` },
    children,
    placement = 'top',
    trigger = ['hover', 'focus'],
    mouseEnterDelay = 0.1,
    color,
    popupStyle,
    popupMotion,
    hideOnClick = false,
    ...rest
  } = props;

  // An empty title (undefined / null / blank string) renders no popup at all:
  // pass children through untouched instead of wrapping them in a Trigger
  // that would pop an empty bubble on hover/focus (aligns with antd).
  // Numbers (incl. 0), non-empty strings, elements and functions are valid
  // titles and keep the Trigger wrapper.
  const isEmptyTitle =
    title === undefined ||
    title === null ||
    (typeof title === 'string' && title.trim() === '');

  if (isEmptyTitle) {
    return <>{children}</>;
  }

  const mergedPopupStyle = {
    ...(color ? { ['--yee-tooltip-bg-color']: color } : null),
    ...popupStyle,
  } as React.CSSProperties;

  const popup = (
    <span className={`${prefixCls}-content`} role="tooltip">
      {typeof title === 'function' ? title() : title}
    </span>
  );

  return (
    <Trigger
      {...rest}
      trigger={trigger}
      popupClassName={`${prefixCls}`}
      popup={popup}
      arrow={arrow}
      placement={placement}
      hideOnClick={hideOnClick}
      popupStyle={mergedPopupStyle}
      mouseEnterDelay={mouseEnterDelay}
      // Quick center-zoom like antd's zoom-big-fast for small arrowed popups
      popupMotion={{ motionName: 'yee-zoom-big-fast', ...popupMotion }}
    >
      {children}
    </Trigger>
  );
};

export default Tooltip;
