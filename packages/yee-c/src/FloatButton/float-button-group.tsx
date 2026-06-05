import clsx from 'clsx';
import React, { createContext, useState } from 'react';
import Trigger from '../Trigger';
import FloatButton from './float-button';
import type { FloatButtonGroupProps } from './interface';
import './style/index.less';

export const FloatButtonGroupCtx = createContext<{
  shape?: 'circle' | 'square';
}>({});

export default function FloatButtonGroup(props: FloatButtonGroupProps) {
  const {
    prefixCls = 'yee-float-btn-group',
    className,
    children,
    style,
    shape,
    trigger,
    icon,
  } = props;

  const [, setOpen] = useState(false);
  const cls = clsx(
    prefixCls,
    {
      [`${prefixCls}-static`]: trigger,
    },
    className,
  );

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const node = (
    <div className={cls} style={style}>
      <FloatButtonGroupCtx.Provider value={{ shape }}>
        {children}
      </FloatButtonGroupCtx.Provider>
    </div>
  );

  if (trigger) {
    return (
      <Trigger
        trigger={trigger}
        popupAlign={{
          offset: [0, -8],
        }}
        getPopupContainer={(trigger: HTMLElement) => trigger.parentElement!}
        popup={node}
        onOpenChange={handleOpenChange}
      >
        <FloatButton icon={icon} />
      </Trigger>
    );
  }

  return node;
}
