import clsx from 'clsx';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { GlobalContext } from '../Config-Provider';
import useEsc from '../hooks/useEsc';
import useFocusManage from '../hooks/useFocusManage';
import useLockFocus from '../hooks/useLockFocus';
import usePressDrag from '../hooks/usePressDrag';
import { useLocale } from '../locale';
import Portal from '../Portal';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { DialogProps } from './interface';
import './style/index.less';

// Default value constants
const DEFAULT_WIDTH = 400;
const ANIMATION_DURATION = 0.2;
const CLOSE_ICON_SIZE = 16;
const CLOSE_ICON_STROKE_WIDTH = 1.5;

const Dialog = (baseprops: DialogProps) => {
  const { dialog } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, dialog);
  const { locale } = useLocale();
  const { modal } = locale;

  const {
    prefixCls = 'yee-dialog',
    children,
    open,
    title,
    closable = true,
    showMask = true,
    width = DEFAULT_WIDTH,
    maskClosable = true,
    footer = true,
    destroyOnClose,
    cancelText = modal.cancelText,
    cancelType,
    confirmText = modal.okText,
    confirmType = 'primary',
    classNames,
    styles,
    draggable,
    dragLimitInWindow = true,
    openResetLocation = true,
    fullscreen = false,
    keyboard = true,
    getContainer,
    onCancel,
    onConfirm,
    ...rest
  } = props;

  const [delayOpen, setDelayOpen] = useState(open);
  const contentRef = useRef<HTMLDivElement>(null);

  // When open changes and openResetLocation is true, reset position
  useEffect(() => {
    if (open && draggable && openResetLocation) {
      contentRef.current?.style.removeProperty('transform');
    }
  }, [open, draggable, openResetLocation]);

  usePressDrag({
    draggable,
    element: contentRef,
    bounds: dragLimitInWindow ? () => document.body : undefined,
  });

  // lock focus in the dialog
  useLockFocus(contentRef?.current ?? null, delayOpen);

  // enable esc to close dialog
  useEsc({
    enabled: keyboard,
    onEsc: () => {
      onCancel?.();
    },
  });

  // manage focus
  useFocusManage(contentRef.current as HTMLElement, delayOpen);

  const cls = clsx(prefixCls, {
    [`${prefixCls}-open`]: delayOpen,
    [`${prefixCls}-fullscreen`]: fullscreen,
  });

  const renderFooter = () => {
    if (footer === false) {
      return null;
    }

    if (footer === true || footer === undefined) {
      return (
        <div
          className={clsx(`${prefixCls}-footer`, classNames?.footer)}
          style={styles?.footer}
        >
          <Button type={cancelType} onClick={onCancel}>
            {cancelText}
          </Button>
          <Button type={confirmType} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      );
    }

    return (
      <div
        className={clsx(`${prefixCls}-footer`, classNames?.footer)}
        style={styles?.footer}
      >
        {footer}
      </div>
    );
  };

  const node = (
    <motion.div
      {...rest}
      className={cls}
      initial={{ opacity: 0 }}
      animate={open ? { opacity: 1 } : { opacity: 0 }}
      exit={{ opacity: 0 }}
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
      {showMask && delayOpen && (
        <div
          className={clsx(`${prefixCls}-mask`, classNames?.mask)}
          style={styles?.mask}
        ></div>
      )}
      <div
        className={`${prefixCls}-content-wrapper`}
        onClick={maskClosable ? onCancel : undefined}
      >
        <div
          className={clsx(`${prefixCls}-content`, classNames?.content)}
          style={{ width: fullscreen ? '100%' : width, ...styles?.content }}
          tabIndex={0}
          onClick={(e) => e.stopPropagation()}
          ref={contentRef}
        >
          {closable ? (
            <Button
              type="text"
              icon={
                <X
                  size={CLOSE_ICON_SIZE}
                  strokeWidth={CLOSE_ICON_STROKE_WIDTH}
                />
              }
              className={`${prefixCls}-close`}
              aria-label="close"
              onClick={onCancel}
            ></Button>
          ) : null}
          {title ? (
            <div className={`${prefixCls}-header`}>
              <div className={`${prefixCls}-title`}>{title}</div>
            </div>
          ) : null}
          <div className={`${prefixCls}-body`}>{children}</div>
          {renderFooter()}
        </div>
      </div>
    </motion.div>
  );

  return (
    <Portal
      open={open}
      destroyOnClose={destroyOnClose}
      getContainer={getContainer}
    >
      {node}
    </Portal>
  );
};

export default Dialog;
