import { List, Menu, Trigger } from '@rainbow-oh/yee-c';
import { Ellipsis } from 'lucide-react';
import React, { useMemo } from 'react';
import type { HistoryItem, HistoryProps } from './interface';

import './style/index.less';

interface HistorySection {
  group: React.ReactNode;
  /** Index of the section's first item within the source array */
  start: number;
  items: HistoryItem[];
}

const App: React.FC<HistoryProps> = ({
  items,
  menu,
  width = 240,
  activeKey,
  onItemClick,
  onMenuClick,
  classNames,
  styles,
  triggerProps,
}) => {
  const prefixCls = 'yee-history';

  const wrappered = useMemo(() => {
    if (!Array.isArray(items)) return [];
    const buildRow = (item: HistoryItem) => {
      const row = (menuNode?: React.ReactNode) => (
        <div className={`${prefixCls}-row`}>
          <div className={`${prefixCls}-row-main`}>
            <span className={`${prefixCls}-label`}>{item.label}</span>
            <span className={`${prefixCls}-row-side`}>
              {item.extra}
              {menuNode}
            </span>
          </div>
          {item.description !== undefined && item.description !== null && (
            <div className={`${prefixCls}-desc`}>{item.description}</div>
          )}
        </div>
      );
      const itemCls =
        activeKey !== undefined &&
        activeKey !== null &&
        item.key === activeKey
          ? `${prefixCls}-item-active`
          : undefined;
      const rowNode = row(
        Array.isArray(menu) ? (
          <Trigger
            {...triggerProps}
            popup={
              <Menu
                style={{ minWidth: 160, ...styles?.menu }}
                className={classNames?.menu}
                items={menu}
                onClick={(info: { key: string }) => {
                  const menuItem = menu.find((m) => String(m.key) === info.key);
                  if (menuItem) onMenuClick?.(menuItem, item);
                }}
              />
            }
            placement={triggerProps?.placement ?? 'bottomRight'}
          >
            <span
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <Ellipsis size={16} className={`${prefixCls}-menu-icon`} />
            </span>
          </Trigger>
        ) : undefined,
      );
      // Whitelist the props: the row object spreads onto the yee-c List
      // item <li>, so anything else (group, extra, consumer extras) would
      // leak as DOM attributes. ListItem renders `label`, not children.
      return { key: item.key, className: itemCls, label: rowNode };
    };
    return items.map(buildRow);
  }, [items, menu, activeKey, onMenuClick, triggerProps]);

  // Contiguous grouping: a section break happens whenever the group label
  // differs from the previous item's; ungrouped items render headerless.
  const sections = useMemo<HistorySection[]>(() => {
    if (!Array.isArray(items)) return [];
    const result: HistorySection[] = [];
    items.forEach((item, index) => {
      const prev = items[index - 1];
      if (index === 0 || item.group !== prev?.group) {
        result.push({ group: item.group, start: index, items: [item] });
      } else {
        result[result.length - 1].items.push(item);
      }
    });
    return result;
  }, [items]);

  return (
    <div className={prefixCls} style={{ width }}>
      {sections.map((section, sectionIndex) => (
        <React.Fragment key={sectionIndex}>
          {section.group !== undefined && section.group !== null && (
            <div className={`${prefixCls}-group`}>{section.group}</div>
          )}
          <List
            items={wrappered.slice(
              section.start,
              section.start + section.items.length,
            )}
            onClick={(rowItem) => {
              // ListItem echoes the wrappered row back; resolve the caller's
              // original item (with intact label/group/extra/description).
              const original = section.items.find(
                (i) => i.key === (rowItem as HistoryItem).key,
              );
              if (original) onItemClick?.(original);
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default App;
