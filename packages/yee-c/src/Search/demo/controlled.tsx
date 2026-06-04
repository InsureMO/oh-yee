import React, { useState } from 'react';
import Search from '../index';

export default () => {
  const [value, setValue] = useState('react');
  
  const onSearch = (searchValue: string) => {
    console.log('search value:', searchValue);
  };

  const onChange = (searchValue: string) => {
    console.log('change value:', searchValue);
    setValue(searchValue);
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