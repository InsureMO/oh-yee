import { Menu } from '@oh/yee-c';
import React, { useState } from 'react';
import { Aperture, AudioLines, Settings } from 'lucide-react';

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: '1',
      label: 'Navigation One',
      icon: <Aperture size={16} />,
    },
    {
      key: '2',
      label: 'Navigation Two',
      icon: <AudioLines size={16} />,
    },
    {
      key: '3',
      label: 'Navigation Three',
      icon: <Settings size={16} />,
      children: [
        { key: '3-1', label: 'Option 1' },
        { key: '3-2', label: 'Option 2' },
      ],
    },
    {
      key: '4',
      label: 'No Icon Item',
    },
  ];

  return (
    <div>
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{ marginBottom: 16, padding: '4px 12px', cursor: 'pointer' }}
      >
        {collapsed ? '展开' : '折叠'}
      </button>
      <Menu
        items={items}
        mode="inline"
        inlineCollapsed={collapsed}
        onSelect={({ key }) => console.log('selected', key)}
      />
    </div>
  );
};
