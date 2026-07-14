import { Box, Tabs } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
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
    <Box
      style={{
        padding: 16,
        backgroundColor: '#efefef',
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={items}
        type="card"
        styles={{
          content: {
            padding: 24,
            height: 120,
          },
        }}
      />
    </Box>
  );
};
