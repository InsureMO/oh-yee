// tab-header/dropdown-tabs.tsx (optimized - removed console.log)
import React, { useContext, useMemo } from 'react';
import Dropdown from '../../Dropdown';
import { TabItemType } from '../interface';
import { TabsCtx } from '../tabs';
import TabHeaderTitle from './tab-header-title';

export interface DropdownTabsProps {
  visible: boolean;
  items: Array<TabItemType>;
  range: Record<string, boolean>;
  children: React.ReactElement;
}

const DropdownTabs: React.FC<DropdownTabsProps> = (props) => {
  const { items, range, children } = props;
  const { prefixCls } = useContext(TabsCtx);

  const dropdownContent = useMemo(() => {
    const visibleItems = items.filter((_, index) => range[index]);

    if (visibleItems.length === 0) return null;

    return (
      <div className={`${prefixCls}-operation-container`}>
        {items.map((tab: TabItemType, index: number) => {
          if (!range[index]) return null;

          return (
            <TabHeaderTitle
              {...tab}
              $key={tab.key}
              dropdown={true}
              index={index}
              key={tab.key}
            />
          );
        })}
      </div>
    );
  }, [items, range, prefixCls]);

  if (!dropdownContent) return children;

  return (
    <Dropdown popup={dropdownContent} placement="bottomRight">
      {children}
    </Dropdown>
  );
};

export default React.memo(DropdownTabs);
