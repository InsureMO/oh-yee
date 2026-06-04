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
    ...rest
  } = props;

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
      hideOnClick={false}
      mouseEnterDelay={mouseEnterDelay}
    >
      {children}
    </Trigger>
  );
};

export default Tooltip;
