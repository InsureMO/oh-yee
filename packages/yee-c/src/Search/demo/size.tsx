import React from 'react';
import Search from '../index';

export default () => {
  const onSearch = (value: string) => {
    console.log('search value:', value);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}
    >
      <Search placeholder="small size" size="small" onSearch={onSearch} />
      <Search placeholder="default size" onSearch={onSearch} />
      <Search placeholder="large size" size="large" onSearch={onSearch} />
    </div>
  );
};
