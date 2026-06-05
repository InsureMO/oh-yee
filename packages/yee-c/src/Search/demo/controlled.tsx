import React, { useState } from 'react';
import Search from '../index';

export default () => {
  const [value] = useState('react');

  const onSearch = (searchValue: string) => {
    console.log('search value:', searchValue);
  };

  return (
    <div style={{ width: 300 }}>
      <Search
        placeholder="input search text"
        value={value}
        onSearch={onSearch}
      />
    </div>
  );
};
