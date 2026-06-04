import { RangePicker } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value1, setValue1] = useState(['2024/01/01', '2024/01/31']);
  const [value2, setValue2] = useState(['2024/01/01', '2024/01/31']);

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>可清除（默认）</div>
        <RangePicker
          value={value1}
          onChange={(dates) => setValue1(dates)}
          onClear={() => console.log('已清除')}
          placeholder={['开始日期', '结束日期']}
        />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>不可清除</div>
        <RangePicker
          value={value2}
          allowClear={false}
          onChange={(dates) => setValue2(dates)}
          placeholder={['开始日期', '结束日期']}
        />
      </div>
    </div>
  );
};
