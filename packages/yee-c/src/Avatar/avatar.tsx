import clsx from 'clsx';
import React, { forwardRef, useCallback, useState, useContext } from 'react';
import { User } from 'lucide-react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { AvatarProps } from './interface';

import './style/index.less';

const Avatar = forwardRef<HTMLDivElement, AvatarProps>((baseprops, ref) => {
  const { avatar } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, avatar);
  const {
    prefixCls = 'yee-avatar',
    className,
    icon,
    src,
    shape = 'circle',
    alt,
    size = 'default',
    style,
    children,
    ...rest
  } = props;

  const [imgError, setImgError] = useState(false);

  const handleImageError = useCallback(() => {
    setImgError(true);
  }, []);

  const cls = clsx(
    prefixCls,
    {
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${size}`]: typeof size === 'string',
    },
    className,
  );

  const getStyle = () => {
    if (typeof size === 'number') {
      return {
        ...style,
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: `${size}px`,
        fontSize: `${size / 2}px`,
      };
    }
    return style;
  };

  const renderContent = () => {
    // 1. Priority: show image (if no load error)
    if (src && !imgError) {
      return (
        <img
          className={`${prefixCls}-image`}
          src={src}
          alt={alt}
          loading="lazy"
          onError={handleImageError}
        />
      );
    }

    // 2. Next: show custom icon
    if (icon) {
      if (typeof icon === 'function') {
        return icon();
      }
      return icon;
    }

    // 3. Next: show text content
    if (children) {
      return <span className={`${prefixCls}-text`}>{children}</span>;
    }

    // 4. Finally: show default user icon
    return <User className={`${prefixCls}-default-icon`} />;
  };

  return (
    <div {...rest} className={cls} style={getStyle()} ref={ref}>
      {renderContent()}
    </div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
