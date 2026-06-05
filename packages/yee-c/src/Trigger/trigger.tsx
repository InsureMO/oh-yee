import RcTrigger, { AlignType } from '@rc-component/trigger';
import React, { FC, isValidElement, useContext, useMemo, useRef } from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import { TriggerProps } from './interface';
import { getPopupAlign } from './utils';

import './style/index.less';

const Trigger: FC<TriggerProps> = (baseprops) => {
  const { trigger: triggerContext } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, triggerContext);

  const {
    prefixCls = 'yee-trigger',
    trigger = 'click',
    children,
    open,
    defaultOpen,
    placement = 'top',
    popupAlign,
    popup,
    hideOnClick = true,
    mouseEnterDelay = 0,
    mouseLeaveDelay = 0.2,
    arrow,
    forceRender = false,
    onOpenChange,
    zIndex,
    ...rest
  } = props;

  const triggerTestId = (rest as Record<string, unknown>)['data-testid'] as
    | string
    | undefined;
  const wrappedPopup = triggerTestId
    ? () => (
        <div data-popup-for={triggerTestId}>
          {typeof popup === 'function' ? popup() : popup}
        </div>
      )
    : popup;

  const triggerRef = useRef<HTMLElement>(null);
  const [mergedOpen, setMergedOpen] = useMergedState(false, {
    value: open,
    defaultValue: defaultOpen,
  });

  // -------- trigger action -----------------------
  const handlePopupOpenChange = (visible: boolean) => {
    setMergedOpen(visible);
    onOpenChange?.(visible);
  };

  const action = typeof trigger === 'string' ? [trigger] : trigger;

  const innerPopupAlign = getPopupAlign(placement, arrow);

  const getPopupClassNameFromAlign = (align: AlignType) => {
    const { points = [] } = align;
    const popupPoint = `${points[0]}${points[1]}`;
    let pl = '';
    switch (popupPoint) {
      case 'bltl':
        pl = 'topLeft';
        break;
      case 'bctc':
        pl = 'top';
        break;
      case 'brtr':
        pl = 'topRight';
        break;
      case 'tlbl':
        pl = 'bottomLeft';
        break;
      case 'tcbc':
        pl = 'bottom';
        break;
      case 'trbr':
        pl = 'bottomRight';
        break;
      case 'trtl':
        pl = 'leftTop';
        break;
      case 'crcl':
        pl = 'left';
        break;
      case 'brbl':
        pl = 'leftBottom';
        break;
      case 'tltr':
        pl = 'rightTop';
        break;
      case 'clcr':
        pl = 'right';
        break;
      case 'blbr':
        pl = 'rightBottom';
        break;
    }
    return pl ? `${prefixCls}-${pl}` : '';
  };

  const childNode = !isValidElement(children) ? (
    <span ref={triggerRef}>{children}</span>
  ) : (
    React.cloneElement(children, {
      ref: triggerRef,
    } as any)
  );

  const animateName = useMemo(() => {
    if (placement.startsWith('top')) {
      return 'yee-slide-up';
    }
    if (placement.startsWith('bottom')) {
      return 'yee-slide-down';
    }
    if (placement.startsWith('left')) {
      return 'yee-slide-left';
    }
    return 'yee-slide-right';
  }, [placement]);

  const handlePopupClick = () => {
    if (hideOnClick) {
      setMergedOpen(false);
      onOpenChange?.(false);
    }
  };
  return (
    <RcTrigger
      {...rest}
      prefixCls="yee-trigger"
      mouseEnterDelay={mouseEnterDelay}
      mouseLeaveDelay={mouseLeaveDelay}
      arrow={arrow}
      action={action}
      popup={wrappedPopup}
      popupPlacement={placement}
      popupVisible={mergedOpen}
      forceRender={forceRender}
      popupAlign={{
        overflow: {
          adjustX: true,
          adjustY: true,
        },
        ...innerPopupAlign,
        ...popupAlign,
      }}
      popupMotion={{
        motionName: animateName,
        leavedClassName: `${prefixCls}-hidden`,
        motionAppear: true,
        motionEnter: true,
      }}
      popupStyle={{ pointerEvents: 'auto' }}
      {...(zIndex !== undefined ? { zIndex } : {})}
      getPopupClassNameFromAlign={getPopupClassNameFromAlign}
      onOpenChange={handlePopupOpenChange}
      onPopupClick={handlePopupClick}
    >
      {childNode}
    </RcTrigger>
  );
};

export default Trigger;
