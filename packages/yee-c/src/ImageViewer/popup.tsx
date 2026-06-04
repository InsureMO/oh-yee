import clsx from 'clsx';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useContext, useEffect, useRef } from 'react';
import Portal from '../Portal';
import useEsc from '../hooks/useEsc';
import useLockFocus from '../hooks/useLockFocus';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { ImageViewerPopupProps } from './interface';

import './style/index.less';
import useElementFocus from '../hooks/useLockFocus';

export const PopupCtx = React.createContext({ popup: false, open: false, onClose: (() => {}) as () => void });

const CLOSE_ICON_SIZE = 20;
const CLOSE_ICON_STROKE_WIDTH = 1.5;
const ANIMATION_DURATION = 0.2;

const Popup: React.ForwardRefRenderFunction<HTMLDivElement, ImageViewerPopupProps> = (baseprops, ref) => {
  const { imageviewerpopup } = useContext(GlobalContext);
  const props = mergeContextToProps<ImageViewerPopupProps>(baseprops, imageviewerpopup);

  const {
    prefixCls = 'yee-image-viewer',
    className,
    style,
    open,
    destroyOnClose = true,
    getContainer,
    maskClosable = true,
    keyboard = true,
    children,
    onClose,
  } = props;

  const componentRef = (ref as React.RefObject<HTMLDivElement>) || useRef<HTMLDivElement>(null);

  useEsc({
    enabled: keyboard,
    onEsc: () => {
      onClose?.();
    },
  });
  useLockFocus(componentRef.current, open);
  useElementFocus(componentRef.current, open);

  const handleMaskClick = () => {
    if (maskClosable) {
      onClose?.();
    }
  };

  const node = (
    <motion.div
      className={clsx(`${prefixCls}-popup`, className)}
      style={style}
      initial={{ opacity: 0 }}
      animate={open ? { opacity: 1 } : { opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: ANIMATION_DURATION }}
    >
      <div
        className={`${prefixCls}-popup-mask`}
        onClick={handleMaskClick}
        aria-hidden="true"
      />
      <div
        className={`${prefixCls}-popup-content`}
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
        tabIndex={-1}
        ref={componentRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`${prefixCls}-popup-close`}
          onClick={onClose}
          aria-label="Close image preview"
        >
          <X size={CLOSE_ICON_SIZE} strokeWidth={CLOSE_ICON_STROKE_WIDTH} />
        </button>
        <PopupCtx.Provider value={{ popup: true, open, onClose: onClose ?? (() => {}) }}>
          {children}
        </PopupCtx.Provider>
      </div>
    </motion.div>
  );

  return (
    <Portal open={open} destroyOnClose={destroyOnClose} getContainer={getContainer}>
      {node}
    </Portal>
  );
};

const ForwardRefPopup = React.forwardRef(Popup);

ForwardRefPopup.displayName = 'ImageViewerPopup';

export default ForwardRefPopup;
