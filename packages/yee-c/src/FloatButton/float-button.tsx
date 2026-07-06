import clsx from 'clsx';
import React, { useContext } from 'react';
import Button from '../Button';
import { GlobalContext } from '../Config-Provider';
import usePressDrag from '../hooks/usePressDrag';
import mergeContextToProps from '../utils/mergeContextToProps';
import { FloatButtonGroupCtx } from './float-button-group';
import type { FloatButtonProps } from './interface';
import './style/index.less';

const FloatButton = React.forwardRef<HTMLButtonElement, FloatButtonProps>(
  (baseprops, ref) => {
    const { floatbutton } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, floatbutton);
    const {
      prefixCls = 'yee-float-btn',
      icon,
      className,
      description,
      draggable = false,
      shape = 'circle',
      classNames,
      styles,
      type = 'default',
      onClick,
      ...rest
    } = props;

    const componentRef =
      (ref as React.RefObject<HTMLButtonElement | null>) ||
      React.createRef<HTMLButtonElement>();

    const onMove = (pos: { x: number; y: number }) => {
      // Check if element exists before operating
      if (componentRef.current) {
        componentRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
    };

    const [{ isDragging }] = usePressDrag({
      element: componentRef,
      draggable,
      direction: 'both',
      onMove,
    });

    const { shape: groupShape } = useContext(FloatButtonGroupCtx);

    const mergedShape = shape || groupShape;

    const cls = clsx(
      prefixCls,
      [`${prefixCls}-${mergedShape}`, `${prefixCls}-${type}`],
      className,
    );

    const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        if (isDragging) return;
        onClick(evt);
      }
    };

    return (
      <Button
        {...rest}
        className={cls}
        shape={shape === 'square' ? 'default' : shape}
        onClick={handleClick}
        ref={componentRef}
      >
        {icon && (
          <div
            className={clsx(`${prefixCls}-icon`, classNames?.icon)}
            style={styles?.icon}
          >
            {typeof icon === 'function' ? icon(props) : icon}
          </div>
        )}
        {description && (
          <div
            className={clsx(
              `${prefixCls}-description`,
              classNames?.description,
            )}
            style={styles?.description}
          >
            {typeof description === 'function' ? description() : description}
          </div>
        )}
      </Button>
    );
  },
);

FloatButton.displayName = 'FloatButton';

export default FloatButton;
