import React from 'react';
import { Search } from '@rainbow-oh/yee-c';

export default () => {
  const onSearch = (value: string) => {
    console.log('search value:', value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Search placeholder="input search text" onSearch={onSearch} />
      <Search placeholder="input search text" onSearch={onSearch} />
    </div>
  );
};