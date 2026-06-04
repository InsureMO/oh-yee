import React from 'react';
import Search from '../index';

export default () => {
  const onSearch = (value: string) => {
    console.log('search value:', value);
  };

  return (
    <div style={{ width: 300 }}>
      <Search placeholder="input search text" allowClear onSearch={onSearch} />
    </div>
  );
};