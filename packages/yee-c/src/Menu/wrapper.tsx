import React, { useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '../Config-Provider';
import useKeyControl from '../hooks/useKeyControl';
import useLatest from '../hooks/useLatest';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { FlatItem } from '../utils/tree2array';
import tree2array from '../utils/tree2array';
import type { MenuItemType, MenuProps } from './interface';
import Menu from './menu';

import './style/index.less';

export type MenuWrapperContextType = {
  prefixCls: string;
  mode?: 'vertical' | 'inline' | 'horizontal';
  multiple?: boolean;
  inlineCollapsed?: boolean;
  openKeys: string[];
  selectedKeys: string[];
  focusedKey?: string;
  expandedOnHover?: boolean;
  openOnly?: boolean;
  flatItems: Array<FlatItem>;
  onClick: (isLeaf: boolean, item: MenuItemType, event: MouseEvent) => void;
  onOpenChange?: (openKeys: string[]) => void;
  updateOpenKeys: (keys: string[] | ((prev: string[]) => string[])) => void;
  updateSelectedKeys: (keys: string[] | ((prev: string[]) => string[])) => void;
  footer?: React.ReactNode;
};

export const MenuWrapperCtx = React.createContext<MenuWrapperContextType>(
  {} as MenuWrapperContextType,
);

const MenuWrapper = (baseprops: MenuProps) => {
  const { menu } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, menu);
  const {
    prefixCls = 'yee-menu',
    mode = 'inline',
    openKeys,
    defaultOpenKeys,
    selectedKeys,
    defaultSelectedKeys,
    multiple = false,
    openOnly,
    items,
    keyboard,
    expandedOnHover,
    inlineCollapsed,
    onClick,
    onOpenChange,
    onSelect,
    onDeselect,
    footer,
  } = props;

  const flatItems = useMemo(
    () =>
      tree2array({
        tree: items,
      }),
    [items],
  );

  const [mergedOpenKeys, setMergedOpenKeys] = useMergedState([], {
    value: openKeys,
    defaultValue: defaultOpenKeys,
  });

  const [mergedSelectedKeys, setMergedSelectedKeys] = useMergedState([], {
    value: selectedKeys,
    defaultValue: defaultSelectedKeys,
  });

  // -------- Keyboard control ------------------------------
  const [focusedKey, setFocusedKey] = useState<string | undefined>(undefined);
  const latestOpenKeys = useLatest(mergedOpenKeys);
  const latestFocusedKey = useLatest(focusedKey);

  /** Get items at the currently visible level */
  const getVisibleItems = () => {
    const level = latestOpenKeys.current.length + 1;
    return flatItems.filter((item) => item.level === level);
  };

  const onArrowDown = () => {
    const items = getVisibleItems();
    if (!items.length) return;
    const idx = items.findIndex(
      (item) => item.key === latestFocusedKey.current,
    );
    const nextIdx = idx < items.length - 1 ? idx + 1 : 0;
    setFocusedKey(items[nextIdx].key);
  };

  const onArrowUp = () => {
    const items = getVisibleItems();
    if (!items.length) return;
    const idx = items.findIndex(
      (item) => item.key === latestFocusedKey.current,
    );
    const prevIdx = idx > 0 ? idx - 1 : items.length - 1;
    setFocusedKey(items[prevIdx].key);
  };

  const onArrowLeft = () => {
    if (latestOpenKeys.current.length > 0) {
      const parentKey =
        latestOpenKeys.current[latestOpenKeys.current.length - 1];
      setMergedOpenKeys((prev) => prev.slice(0, -1));
      setFocusedKey(parentKey);
    }
  };

  const onArrowRight = () => {
    const target = flatItems.find(
      (item) => item.key === latestFocusedKey.current,
    );
    if (target && Array.isArray(target.children) && target.children.length) {
      setMergedOpenKeys((prev) =>
        prev.includes(target.key) ? prev : [...prev, target.key],
      );
      setFocusedKey(target.children[0].key);
    }
  };

  const onEnter = (event: KeyboardEvent) => {
    const key = latestFocusedKey.current;
    if (!key) return;
    const item = flatItems.find((item) => item.key === key) as FlatItem;
    setFocusedKey(undefined);
    setMergedOpenKeys([]);
    if (item) {
      onSelect?.({
        item,
        key,
        keyPath: item.keyPath,
        selectedKeys: [key],
        event,
      });
    }
  };

  const { listen, unlisten } = useKeyControl({
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onArrowUp,
    onEnter,
  });

  useEffect(() => {
    if (keyboard === true) {
      listen();
      if (!latestFocusedKey.current) {
        onArrowDown();
      }
    } else if (keyboard === false) {
      unlisten();
      setMergedOpenKeys([]);
    }
    return () => {
      setMergedOpenKeys([]);
      unlisten();
    };
  }, [keyboard]);

  // -------------- End of keyboard control -------------------------------------

  const handleClick = (
    isLeaf: boolean,
    item: MenuItemType,
    event: MouseEvent,
  ) => {
    const { key } = item;
    const target = flatItems.find((item) => item.key === key);
    const keyPath = target?.keyPath || [];

    if (isLeaf) {
      if (multiple) {
        const isSelected = mergedSelectedKeys.includes(key);
        setMergedSelectedKeys((prev) =>
          isSelected ? prev.filter((k) => k !== key) : [...prev, key],
        );
        if (isSelected) {
          onDeselect?.({
            item,
            key,
            keyPath,
            selectedKeys: mergedSelectedKeys.filter((k) => k !== key),
            event,
          });
        } else {
          onSelect?.({
            item,
            key,
            keyPath,
            selectedKeys: [...mergedSelectedKeys, key],
            event,
          });
        }
      } else {
        setMergedSelectedKeys([key]);
        onSelect?.({
          item,
          key,
          keyPath,
          selectedKeys: [key],
          event,
        });
      }
      setMergedOpenKeys([...keyPath]);
    } else {
      setMergedOpenKeys([...keyPath]);
      onOpenChange?.(keyPath);
    }
    onClick?.({ item, key, keyPath });
  };

  const handleOpenChange = (openKeys: string[]) => {
    onOpenChange?.(openKeys);
  };

  return (
    <MenuWrapperCtx.Provider
      value={{
        prefixCls,
        mode,
        multiple,
        inlineCollapsed,
        openKeys: mergedOpenKeys,
        selectedKeys: mergedSelectedKeys,
        focusedKey,
        expandedOnHover,
        openOnly,
        flatItems,
        onClick: handleClick,
        onOpenChange: handleOpenChange,
        updateOpenKeys: setMergedOpenKeys,
        updateSelectedKeys: setMergedSelectedKeys,
        footer,
      }}
    >
      <Menu {...props} root={true} level={0} />
    </MenuWrapperCtx.Provider>
  );
};

MenuWrapper.displayName = 'MenuWrapper';

export default MenuWrapper;
