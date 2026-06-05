import type { Key } from '@rainbow-oh/yee-c';
import { Transfer } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

const dataSource = [
  { key: '1', label: 'Apple' },
  { key: '2', label: 'Banana' },
  { key: '3', label: 'Orange' },
  { key: '4', label: 'Pear' },
  { key: '5', label: 'Grape' },
];

export default () => {
  const [targetKeys, setTargetKeys] = useState<Key[]>(['1', '2']);

  return (
    <Transfer
      dataSource={dataSource}
      targetKeys={targetKeys}
      onChange={(keys: Key[]) => setTargetKeys(keys)}
      titles={['Source', 'Target']}
      searchable
    />
  );
};
