import React, { useState } from 'react';
import { Menu, Radio, Space } from '@rainbow-oh/yee-c';

export default () => {
  const [mode, setMode] = useState<'vertical' | 'inline' | 'horizontal'>(
    'vertical',
  );

  const items = [
    {
      key: '1',
      label: 'Menu Item 1',
    },
    {
      key: '2',
      label: 'Menu Item 2',
    },
    {
      key: '3',
      label: 'Menu Item 3',
      children: [
        {
          key: '3-1',
          label: 'Sub Menu Item 3-1',
        },
        {
          key: '3-2',
          label: 'Sub Menu Item 3-2',
        },
      ],
    },
  ];

  return (
    <Space direction="vertical">
      <Radio.Group
        value={mode}
        onChange={(value) => setMode(value as 'vertical' | 'inline' | 'horizontal')}
        options={[
          { label: 'Vertical', value: 'vertical' },
          { label: 'Inline', value: 'inline' },
          { label: 'Horizontal', value: 'horizontal' },
        ]}
      />
      <Menu
        mode={mode}
        items={items}
        style={{ width: mode === 'horizontal' ? '100%' : 256 }}
      />
    </Space>
  );
};
