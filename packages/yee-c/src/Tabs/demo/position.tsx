import { Radio, Space, Tabs } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');

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

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Radio.Group
          value={position}
          onChange={(e) => setPosition(e as 'top' | 'bottom' | 'left' | 'right')}
          style={{ marginBottom: 16 }}
          options={[
            { value: 'top', label: 'Top' },
            { value: 'bottom', label: 'Bottom' },
            { value: 'left', label: 'Left' },
            { value: 'right', label: 'Right' },
          ]}
        >
        </Radio.Group>

        <Tabs defaultActiveKey="1" items={items} position={position} />
      </Space>
    </>
  );
};
