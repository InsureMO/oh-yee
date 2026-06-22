import { Segmented } from '@rainbow-oh/yee-c';
import { LayoutGrid, List } from 'lucide-react';
import React from 'react';

export default () => (
  <div style={{ width: 480 }}>
    <Segmented
      block
      defaultValue="list"
      options={[
        { label: 'List', value: 'list', icon: <List size={16} /> },
        { label: 'Grid', value: 'grid', icon: <LayoutGrid size={16} /> },
        { label: 'Detail', value: 'detail' },
      ]}
    />
  </div>
);
