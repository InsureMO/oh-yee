import clsx from 'clsx';
import { Check, ChevronRight, X } from 'lucide-react';
import React, { useContext, useMemo } from 'react';
import type { StepProps } from './interface';
import { StepsContext } from './steps';

const Step: React.FC<StepProps> = (props) => {
  const {
    index = 0,
    icon,
    title,
    subTitle,
    description,
    disabled,
    className,
    style,
    status: itemStatus,
  } = props;

  const {
    prefixCls,
    current = 0,
    status,
    dot,
    type,
    onChange,
  } = useContext(StepsContext);

  const handleClick = () => {
    if (disabled) return;
    onChange?.(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const mergedStatus =
    itemStatus ??
    status ??
    (index < current ? 'finish' : index === current ? 'process' : 'wait');

  const renderIcon = useMemo(() => {
    if (dot) return <span className={`${prefixCls}-item-dot`}></span>;

    if (mergedStatus === 'error' && index === current) {
      return (
        <span
          className={`${prefixCls}-item-serial ${prefixCls}-item-icon-error`}
        >
          <X />
        </span>
      );
    }

    if (icon) return icon;

    if (type === 'navigation') {
      return <span className={`${prefixCls}-item-serial`}>{index + 1}</span>;
    }

    return index < current ? (
      <span className={`${prefixCls}-item-serial ${prefixCls}-item-icon-check`}>
        <Check size={18} strokeWidth={3} />
      </span>
    ) : (
      <span className={`${prefixCls}-item-serial`}>{index + 1}</span>
    );
  }, [icon, current, index, mergedStatus, dot, type, prefixCls]);

  const cls = clsx(
    `${prefixCls}-item`,
    {
      [`${prefixCls}-item-${mergedStatus}`]: mergedStatus,
      [`${prefixCls}-item-active`]: index === current,
      [`${prefixCls}-item-click`]: onChange,
      [`${prefixCls}-item-disabled`]: disabled,
      [`${prefixCls}-item-has-cus-icon`]: icon,
    },
    className,
  );

  const ribbonStatus =
    index < current ? 'done' : index === current ? 'doing' : 'undo';

  return (
    <>
      {type === 'ribbon' && (
        <div className={`${prefixCls}-item-ribbon-end ${ribbonStatus}`} />
      )}
      <div
        className={cls}
        style={style}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : onChange ? 0 : undefined}
        role={onChange ? 'button' : undefined}
        aria-disabled={disabled}
        aria-current={index === current ? 'step' : undefined}
      >
        <div className={`${prefixCls}-item-icon`}>{renderIcon}</div>
        <div className={`${prefixCls}-item-content`}>
          <div className={`${prefixCls}-item-title`}>
            <span title={typeof title === 'string' ? title : undefined}>
              {title}
            </span>
            {subTitle && (
              <div className={`${prefixCls}-item-sub-title`}>{subTitle}</div>
            )}
          </div>
          {type !== 'ribbon' && description && (
            <div className={`${prefixCls}-item-description`}>{description}</div>
          )}
        </div>
      </div>
      {type === 'navigation' && (
        <div className={`${prefixCls}-item-navi-arrow`}>
          <ChevronRight />
        </div>
      )}
      {type === 'ribbon' && (
        <div className={`${prefixCls}-item-ribbon-head ${ribbonStatus}`} />
      )}
    </>
  );
};

export default Step;
