import { List, Menu, Trigger } from '@rainbow-oh/yee-c';
import { Ellipsis } from 'lucide-react';
import React, { useMemo } from 'react';

export interface HistoryItem {
  key: string | number;
  label: string;
  [prop: string]: unknown;
}

export interface HistoryMenu {
  key: string | number;
  label: string;
}

export interface HistoryProps {
  items: HistoryItem[];
  menu?: HistoryMenu[];
  onItemClick?: (item: HistoryItem) => void;
  onMenuClick?: (menu: HistoryMenu, item: HistoryItem) => void;
}

const App: React.FC<HistoryProps> = ({
  items,
  menu,
  onItemClick,
  onMenuClick,
}) => {
  const wrappered = useMemo(() => {
    if (!Array.isArray(items)) return [];
    if (Array.isArray(menu)) {
      return items.map((item) => ({
        ...item,
        children: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: 32,
              alignItems: 'center',
              padding: '0 8px',
            }}
          >
            <span>{item.label}</span>
            <span>
              <Trigger
                popup={
                  <Menu
                    style={{ width: 100 }}
                    items={menu as Array<{ key: string; label: string }>}
                    onClick={(info: { key: string }) => {
                      const menuItem = menu.find(
                        (m) => String(m.key) === info.key,
                      );
                      if (menuItem) onMenuClick?.(menuItem, item);
                    }}
                  />
                }
                placement="bottomRight"
              >
                <Ellipsis size={16} />
              </Trigger>
            </span>
          </div>
        ),
      }));
    }
    return items.map((item) => ({
      ...item,
      children: item.label,
    }));
  }, [items, menu, onMenuClick]);

  return (
    <div style={{ width: '240px' }}>
      <List
        items={wrappered}
        onClick={(item) => onItemClick?.(item as HistoryItem)}
      />
    </div>
  );
};

export default App;
