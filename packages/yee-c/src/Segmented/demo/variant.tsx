import { Segmented, Space } from '@rainbow-oh/yee-c';
import { LayoutGrid, List } from 'lucide-react';
import React from 'react';

export default () => (
  <Space direction="vertical">
    <Space block>
      <Segmented options={['Daily', 'Weekly', 'Monthly']} />
      <Segmented variant="pill" options={['Daily', 'Weekly', 'Monthly']} />
    </Space>
    <Space block>
      <Segmented variant="pill" size="small" options={['Small', 'Default', 'Large']} />
      <Segmented variant="pill" size="large" options={['Small', 'Default', 'Large']} />
    </Space>
    <div style={{ width: 480 }}>
      <Segmented
        variant="pill"
        block
        defaultValue="list"
        options={[
          { label: 'List', value: 'list', icon: <List size={16} /> },
          { label: 'Grid', value: 'grid', icon: <LayoutGrid size={16} /> },
          { label: 'Detail', value: 'detail' },
        ]}
      />
    </div>
  </Space>
);
