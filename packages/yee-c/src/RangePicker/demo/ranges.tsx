import dayjs, { Dayjs } from 'dayjs';
import { RangePicker } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<[string, string]>();

  const ranges = {
    今天: [dayjs(), dayjs()],
    最近7天: [dayjs().subtract(6, 'day'), dayjs()],
    最近30天: [dayjs().subtract(29, 'day'), dayjs()],
    本月: [dayjs().startOf('month'), dayjs().endOf('month')],
    上月: [
      dayjs().subtract(1, 'month').startOf('month'),
      dayjs().subtract(1, 'month').endOf('month'),
    ],
    本年: [dayjs().startOf('year'), dayjs().endOf('year')],
  } as Record<string, [Dayjs, Dayjs]>;

  return (
    <div style={{ padding: '20px' }}>
      <RangePicker
        value={value}
        ranges={ranges}
        onChange={(dates, dateStrings) => {
          console.log('选中的日期:', dates);
          setValue(dates as [string, string]);
        }}
        placeholder={['开始日期', '结束日期']}
      />
    </div>
  );
};
