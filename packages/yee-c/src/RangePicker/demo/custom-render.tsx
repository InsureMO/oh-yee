import { RangePicker } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<[string, string]>();

  return (
    <div style={{ padding: '20px' }}>
      <RangePicker
        value={value}
        onChange={(dates) => setValue(dates as [string, string])}
        placeholder={['Start date', 'End date']}
        separator={
          <span style={{ color: '#1890ff', fontWeight: 'bold' }}>to</span>
        }
      />
    </div>
  );
};
