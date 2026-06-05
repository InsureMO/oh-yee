import clsx from 'clsx';
import React, { useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import useEsc from '../hooks/useEsc';
import useFocusManage from '../hooks/useFocusManage';
import useLockFocus from '../hooks/useLockFocus';
import useMergedState from '../hooks/useMergedState';
import Trigger from '../Trigger';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { PopoverProps } from './interface';
import './style/index.less';

const Popover = (baseprops: PopoverProps) => {
  // eslint-disable-line @typescript-eslint/no-unused-vars
  const { popover } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, popover);
  const {
    prefixCls = 'yee-popover',
    children,
    title,
    content,
    arrow = true,
    placement = 'top',
    trigger = 'hover',
    style,
    className,
    classNames,
    styles,
    popupClassName,
    open,
    defaultOpen,
    onOpenChange,
    ...rest
  } = props;

  const [mergedOpen, setMergedOpen] = useMergedState(false, {
    value: open,
    defaultValue: defaultOpen,
  });

  const popupRef = React.useRef<HTMLDivElement>(null);
  useFocusManage(popupRef.current as HTMLElement, mergedOpen);
  useLockFocus(popupRef.current as HTMLElement, mergedOpen);

  const renderPopup = () => {
    if (!content && !title) {
      return null;
    }

    return (
      <div
        className={clsx(prefixCls, [`${prefixCls}-${placement}`], className)}
        style={style}
        role="dialog"
        ref={popupRef}
      >
        {title && (
          <div
            className={clsx(`${prefixCls}-header`, classNames?.header)}
            style={styles?.header}
          >
            {typeof title === 'function' ? title() : title}
          </div>
        )}
        {content && (
          <div
            className={clsx(`${prefixCls}-content`, classNames?.content)}
            style={styles?.content}
          >
            {typeof content === 'function' ? content() : content}
          </div>
        )}
      </div>
    );
  };

  if (!children) {
    return null;
  }

  const handleOpenChange = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    }
    setMergedOpen(open);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEsc({
    enabled: mergedOpen,
    onEsc: () => handleOpenChange(false),
  });

  const popup = renderPopup();

  return (
    <Trigger
      {...rest}
      arrow={arrow}
      trigger={trigger}
      placement={placement}
      popup={popup}
      open={mergedOpen}
      popupClassName={clsx(`${prefixCls}-popup`, popupClassName)}
      onOpenChange={handleOpenChange}
    >
      {children}
    </Trigger>
  );
};

Popover.displayName = 'Popover';

export default Popover;
