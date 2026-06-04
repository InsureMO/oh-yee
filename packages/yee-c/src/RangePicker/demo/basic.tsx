import { RangePicker } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<[string, string]>();

  return (
    <div style={{ padding: '20px' }}>
      <RangePicker
        value={value}
        onChange={(dates, dateStrings) => {
          console.log('Selected dates:', dates);
          console.log('Formatted:', dateStrings);
          setValue(dates as [string, string]);
        }}
        placeholder={['Start date', 'End date']}
      />
    </div>
  );
};
