import { RangePicker } from '@rainbow-oh/yee-c';
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
        <div style={{ marginBottom: '8px', color: '#666' }}>
          Clearable (default)
        </div>
        <RangePicker
          value={value1}
          onChange={(dates) => setValue1(dates)}
          onClear={() => console.log('Cleared')}
          placeholder={['Start date', 'End date']}
        />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>Not clearable</div>
        <RangePicker
          value={value2}
          allowClear={false}
          onChange={(dates) => setValue2(dates)}
          placeholder={['Start date', 'End date']}
        />
      </div>
    </div>
  );
};
