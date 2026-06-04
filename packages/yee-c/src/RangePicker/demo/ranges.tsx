import dayjs, { Dayjs } from 'dayjs';
import { RangePicker } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<[string, string]>();

  const ranges = {
    Today: [dayjs(), dayjs()],
    'Last 7 Days': [dayjs().subtract(6, 'day'), dayjs()],
    'Last 30 Days': [dayjs().subtract(29, 'day'), dayjs()],
    'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
    'Last Month': [
      dayjs().subtract(1, 'month').startOf('month'),
      dayjs().subtract(1, 'month').endOf('month'),
    ],
    'This Year': [dayjs().startOf('year'), dayjs().endOf('year')],
  } as Record<string, [Dayjs, Dayjs]>;

  return (
    <div style={{ padding: '20px' }}>
      <RangePicker
        value={value}
        ranges={ranges}
        onChange={(dates, dateStrings) => {
          console.log('Selected dates:', dates);
          setValue(dates as [string, string]);
        }}
        placeholder={['Start date', 'End date']}
      />
    </div>
  );
};
