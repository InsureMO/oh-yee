import clsx from 'clsx';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { BoxProps } from './interface';

import './style/index.less';

const Box = React.forwardRef<HTMLDivElement, BoxProps>((baseProps, ref) => {
  const { box } = useContext(GlobalContext);
  const props = mergeContextToProps(baseProps, box) as BoxProps;
  const {
    prefixCls = 'yee-box',
    children,
    className,
    mode,
    style,
    ...rest
  } = props;

  const componentRef =
    (ref as React.RefObject<HTMLDivElement>) ||
    React.createRef<HTMLDivElement>();
  const headerPlaceholderRef = useRef<HTMLDivElement>(null);
  const footerPlaceholderRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const cls = clsx(
    prefixCls,
    {
      [`${prefixCls}-${mode}`]: mode,
    },
    className,
  );

  const updatePlaceholderHeight = useCallback(() => {
    const ele = componentRef.current;
    if (!ele) return;

    const height = ele.clientHeight;

    if (mode === 'header' && headerPlaceholderRef.current) {
      headerPlaceholderRef.current.style.height = `${height}px`;
    } else if (mode === 'footer' && footerPlaceholderRef.current) {
      footerPlaceholderRef.current.style.height = `${height}px`;
    }
  }, [mode, componentRef]);

  // Update placeholder height on initialization
  useEffect(() => {
    updatePlaceholderHeight();
  }, [updatePlaceholderHeight]);

  // Listen for Box height changes and dynamically update placeholder height
  useEffect(() => {
    if (!mode || !componentRef.current) return;

    // Create ResizeObserver to monitor height changes
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height > 0) {
          updatePlaceholderHeight();
        }
      }
    });

    observer.observe(componentRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [mode, updatePlaceholderHeight]);

  return (
    <>
      {mode === 'header' && (
        <div data-role="header-placeholder" ref={headerPlaceholderRef} />
      )}
      <div {...rest} className={cls} style={style} ref={componentRef}>
        {children}
      </div>
      {mode === 'footer' && (
        <div data-role="footer-placeholder" ref={footerPlaceholderRef} />
      )}
    </>
  );
});

Box.displayName = 'Box';

export default Box;
