import clsx from 'clsx';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import Trigger from '../Trigger';
import type { FlatItem } from '../utils/tree2array';
import Menu, { MenuCtx } from './menu';
import { MenuWrapperCtx } from './wrapper';

import type { MenuItemProps, MenuItemType } from './interface';

const MenuItem = (props: MenuItemProps) => {
  const { item } = props;

  if ('type' in item && (item.type === 'divider' || item.type === 'group')) {
    return null;
  }

  const { children, label, icon, key, disabled } = item as MenuItemType;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const menuWrapperCtx = React.useContext(MenuWrapperCtx);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { level, mode, classNames, styles } = React.useContext(MenuCtx);
  const {
    prefixCls,
    expandedOnHover,
    openKeys,
    selectedKeys,
    openOnly,
    focusedKey,
    flatItems,
    inlineCollapsed,
    updateOpenKeys,
    onClick,
    onOpenChange,
  } = menuWrapperCtx;

  const isCollapsed = inlineCollapsed && mode === 'inline';

  const iconNode = icon ? (
    <span className={`${prefixCls}-item-icon`}>{icon}</span>
  ) : null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const paddingLeft = React.useMemo(() => {
    if (level === 0 || mode === 'vertical' || isCollapsed) return undefined;
    return 18 + level * 16;
  }, [level, mode, isCollapsed]);

  const hasChildren = Array.isArray(children) && children.length ? true : false;

  const handleClick = (event: any) => {
    onClick(!hasChildren, item as MenuItemType, event);
  };

  if (!hasChildren) {
    return (
      <li
        className={clsx(
          [`${prefixCls}-item`],
          {
            [`${prefixCls}-item-only-child`]: level !== 0,
            [`${prefixCls}-item-selected`]: selectedKeys?.includes(key),
            [`${prefixCls}-item-focused`]: focusedKey === key,
          },
          classNames?.item,
        )}
        style={{ paddingLeft, ...styles?.item }}
        onClick={handleClick}
        title={isCollapsed && typeof label === 'string' ? label : undefined}
      >
        {iconNode}
        {!isCollapsed && (
          <span
            className={`${prefixCls}-item-content`}
            title={typeof label === 'string' ? label : ''}
          >
            {label}
          </span>
        )}
        {isCollapsed && !icon && (
          <span className={`${prefixCls}-item-content`}>
            {typeof label === 'string' ? label.charAt(0) : ''}
          </span>
        )}
      </li>
    );
  }

  const onExpandCallback = (expanded: boolean) => {
    onOpenChange?.();
  };

  const handleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!expandedOnHover && !disabled && hasChildren) {
      let expandedKeys = [];
      const expanded = openKeys.includes(key) ? false : true;
      if (openOnly || mode === 'vertical') {
        expandedKeys = openKeys.includes(key) ? [] : [key];
      } else {
        expandedKeys = openKeys.includes(key)
          ? [...openKeys.filter((k: string) => k !== key)]
          : [...openKeys, key];
      }
      updateOpenKeys(expandedKeys);
      onExpandCallback(expanded);
    }
  };

  const handleOpenChange = (open: boolean) => {
    const target = flatItems.find((item: FlatItem) => item.key === key);
    const keyPath = target ? target.keyPath : [key];
    if (open) {
      const expanded = openKeys.includes(key) ? false : true;
      updateOpenKeys(keyPath);
      onExpandCallback(expanded);
    } else {
      updateOpenKeys((keys: string[]) => [
        ...keys.filter((key) => !keyPath.includes(key)),
      ]);
    }
  };

  const popup = (
    <Menu
      level={level + 1}
      mode={isCollapsed ? 'vertical' : mode}
      items={children || []}
    />
  );
  const opened = openKeys.includes(key);
  const cls = clsx(
    [`${prefixCls}-submenu`],
    [`${prefixCls}-submenu-${mode}`],
    [`${prefixCls}-submenu-${opened ? 'open' : 'close'}`],
    {
      [`${prefixCls}-submenu-focused`]: focusedKey === key,
    },
  );

  const node = flatItems.find((item: FlatItem) => item.key === key);
  const childrenKeys = Array.isArray(node?.children)
    ? node.children.map((item: FlatItem) => item.key)
    : [];

  const renderSwitch = () => {
    if (isCollapsed) return null;
    if (mode === 'vertical' || mode === 'horizontal') {
      return (
        <span className={`${prefixCls}-item-switch`}>
          <ChevronRight strokeWidth={2} size={18} />
        </span>
      );
    }
    return (
      <motion.span
        className={`${prefixCls}-item-switch`}
        animate={{ rotateX: opened ? 180 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <ChevronDown strokeWidth={2} size={18} />
      </motion.span>
    );
  };

  const triggerNode = (
    <div
      role="submenu"
      className={clsx(`${prefixCls}-submenu-title`, {
        [`${prefixCls}-submenu-open`]: opened,
        [`${prefixCls}-submenu-selected`]:
          selectedKeys.includes(key) ||
          selectedKeys.find((k: number | string) =>
            childrenKeys.includes(k as string),
          ),
      })}
      style={{ paddingLeft }}
      onClick={handleExpand}
      title={isCollapsed && typeof label === 'string' ? label : undefined}
    >
      {iconNode}
      {!isCollapsed && (
        <div
          className={`${prefixCls}-item-content`}
          title={typeof label === 'string' ? label : ''}
        >
          {label}
        </div>
      )}
      {isCollapsed && !icon && (
        <span className={`${prefixCls}-item-content`}>
          {typeof label === 'string' ? label.charAt(0) : ''}
        </span>
      )}
      {renderSwitch()}
    </div>
  );

  const usePopup = mode === 'vertical' || mode === 'horizontal' || isCollapsed;
  const placement =
    mode === 'horizontal' && !isCollapsed ? 'bottomLeft' : 'rightTop';

  const childNode = (
    <li className={cls}>
      {usePopup ? (
        <Trigger
          open={openKeys.includes(key)}
          popup={popup}
          placement={placement}
          trigger={['hover']}
          onOpenChange={handleOpenChange}
        >
          {triggerNode}
        </Trigger>
      ) : (
        <>
          {triggerNode}
          <AnimatePresence initial={false}>
            {opened && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{
                  duration: 0.2,
                  ease: 'easeInOut',
                }}
                style={{ overflow: 'hidden' }}
              >
                {popup}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </li>
  );

  return childNode;
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
