import { Select, Space } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
];

// Inline style applied to an orphan value (a value not present in options)
const orphanStyle: React.CSSProperties = {
  color: '#fa8c16',
  fontStyle: 'italic',
  textDecoration: 'underline dotted',
};

export default () => {
  // 'mangox' is not in options → rendered as an orphan value
  const [single, setSingle] = useState('mangox');
  // 'durian' is not in options → rendered as an orphan tag alongside normal ones
  const [multi, setMulti] = useState(['apple', 'durian', 'banana']);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div>
        <div style={{ marginBottom: 8 }}>
          Single — orphan value styled via <code>orphanStyle</code>
        </div>
        <Select
          value={single}
          onChange={(val) => setSingle(val as string)}
          options={options}
          orphanStyle={orphanStyle}
          style={{ width: 300 }}
          placeholder="Please select"
        />
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>
          Multiple — orphan tag styled via <code>orphanClassName</code>
        </div>
        <Select
          mode="multiple"
          value={multi}
          onChange={(val) => setMulti(val as string[])}
          options={options}
          orphanClassName="demo-orphan-tag"
          style={{ width: 300 }}
          placeholder="Please select"
        />
      </div>
      <style>{`
        .demo-orphan-tag {
          color: #fa541c;
          font-style: italic;
        }
      `}</style>
    </Space>
  );
};
