// tab-content.tsx (optimized)
import React, { useContext, useMemo } from 'react';
import { TabItemType } from './interface';
import { TabsCtx } from './tabs';
import clsx from 'clsx';

/**
 * Flatten tabs array, handling nested items
 * @param tabs - tabs array
 * @param visited - Set of visited keys to prevent circular references
 * @returns Flattened tabs array
 */
const flattenTabs = (
  tabs: Array<TabItemType> | undefined,
  visited = new Set<string | number>(),
): Array<TabItemType> => {
  if (!tabs || !Array.isArray(tabs)) return [];

  const result: Array<TabItemType> = [];

  for (const tab of tabs) {
    // Prevent circular references
    if (visited.has(tab.key)) {
      console.warn(`Circular reference detected for tab key: ${tab.key}`);
      continue;
    }

    visited.add(tab.key);
    result.push(tab);

    if (tab.items && Array.isArray(tab.items)) {
      result.push(...flattenTabs(tab.items, visited));
    }
  }

  return result;
};

interface TabContentProps {
  prefixCls: string;
  className?: string;
  style?: React.CSSProperties;
}

const TabContent: React.FC<TabContentProps> = ({ prefixCls, className, style }) => {
  const { items, lazy, mountedKeys, activeKey } = useContext(TabsCtx);

  // Use useMemo to cache flattened result
  const flatTabs = useMemo(() => flattenTabs(items), [items]);

  return (
    <div className={clsx(`${prefixCls}-container`, className)} style={style}>
      {flatTabs.map((tab) => {
        const { key, children } = tab;

        // Lazy loading logic: only render mounted tabs or non-lazy tabs
        const shouldRender = !lazy || mountedKeys.has(key);

        if (!shouldRender) return null;

        return (
          <div
            className={`${prefixCls}-tab-content`}
            style={{ display: activeKey === key ? 'block' : 'none' }}
            key={key}
            role="tabpanel"
            aria-labelledby={`tab-${key}`}
            aria-hidden={activeKey !== key}
          >
            {children}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(TabContent);
