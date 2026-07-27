import clsx from 'clsx';
import { CircleAlert, CircleCheck, CircleX, Info, X } from 'lucide-react';
import React from 'react';
import Progress from '../Progress';
import useCountdown from '../hooks/useCountdown';
import { NoticeProps } from './interface';
import Button from '../Button';

const icons = {
  info: <Info size={22} fill='currentColor' stroke="#FFF" strokeWidth={2} />,
  success: <CircleCheck size={22} fill='currentColor' stroke="#FFF" strokeWidth={2} />,
  warning: <CircleAlert size={22} fill='currentColor' stroke="#FFF" strokeWidth={2} />,
  error: <CircleX size={22} fill='currentColor' stroke="#FFF" strokeWidth={2} />,
};

const Notice: React.FC<NoticeProps & { id: string | number }> = (props) => {
  const {
    prefixCls = 'yee-notice',
    id: key,
    timerGeneration,
    placement,
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

  // The state owner dispatches onClose after removing the notice.
  void onClose;

  const isHoveredRef = React.useRef(false);
  const { remaining, isPaused, onPause, onResume } = useCountdown({
    duration,
    resetKey: timerGeneration,
    onComplete: () => {
      onDestroy?.(key, timerGeneration);
    },
  });

  React.useEffect(() => {
    if (pauseOnHover && isHoveredRef.current && !isPaused) {
      onPause();
    } else if ((!pauseOnHover || !isHoveredRef.current) && isPaused) {
      onResume();
    }
  }, [isPaused, onPause, onResume, pauseOnHover]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    if (pauseOnHover) {
      onPause();
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (isPaused) {
      onResume();
    }
  };

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDestroy?.(key, timerGeneration);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick || (event.key !== 'Enter' && event.key !== ' ')) {
      return;
    }
    event.preventDefault();
    onClick();
  };

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

  const renderCloseButton = () => {
    if (!closable) {
      return null;
    }

    return (
      <Button
        variant='text'
        size="small"
        className={`${prefixCls}-close`}
        onClick={handleClose}
        aria-label="Close notice"
        icon={<X aria-hidden="true" size={14} strokeWidth={2} />}
      />
    );
  };

  const isAssertive = status === 'error' || status === 'warning';

  return (
    <div
      {...rest}
      aria-atomic="true"
      aria-live={isAssertive ? 'assertive' : 'polite'}
      role={onClick ? 'button' : isAssertive ? 'alert' : 'status'}
      tabIndex={onClick ? 0 : undefined}
      data-placement={placement}
      data-testid={dataTestId}
      className={clsx(
        prefixCls,
        {
          [`${prefixCls}-${status}`]: status,
          [`${prefixCls}-clickable`]: onClick,
          [`${prefixCls}-closable`]: closable,
        },
        className,
      )}
      style={style}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`${prefixCls}-content-wrapper`}>
        {renderIcon()}
        <div className={`${prefixCls}-content`}>
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
          <div className={`${prefixCls}-description`}>{content}</div>
        </div>
      </div>
      {showProgress && duration > 0 && remaining > 0 && (
        <Progress
          className={`${prefixCls}-progress`}
          showInfo={false}
          strokeWidth={2}
          percent={parseInt(((remaining / duration) * 100).toString())}
        />
      )}
      {renderCloseButton()}
    </div>
  );
};

export default Notice;
