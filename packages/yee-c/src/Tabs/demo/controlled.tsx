import { Button, Space, Tabs } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [activeKey, setActiveKey] = useState('1');

  const items = [
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

  const handleChange = (key: string | number) => {
    setActiveKey(key as string);
  };

  const handlePrev = () => {
    const currentIndex = items.findIndex((item) => item.key === activeKey);
    if (currentIndex > 0) {
      setActiveKey(items[currentIndex - 1].key);
    }
  };

  const handleNext = () => {
    const currentIndex = items.findIndex((item) => item.key === activeKey);
    if (currentIndex < items.length - 1) {
      setActiveKey(items[currentIndex + 1].key);
    }
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={handlePrev}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </Space>

      <Tabs activeKey={activeKey} items={items} onChange={handleChange} />
    </>
  );
};
