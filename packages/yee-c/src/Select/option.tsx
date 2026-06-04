import clsx from 'clsx';
import React, { useContext } from 'react';

import { OptionsCtx } from './options';

const Option = (props: any) => {
  const { label, value, disabled, title } = props;
  const { prefixCls, selectedKeys, focusedKey, onSelect } =
    useContext(OptionsCtx);

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (!disabled) {
      onSelect(value, e);
    }
  };

  const htmlTitle = title
    ? title
    : typeof label === 'string'
      ? label
      : undefined;

  return (
    <div
      className={clsx(`${prefixCls}-option`, {
        [`${prefixCls}-option-selected`]: selectedKeys.includes(value),
        [`${prefixCls}-option-focused`]: focusedKey === value,
        [`${prefixCls}-option-disabled`]: disabled,
      })}
      aria-label="option"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleClick(e);
        }
      }}
      role="option"
      tabIndex={disabled ? undefined : 0}
      title={htmlTitle}
    >
      {label}
    </div>
  );
};

export default Option;
