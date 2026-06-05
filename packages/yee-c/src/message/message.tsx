import clsx from 'clsx';
import { CircleAlert, CircleCheck, CircleX, Info } from 'lucide-react';
import React, { useEffect } from 'react';
import Spin from '../Spin';
import type { MessageProps } from './interface';

const icons = {
  info: <Info size={16} strokeWidth={2} />,
  success: <CircleCheck size={16} strokeWidth={2} />,
  warning: <CircleAlert size={16} strokeWidth={2} />,
  error: <CircleX size={16} strokeWidth={2} />,
  loading: <Spin className="loading" type="spin" size="small" height="auto" />,
};

const Message: React.FC<MessageProps & { id: string | number }> = (props) => {
  const {
    prefixCls = 'yee-message',
    id: key,
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
        onDestroy?.(key);
        onClose?.();
      }, duration * 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [duration, key, onDestroy, onClose]);

  const renderIcon = () => {
    if (!icon && !status) {
      return null;
    }

    return (
      <span className={`${prefixCls}-icon`}>
        {icon ? icon : status ? icons[status] : null}
      </span>
    );
  };

  return (
    <div
      {...rest}
      data-testid={dataTestId}
      className={clsx(prefixCls, [`${prefixCls}-${status}`], className)}
      style={style}
      onClick={onClick}
    >
      {renderIcon()}
      <p className={`${prefixCls}-content`}>{content}</p>
    </div>
  );
};

export default Message;
