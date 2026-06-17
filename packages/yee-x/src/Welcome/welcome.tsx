import clsx from 'clsx';
import React, { FC } from 'react';
import { WelcomeProps } from './interface';
import './style/index.less';

const Welcome: FC<WelcomeProps> = (props) => {
  const {
    prefixCls = 'yee-welcome',
    className,
    title,
    description,
    classNames,
    styles,
    children,
    ...rest
  } = props;

  return (
    <div {...rest} className={clsx(prefixCls, className)}>
      <h4
        className={clsx(`${prefixCls}-title`, classNames?.title)}
        style={styles?.title}
      >
        {title}
      </h4>
      {description && (
        <div
          className={clsx(`${prefixCls}-desc`, classNames?.description)}
          style={styles?.description}
        >
          {description}
        </div>
      )}
      {children && (
        <div
          className={clsx(`${prefixCls}-content`, classNames?.content)}
          style={styles?.content}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Welcome;
