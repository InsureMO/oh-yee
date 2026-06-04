import { RangePicker } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<[string, string]>();

  return (
    <div style={{ padding: '20px' }}>
      <RangePicker
        value={value}
        onChange={(dates, dateStrings) => {
          console.log('选中的日期:', dates);
          console.log('格式化后:', dateStrings);
          setValue(dates as [string, string]);
        }}
        placeholder={['开始日期', '结束日期']}
      />
    </div>
  );
};
