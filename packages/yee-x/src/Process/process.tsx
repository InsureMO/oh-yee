import { usePrevious, useUpdateEffect } from '@rainbow-oh/yee-c';
import clsx from 'clsx';
import { motion } from 'motion/react';
import React, { memo, useState } from 'react';
import { ProcessProps } from './interface';
import './style/index.less';

const equal = (prevProps: ProcessProps, nextProps: ProcessProps) => {
  return prevProps.message === nextProps.message;
};

const Process = (props: ProcessProps) => {
  const {
    prefixCls = 'yee-process',
    className,
    style,
    classNames,
    styles,
    title,
    message,
    duration = 0.3,
  } = props;

  const prevMsg = usePrevious(message);
  const [start, setStart] = useState(false);

  useUpdateEffect(() => {
    setStart(true);
    const timer = setTimeout(() => {
      setStart(false);
    }, duration * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  if (message === undefined || message === null || message === '') {
    return null;
  }

  const renderMessage = () => {
    return (
      <div className={`${prefixCls}-wrapper`}>
        <motion.div
          className={`${prefixCls}-wrapper-mask`}
          initial={{ y: 0 }}
          animate={start ? { y: -22 } : { y: 0 }}
          transition={start ? { duration: duration } : { duration: 0 }}
        >
          {prevMsg && start && (
            <span className={`${prefixCls}-message`}>{prevMsg}</span>
          )}
          <span
            className={clsx(`${prefixCls}-message`, classNames?.message)}
            style={styles?.message}
          >
            {message}
          </span>
        </motion.div>
      </div>
    );
  };

  return (
    <div className={clsx(prefixCls, className)} style={style}>
      {title && (
        <div
          className={clsx(`${prefixCls}-title`, classNames?.title)}
          style={styles?.title}
        >
          {title}
        </div>
      )}
      {renderMessage()}
    </div>
  );
};

export default memo(Process, equal);
