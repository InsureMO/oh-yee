import clsx from 'clsx';
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-react';
import React, { useEffect } from 'react';
import Spin from '../Spin';
import type { MessageProps } from './interface';

const icons = {
  info: <Info size={22} fill="currentColor" stroke="#FFF" strokeWidth={2} />,
  success: (
    <CircleCheck size={22} fill="currentColor" stroke="#FFF" strokeWidth={2} />
  ),
  warning: (
    <CircleAlert size={22} fill="currentColor" stroke="#FFF" strokeWidth={2} />
  ),
  error: (
    <CircleX size={22} fill="currentColor" stroke="#FFF" strokeWidth={2} />
  ),
  loading: <Spin className="loading" type="spin" size="small" height="auto" />,
};

const Message: React.FC<MessageProps & { id: string | number }> = (props) => {
  const {
    prefixCls = 'yee-message',
    id: key,
    timerGeneration,
    status,
    content,
    style,
    className,
    icon,
    duration = 3,
    onClick,
    onClose,
    onDestroy,
    'data-testid': dataTestId,
    ...rest
  } = props;

  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        onDestroy?.(key, timerGeneration);
      }, duration * 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [duration, key, onDestroy, onClose, timerGeneration]);

  const renderIcon = () => {
    if (!icon && !status) {
      return null;
    }

    return (
      <span aria-hidden="true" className={`${prefixCls}-icon`}>
        {icon ? icon : status ? icons[status] : null}
      </span>
    );
  };

  const isAssertive = status === 'error' || status === 'warning';

  return (
    <div
      {...rest}
      aria-atomic="true"
      aria-live={isAssertive ? 'assertive' : 'polite'}
      role={isAssertive ? 'alert' : 'status'}
      data-testid={dataTestId}
      className={clsx(prefixCls, [`${prefixCls}-${status}`], className)}
      style={style}
      onClick={onClick}
    >
      {renderIcon()}
      <div className={`${prefixCls}-content`}>{content}</div>
    </div>
  );
};

export default Message;
