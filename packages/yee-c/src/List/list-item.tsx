import clsx from 'clsx';
import React, { forwardRef, useContext } from 'react';
import { ListItemProps } from './interface';
import { ListCtx } from './list';

const ListItem = forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const { $key, className, disabled, label, focusedKey, ...rest } = props;

  const { prefixCls, onClick } = useContext(ListCtx);

  const cls = clsx(
    `${prefixCls}-item`,
    {
      [`${prefixCls}-item-clickable`]: onClick,
      [`${prefixCls}-item-disabled`]: disabled,
      [`${prefixCls}-item-focused`]: focusedKey === $key,
    },
    className,
  );

  const handleClick = () => {
    if (disabled) return;
    onClick?.({ ...props, key: $key });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (disabled) return;
    if (e.key === 'Enter') {
      onClick?.({ ...props, key: $key });
    }
  };

  return (
    <li
      {...rest}
      ref={ref}
      className={cls}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      aria-label="listitem"
    >
      {label}
    </li>
  );
});

ListItem.displayName = 'ListItem';

export default ListItem;
