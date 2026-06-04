import clsx from 'clsx';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import TabContent from './tab-content';
import TabHeader from './tab-header';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import omit from '../utils/omit';
import type { TabsProps } from './interface';
import './style/index.less';

type TabsCtxType = {
  prefixCls: string;
  activeKey: string | number;
  items: TabsProps['items'];
  mountedKeys: Set<string | number>;
  lazy: boolean;
  type?: 'card' | 'editable-card';
  onEdit?: (type: 'add' | 'remove', key?: number | string) => void;
  onTabClick: (key: number | string) => void;
}

export const TabsCtx = React.createContext<TabsCtxType>({} as TabsCtxType);

const Tabs: FC<TabsProps> = (baseprops) => {
  const { tabs } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, tabs);

  const {
    prefixCls = 'yee-tabs',
    position = 'top',
    type,
    className,
    style,
    classNames,
    styles,
    items = [],
    lazy = true,
    activeKey,
    defaultActiveKey,
    fixedHeader,
    onChange,
    onEdit,
    onTabClick,
    ...rest
  } = props;

  // Get the first available key as default value
  const firstAvailableKey = useMemo(() => {
    const firstItem = items.find((item) => !item.disabled);
    return firstItem?.key ?? items[0]?.key;
  }, [items]);

  const [mergedActiveKey, setMergedActiveKey] = useMergedState(
    firstAvailableKey,
    {
      value: activeKey,
      defaultValue: defaultActiveKey,
    },
  );

  // Use Set instead of object to store mounted keys
  const [mountedKeys, setMountedKeys] = useState<Set<string | number>>(
    () => new Set(mergedActiveKey ? [mergedActiveKey] : []),
  );

  useEffect(() => {
    if (mergedActiveKey) {
      setMountedKeys((prevKeys) => {
        const newKeys = new Set(prevKeys);
        newKeys.add(mergedActiveKey);
        return newKeys;
      });
    }
  }, [mergedActiveKey]);

  const cls = clsx(
    prefixCls,
    `${prefixCls}-${position}`,
    {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-fixed-top`]: fixedHeader,
    },
    className,
  );

  const handleTabClick = (key: number | string) => {
    const result = onTabClick?.(key);

    // Only prevent switching when onTabClick explicitly returns false
    if (result === false) {
      return;
    }

    setMergedActiveKey(key);
    onChange?.(key);
  };

  const contextValue = useMemo(
    () => ({
      prefixCls,
      activeKey: mergedActiveKey,
      items,
      mountedKeys,
      lazy,
      type,
      onEdit,
      onTabClick: handleTabClick,
    }),
    [prefixCls, mergedActiveKey, items, mountedKeys, lazy, type, onEdit],
  );

  return (
    <div {...omit(rest, ["headerExtra"])} className={cls} style={style}>
      <TabsCtx.Provider value={contextValue}>
        <TabHeader
          {...omit(props, ['children', 'className', 'style'])}
          prefixCls={prefixCls}
        />
        <TabContent prefixCls={prefixCls} className={classNames?.content} style={styles?.content} />
      </TabsCtx.Provider>
    </div>
  );
};

export default Tabs;
