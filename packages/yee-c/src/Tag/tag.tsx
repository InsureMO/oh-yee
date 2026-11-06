import clsx from 'clsx';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import React, { forwardRef, useContext, useRef, useState } from 'react';
import Button from '../Button';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { TagProps } from './interface';
import './style/index.less';

const CLOSE_ANIMATION_TRANSITION = { duration: 0.2, ease: 'easeIn' } as const;

const Tag = forwardRef(
  (baseprops: TagProps, ref: React.Ref<HTMLDivElement>) => {
    const { tag } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, tag);
    const {
      prefixCls = 'yee-tag',
      closable,
      status,
      dashed,
      children,
      size,
      checked,
      checkable,
      className,
      icon,
      classNames,
      styles,
      variant = 'filled',
      onClose,
      onChange,
      ...rest
    } = props;

    // Close flow mirrors mainstream tag implementations (e.g. antd): the tag
    // plays a zoom-out animation first, then reports onClose and hides
    // itself. Fully controlled for the parent, animated on its own.
    const [closing, setClosing] = useState(false);
    const [closed, setClosed] = useState(false);
    // The original click event is reported to onClose when the animation
    // finishes, matching the close-event semantics of mainstream libraries.
    const closeEventRef =
      useRef<React.MouseEvent<HTMLSpanElement> | null>(null);

    const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Closing a tag must not toggle a checkable tag.
      e.stopPropagation();
      if (closing) {
        return;
      }
      closeEventRef.current = e as unknown as React.MouseEvent<HTMLSpanElement>;
      setClosing(true);
    };

    const handleAnimationComplete = () => {
      if (closing) {
        setClosed(true);
        onClose?.(closeEventRef.current as React.MouseEvent<HTMLSpanElement>);
        closeEventRef.current = null;
      }
    };

    const handleClick = () => {
      if (checkable) {
        onChange?.(!checked);
      }
    };

    const cls = clsx(
      prefixCls,
      {
        [`${prefixCls}-${status}`]: status,
        [`${prefixCls}-dashed`]: dashed,
        [`${prefixCls}-checked`]: checked,
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-checkable`]: checkable,
      },
      [`${prefixCls}-${variant}`],
      className,
    );

    if (closed) {
      return null;
    }

    const renderClose = () =>
      closable ? (
        <Button
          className={clsx(`${prefixCls}-close`, classNames?.close)}
          style={styles?.close}
          type="text"
          size="small"
          aria-label="close"
          onClick={handleCloseClick}
        >
          {typeof closable === 'boolean' ? (
            <X size={14} strokeWidth={1} />
          ) : (
            closable
          )}
        </Button>
      ) : null;

    const closeNode = renderClose();

    return (
      <motion.div
        {...rest}
        className={cls}
        onClick={handleClick}
        ref={ref}
        initial={false}
        animate={{ scale: closing ? 0.6 : 1, opacity: closing ? 0 : 1 }}
        transition={CLOSE_ANIMATION_TRANSITION}
        onAnimationComplete={handleAnimationComplete}
        {...(checkable
          ? {
              role: 'checkbox',
              'aria-checked': checked || false,
              tabIndex: 0,
            }
          : undefined)}
      >
        {icon && (
          <span
            className={clsx(`${prefixCls}-icon`, classNames?.icon)}
            style={styles?.icon}
          >
            {icon}
          </span>
        )}
        {icon || closeNode ? (
          <span className={clsx(classNames?.content)} style={styles?.content}>
            {children}
          </span>
        ) : (
          children
        )}
        {closeNode}
      </motion.div>
    );
  },
);

Tag.displayName = 'Tag';

export default Tag;
