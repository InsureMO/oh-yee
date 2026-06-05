import { Menu } from '@rainbow-oh/yee-c';
import { Aperture, AudioLines, Settings } from 'lucide-react';
import React, { useState } from 'react';

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
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        style={{ marginBottom: 16, padding: '4px 12px', cursor: 'pointer' }}
      >
        {collapsed ? 'Expand' : 'Collapse'}
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
