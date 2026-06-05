import clsx from 'clsx';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useContext, useRef, useState } from 'react';
import Button from '../Button';
import { GlobalContext } from '../Config-Provider';
import Portal from '../Portal';
import useEsc from '../hooks/useEsc';
import useLockFocus from '../hooks/useLockFocus';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { DrawerProps } from './interface';

import useFocusManage from '../hooks/useFocusManage';
import './style/index.less';

// Default value constants
const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 300;
const ANIMATION_DURATION = 0.2;
const CLOSE_ICON_SIZE = 16;
const CLOSE_ICON_STROKE_WIDTH = 1.5;

const getAnimate = (
  placement: 'left' | 'right' | 'bottom' | 'top',
  open: boolean,
) => {
  switch (placement) {
    case 'left':
      return {
        initial: { x: '-100%', opacity: 1 },
        animate: open ? { x: 0 } : { x: '-100%' },
        exit: { x: '-100%' },
      };
    case 'right':
      return {
        initial: { x: '100%', opacity: 1 },
        animate: open ? { x: 0 } : { x: '100%' },
        exit: { x: '100%' },
      };
    case 'top':
      return {
        initial: { y: '-100%', opacity: 1 },
        animate: open ? { y: 0 } : { y: '-100%' },
        exit: { y: '-100%' },
      };
    default:
      return {
        initial: { y: '100%', opacity: 1 },
        animate: open ? { y: 0 } : { y: '100%' },
        exit: { y: '100%' },
      };
  }
};

const Drawer = (baseprops: DrawerProps) => {
  const { drawer } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, drawer);

  const {
    prefixCls = 'yee-drawer',
    className,
    style,
    classNames,
    styles,
    children,
    open,
    title,
    closable = true,
    showMask = true,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    placement = 'right',
    maskClosable = true,
    keyboard = true,
    footer,
    destroyOnClose,
    getContainer,
    onClose,
    ...rest
  } = props;

  const [delayOpen, setDelayOpen] = useState(open);
  const contentRef = useRef<HTMLDivElement>(null);

  useLockFocus(contentRef.current, delayOpen);

  useEsc({
    enabled: keyboard,
    onEsc: () => {
      onClose?.();
    },
  });

  useFocusManage(contentRef.current as HTMLElement, delayOpen);

  const cls = clsx(
    prefixCls,
    `${prefixCls}-${placement}`,
    {
      [`${prefixCls}-open`]: delayOpen,
    },
    className,
  );

  const renderClose = () => {
    if (!closable) {
      return null;
    }

    const closeConfig = typeof closable === 'object' ? closable : undefined;
    const { icon, placement: closePlacement } = closeConfig ?? {};

    return (
      <Button
        type="text"
        icon={
          icon ?? (
            <X size={CLOSE_ICON_SIZE} strokeWidth={CLOSE_ICON_STROKE_WIDTH} />
          )
        }
        className={clsx(
          `${prefixCls}-close`,
          {
            [`${prefixCls}-close-${closePlacement}`]: closePlacement,
          },
          classNames?.close,
        )}
        style={styles?.close}
        aria-label="close"
        onClick={onClose}
      ></Button>
    );
  };

  const renderFooter = () => {
    if (!footer) {
      return null;
    }
    return (
      <div
        className={clsx(`${prefixCls}-footer`, classNames?.footer)}
        style={styles?.footer}
      >
        {typeof footer === 'function' ? footer() : footer}
      </div>
    );
  };

  const renderNode = () => {
    const { initial, animate, exit } = getAnimate(placement, open);
    return (
      <div {...rest} className={cls} style={style} role="modal">
        {showMask && delayOpen && (
          <motion.div
            className={clsx(`${prefixCls}-mask`, classNames?.mask)}
            style={styles?.mask}
            onClick={maskClosable ? onClose : undefined}
            initial={{ opacity: 0 }}
            animate={open ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION_DURATION }}
          ></motion.div>
        )}
        <motion.div
          className={`${prefixCls}-content-wrapper`}
          style={{
            width:
              placement === 'left' || placement === 'right' ? width : undefined,
            height:
              placement === 'top' || placement === 'bottom'
                ? height
                : undefined,
          }}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={{ duration: ANIMATION_DURATION }}
          onAnimationStart={() => {
            if (open) {
              setDelayOpen(true);
            }
          }}
          onAnimationComplete={() => {
            if (!open) {
              setDelayOpen(false);
            }
          }}
        >
          <div
            className={clsx(`${prefixCls}-content`, classNames?.content)}
            tabIndex={0}
            style={styles?.content}
            ref={contentRef}
          >
            {renderClose()}
            {title ? (
              <div
                className={clsx(`${prefixCls}-header`, classNames?.header)}
                style={styles?.header}
              >
                <div className={`${prefixCls}-title`}>{title}</div>
              </div>
            ) : null}
            <div
              className={clsx(`${prefixCls}-body`, classNames?.body)}
              style={styles?.body}
            >
              {children}
            </div>
            {renderFooter()}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <Portal
      open={open}
      destroyOnClose={destroyOnClose}
      getContainer={getContainer}
    >
      {renderNode()}
    </Portal>
  );
};

export default Drawer;
