import React, { useState } from 'react';
import { Highlight, Input, Space } from '@rainbow-oh/yee-c';

export default () => {
  const [searchText, setSearchText] = useState('');
  const text = "React is a JavaScript library for building user interfaces. React makes it painless to create interactive UIs.";

  const pattern = searchText ? new RegExp(`(${searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi') : null;

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div>
        <Input
          placeholder="Type to highlight matching text"
          value={searchText}
          onChange={(e) => setSearchText(e)}
          style={{ width: 300, marginBottom: 16 }}
        />
      </div>
      <div style={{ padding: 16, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
        {pattern ? (
          <Highlight text={text} pattern={pattern} />
        ) : (
          <span>{text}</span>
        )}
      </div>
    </Space>
  );
};
