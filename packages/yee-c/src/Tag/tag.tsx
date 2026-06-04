import clsx from 'clsx';
import { X } from 'lucide-react';
import React, { forwardRef, useContext } from 'react';
import Button from '../Button';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { TagProps } from './interface';
import './style/index.less';

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
      onClose,
      onChange,
      ...rest
    } = props;

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
      className,
    );

    const renderClose = () => closable ? (
      <Button
        className={clsx(`${prefixCls}-close`, classNames?.close)}
        style={styles?.close}
        type="text"
        size="small"
        onClick={onClose}
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
      <div {...rest} className={cls} onClick={handleClick} ref={ref}>
        {icon && <span className={clsx(`${prefixCls}-icon`, classNames?.icon)} style={styles?.icon}>{icon}</span>}
        {icon || closeNode ? <span className={clsx(classNames?.content)} style={styles?.content}>{children}</span> : children}
        {closeNode}
      </div>
    );
  },
);

Tag.displayName = 'Tag';

export default Tag;
