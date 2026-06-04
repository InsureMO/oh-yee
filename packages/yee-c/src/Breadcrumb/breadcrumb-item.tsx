import clsx from 'clsx';
import React, { useContext } from 'react';
import { BreadcrumbCtx } from './breadcrumb';
import type { BreadcrumbItemProps } from './interface';

interface InternalBreadcrumbItemProps extends BreadcrumbItemProps {
  index: number;
}

const BreadcrumbItem: React.FC<InternalBreadcrumbItemProps> = (props) => {
  const {
    className,
    style,
    title,
    href,
    index,
    onClick,
    ...rest
  } = props;

  const { prefixCls, separator, total } = useContext(BreadcrumbCtx);

  const handleClick = () => {
    onClick?.({ index });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const isLast = index === total - 1;

  const linkContent = (
    <span className={`${prefixCls}-link`}>
      {typeof title === 'function' ? title() : title}
    </span>
  );

  return (
    <>
      <li
        {...rest}
        className={clsx(
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-last`]: isLast,
            [`${prefixCls}-item-clickable`]: onClick && !isLast,
          },
          className,
        )}
        style={style}
        role="listitem"
      >
        {href && !isLast ? (
          <a
            href={href}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={onClick ? 0 : -1}
            className={`${prefixCls}-link`}
            aria-current={isLast ? 'page' : undefined}
          >
            {linkContent}
          </a>
        ) : (
          <span
            onClick={onClick && !isLast ? handleClick : undefined}
            onKeyDown={onClick && !isLast ? handleKeyDown : undefined}
            tabIndex={onClick && !isLast ? 0 : -1}
            className={`${prefixCls}-link`}
            aria-current={isLast ? 'page' : undefined}
            role={onClick && !isLast ? 'button' : undefined}
          >
            {typeof title === 'function' ? title() : title}
          </span>
        )}
      </li>
      {!isLast && (
        <li
          className={`${prefixCls}-separator`}
          aria-hidden="true"
          role="presentation"
        >
          {separator}
        </li>
      )}
    </>
  );
};

BreadcrumbItem.displayName = 'Breadcrumb.Item';

export default BreadcrumbItem;
