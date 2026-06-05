import { Input, Space, Watermark } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [text, setText] = useState('Yee Design');

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Input
        placeholder="Enter watermark text"
        value={text}
        onChange={(e) => setText(e)}
        style={{ width: 300 }}
      />
      <Watermark content={text}>
        <div style={{ height: 500, padding: 20, background: '#f5f5f5' }}>
          <h2>Dynamic Watermark</h2>
          <p>
            Type in the input box above and the watermark will update in real
            time.
          </p>
        </div>
      </Watermark>
    </Space>
  );
};
