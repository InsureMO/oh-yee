import type { Key } from '@rainbow-oh/yee-c';
import { Transfer } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

const dataSource = Array.from({ length: 20 }, (_, i) => ({
  key: `${i + 1}`,
  label: `Option ${i + 1}`,
}));

export default () => {
  const [targetKeys, setTargetKeys] = useState<Key[]>(['1', '2', '3']);

  return (
    <Transfer
      dataSource={dataSource}
      targetKeys={targetKeys}
      onChange={(keys: Key[]) => setTargetKeys(keys)}
      titles={['Source', 'Target']}
      pagination={{ pageSize: 5, total: 20 }}
    />
  );
};
