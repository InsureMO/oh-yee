import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { GlobalContext } from '../Config-Provider';
import Spin from '../Spin';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { ButtonProps } from './interface';

import './style/index.less';

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (baseprops, ref) => {
    const { button } = React.useContext(GlobalContext);
    const props = mergeContextToProps<ButtonProps>(baseprops, button);

    const {
      prefixCls = 'yee-btn',
      className,
      styles,
      classNames,
      type = 'default',
      htmlType = 'button',
      ghost,
      shape,
      size = 'default',
      block,
      icon,
      disabled,
      loading,
      href,
      color,
      variant,
      children,
      ...rest
    } = props;

    const componentRef =
      ref || React.createRef<HTMLButtonElement | HTMLAnchorElement>();

    let mergedColor;
    let mergedVariant;

    if (type) {
      switch (type) {
        case 'default':
          mergedColor = 'primary';
          mergedVariant = 'outlined';
          break;
        case 'primary':
          mergedColor = 'primary';
          mergedVariant = 'solid';
          break;
        case 'dashed':
          mergedColor = 'primary';
          mergedVariant = 'dashed';
          break;
        case 'link':
          mergedColor = 'primary';
          mergedVariant = 'link';
          break;
        case 'text':
          mergedColor = 'default';
          mergedVariant = 'text';
          break;
      }
    }

    mergedColor = color || mergedColor;
    mergedVariant = variant || mergedVariant;

    const cls = clsx(
      prefixCls,
      {
        [`${prefixCls}-${mergedColor}`]: mergedColor,
        [`${prefixCls}-${mergedVariant}`]: mergedVariant,
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-ghost`]: ghost,
        [`${prefixCls}-${shape}`]: shape,
        [`${prefixCls}-icon`]: icon && children,
        [`${prefixCls}-icon-only`]: icon && !children,
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-disabled`]: disabled,
      },
      className,
    );

    const renderContent = () => {
      const content =
        typeof children === 'string' ? (
          <span className={classNames?.content} style={styles?.content}>
            {children}
          </span>
        ) : (
          children
        );

      if (loading) {
        return icon && !children ? null : content;
      }

      return (
        <>
          {icon && (
            <span
              className={clsx(`${prefixCls}-icon`, classNames?.icon)}
              style={styles?.icon}
            >
              {typeof icon === 'function' ? icon(props) : icon}
            </span>
          )}
          {children ? content : null}
        </>
      );
    };

    const renderLoadingNode = () => {
      return loading ? (
        <div className={`${prefixCls}-loading`}>
          <Spin
            type="spin"
            size="small"
            color={mergedVariant === 'solid' ? 'white' : undefined}
          />
        </div>
      ) : null;
    };

    if (href) {
      return (
        // @ts-ignore
        <a
          {...rest}
          className={cls}
          href={disabled ? undefined : href}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-disabled={disabled}
          ref={componentRef as React.Ref<HTMLAnchorElement>}
        >
          {renderLoadingNode()}
          {renderContent()}
        </a>
      );
    }

    return (
      <button
        {...rest}
        // eslint-disable-next-line react/button-has-type
        type={htmlType}
        className={cls}
        disabled={disabled || loading}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-label={
          icon && !children ? rest['aria-label'] || 'icon button' : undefined
        }
        ref={componentRef as React.Ref<HTMLButtonElement>}
      >
        {renderLoadingNode()}
        {renderContent()}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
