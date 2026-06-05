import { RangePicker } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

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
