import React, { FC, useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import useEsc from '../hooks/useEsc';
import useMergedState from '../hooks/useMergedState';
import Menu from '../Menu';
import Trigger from '../Trigger';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { DropdownProps } from './interface';

import './style/index.less';

const Dropdown: FC<DropdownProps> = (baseprops) => {
  const { dropdown } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, dropdown);
  const {
    children,
    placement = 'bottom',
    prefixCls = 'yee-dropdown',
    popup,
    menu,
    open,
    defaultOpen,
    arrow = { className: `${prefixCls}-arrow` },
    onOpenChange,
    ...rest
  } = props;

  const [mergedOpen, setMergedOpen] = useMergedState(false, {
    value: open,
    defaultValue: defaultOpen,
  });

  const handleOpenChange = (visible: boolean) => {
    setMergedOpen(visible);
    onOpenChange?.(visible);
  };

  useEsc({
    enabled: mergedOpen,
    onEsc: () => handleOpenChange(false),
  });

  const renderPopup = () => {
    if (popup) {
      return typeof popup === 'function' ? popup() : popup;
    }

    if (menu) {
      return <Menu {...menu} keyboard={mergedOpen} />;
    }

    return null;
  };

  return (
    <Trigger
      {...rest}
      arrow={arrow}
      popup={renderPopup() as React.ReactElement}
      placement={placement}
      popupClassName={`${prefixCls}-popup`}
      open={mergedOpen}
      onOpenChange={handleOpenChange}
    >
      {children}
    </Trigger>
  );
};

export default Dropdown;
