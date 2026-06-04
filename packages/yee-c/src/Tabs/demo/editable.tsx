import { Tabs } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const initialItems = [
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];

  const [items, setItems] = useState(initialItems);
  const [activeKey, setActiveKey] = useState('1');

  const onEdit = (type: 'add' | 'remove', key?: string | number) => {
    if (type === 'add') {
      const newActiveKey = `${items.length + 1}`;
      const newItems = [
        ...items,
        {
          key: newActiveKey,
          label: `New Tab ${items.length + 1}`,
          children: `Content of New Tab ${items.length + 1}`,
        },
      ];
      setItems(newItems);
      setActiveKey(newActiveKey);
    } else if (type === 'remove' && key) {
      const newItems = items.filter((item) => item.key !== key);
      setItems(newItems);
      if (key === activeKey && newItems.length > 0) {
        setActiveKey(newItems[0].key);
      }
    }
  };

  return (
    <Tabs
      activeKey={activeKey}
      items={items}
      type="editable-card"
      onEdit={onEdit}
      onChange={(key) => setActiveKey(key as string)}
    />
  );
};
