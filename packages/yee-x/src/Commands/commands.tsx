import { Menu, Trigger, useMergedState } from '@rainbow-oh/yee-c';
import React, { FC, useMemo, useState } from 'react';
import { CommandsProps } from './interface';

const Commands: FC<CommandsProps> = (props) => {
  const {
    prefixCls = 'yee-commands',
    items,
    open,
    onSelect,
    onOpenChange,
    children,
  } = props;

  const [mergedOpen, setMergedOpen] = useMergedState(false, { value: open });
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [searchValue] = useState('');

  const keys = Object.keys(items);
  const filtered = useMemo(() => {
    if (!selectedKey) {
      return [];
    }
    let selectedItems = items[selectedKey];

    if (searchValue) {
      const lower = searchValue.toLowerCase();
      selectedItems = selectedItems.filter((item) => {
        if (typeof item.label === 'string') {
          return item.label.toLowerCase().includes(lower);
        }
        return item;
      });
    }
    return selectedItems;
  }, [selectedKey, searchValue, items]);

  const handleSelect = (params: any) => {
    onSelect?.(params);
    // Close the panel if a menu item was clicked
    if (params.event.type === 'click') {
      setMergedOpen(false);
    }
  };

  const onTrigger = (key?: string) => {
    let open = false;
    if (key && keys.includes(key)) {
      open = true;
      setMergedOpen(true);
      setSelectedKey(key);
    }
    setMergedOpen(open);
    onOpenChange?.(open);
  };

  // Handle keyboard navigation (up/down) and Enter selection
  const onKeyDown = (event: KeyboardEvent) => {
    // Resolve conflict between input Enter (send) and menu Enter (select)
    if (event.key === 'Enter') {
      event.preventDefault();
      setMergedOpen(false);
      return false;
    }
  };

  if (typeof children !== 'function') {
    return null;
  }

  const renderPopup = ({ open }: { open: boolean }) => {
    return (
      <Menu
        keyboard={open}
        mode="vertical"
        items={filtered}
        onSelect={handleSelect}
      />
    );
  };

  const trigger = children({
    onTrigger,
    onKeyDown: mergedOpen ? onKeyDown : undefined,
  });

  return (
    <Trigger
      placement="topLeft"
      open={mergedOpen}
      popup={renderPopup({ open: mergedOpen })}
    >
      <div className={`${prefixCls}`}>{trigger}</div>
    </Trigger>
  );
};

export default Commands;
