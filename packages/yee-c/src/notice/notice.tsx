import clsx from 'clsx';
import { CircleAlert, CircleCheck, CircleX, Info, X } from 'lucide-react';
import React, { useEffect } from 'react';
import Progress from '../Progress';
import useCountdown from '../hooks/useCountdown';
import { NoticeProps } from './interface';

const icons = {
  info: <Info size={20} strokeWidth={2} />,
  success: <CircleCheck size={20} strokeWidth={2} />,
  warning: <CircleAlert size={20} strokeWidth={2} />,
  error: <CircleX size={20} strokeWidth={2} />,
};

const Notice: React.FC<NoticeProps & { id: string | number }> = (props) => {
  const {
    prefixCls = 'yee-notice',
    id: key,
    status,
    title,
    content,
    style,
    className,
    icon,
    duration = 4500,
    closable = true,
    showProgress,
    pauseOnHover = true,
    onClick,
    onClose,
    onDestroy,
    'data-testid': dataTestId,
    ...rest
  } = props;


  const { remaining, onPause, onResume } = useCountdown({
    duration,
    onComplete: () => {
      onDestroy?.(key);
      onClose?.();
    },
  });

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDestroy?.(key);
    onClose?.();
  };

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

  const renderCloseButton = () => {
    if (!closable) {
      return null;
    }

    return (
      <button
        className={`${prefixCls}-close`}
        onClick={handleClose}
        type="button"
        aria-label="Close"
      >
        <X size={14} strokeWidth={2} />
      </button>
    );
  };

  return (
    <div
      {...rest}
      data-testid={dataTestId}
      className={clsx(
        prefixCls,
        { [`${prefixCls}-${status}`]: status },
        className,
      )}
      style={style}
      onClick={onClick}
      onMouseEnter={pauseOnHover ? onPause: undefined}
      onMouseLeave={pauseOnHover ? onResume : undefined}
    >
      <div className={`${prefixCls}-content-wrapper`}>
        {renderIcon()}
        <div className={`${prefixCls}-content`}>
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
          <div className={`${prefixCls}-description`}>{content}</div>
        </div>
      </div>
      {
        showProgress && duration > 0 && remaining > 0 && (
          <Progress className={`${prefixCls}-progress`} 
            showInfo={false} 
            strokeWidth={2} 
            percent={parseInt((remaining / duration * 100).toString())}/>
        )
      }
      {renderCloseButton()}
    </div>
  );
};

export default Notice;
