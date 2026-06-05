import type { Key } from '@rainbow-oh/yee-c';
import { Transfer } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

const dataSource = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { key: '3', label: 'Option 3' },
  { key: '4', label: 'Option 4' },
  { key: '5', label: 'Option 5' },
];

export default () => {
  const [targetKeys, setTargetKeys] = useState<Key[]>(['1']);

  return (
    <Transfer
      dataSource={dataSource}
      targetKeys={targetKeys}
      onChange={(keys: Key[]) => setTargetKeys(keys)}
      titles={['Source', 'Target']}
      oneWay
    />
  );
};
