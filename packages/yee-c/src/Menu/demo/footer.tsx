import React, { useState } from 'react';
import { Aperture, AudioLines, PanelLeftClose, PanelLeftOpen, Settings } from 'lucide-react';
import { Menu, Space } from '@oh/yee-c';

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
      label: 'Settings',
      icon: <Settings size={16} />,
    },
  ];

  return (
    <div>
      <Menu
        items={items}
        mode="inline"
        style={{height: 300, backgroundColor: '#eee'}}
        inlineCollapsed={collapsed}
        footer={
          <Space
            style={{ padding: '8px 16px', cursor: 'pointer', color: '#666', alignItems: 'center' }}
            gap={4}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            {!collapsed && 'Collapse Menu'}
          </Space>
        }
      />
    </div>
  );
};
