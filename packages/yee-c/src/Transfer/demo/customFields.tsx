import type { DataSource, Key } from '@rainbow-oh/yee-c';
import { Transfer } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

const dataSource: DataSource[] = [
  { key: '1', label: '', name: 'Option 1', desc: 'Description 1' },
  { key: '2', label: '', name: 'Option 2', desc: 'Description 2' },
  { key: '3', label: '', name: 'Option 3', desc: 'Description 3' },
  { key: '4', label: '', name: 'Option 4', desc: 'Description 4' },
  { key: '5', label: '', name: 'Option 5', desc: 'Description 5' },
];

export default () => {
  const [targetKeys, setTargetKeys] = useState<Key[]>(['1', '2']);

  return (
    <Transfer
      dataSource={dataSource}
      targetKeys={targetKeys}
      onChange={(keys: Key[]) => setTargetKeys(keys)}
      titles={['Source', 'Target']}
      rowLabel="name"
    />
  );
};
