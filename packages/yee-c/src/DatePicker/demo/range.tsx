import React, { useState } from 'react';
import { RangePicker } from '@oh/yee-c';

export default () => {
  const [value, setValue] = useState<[string, string]>();

  return (
    <RangePicker
      value={value}
      onChange={(dates, dateStrings) => {
        console.log(dates, dateStrings);
        setValue(dates as [string, string]);
      }}
      placeholder={['Start date', 'End date']}
    />
  );
};
