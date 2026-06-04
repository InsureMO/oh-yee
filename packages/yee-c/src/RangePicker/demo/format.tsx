import { RangePicker } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value1, setValue1] = useState<[string, string]>();
  const [value2, setValue2] = useState<[string, string]>();
  const [value3, setValue3] = useState<[string, string]>();

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
          Default format (YYYY/MM/DD)
        </div>
        <RangePicker
          value={value1}
          onChange={(dates) => {
            console.log('Formatted value:', dates);
            setValue1(dates as [string, string]);
          }}
          placeholder={['Start date', 'End date']}
        />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>
          Custom format (YYYY-MM-DD)
        </div>
        <RangePicker
          value={value2}
          format="YYYY-MM-DD"
          saveFormat="YYYY-MM-DD"
          onChange={(dates) => {
            console.log('Formatted value:', dates);
            setValue2(dates as [string, string]);
          }}
          placeholder={['Start date', 'End date']}
        />
      </div>

      <div>
        <div style={{ marginBottom: '8px', color: '#666' }}>
          Display format (YYYY/MM/DD)
        </div>
        <RangePicker
          value={value3}
          format="YYYY/MM/DD"
          saveFormat="YYYY-MM-DD"
          onChange={(dates) => {
            console.log('Formatted value:', dates);
            setValue3(dates as [string, string]);
          }}
          placeholder={['Start date', 'End date']}
        />
      </div>
    </div>
  );
};
