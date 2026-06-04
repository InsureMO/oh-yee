import { Dayjs } from 'dayjs';
import { DatePicker } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState<Dayjs>();

  const onChange = (date: string, dateString?: Dayjs) => {
    console.log(date, dateString);
    setValue(dateString);
  };

  return (
    <DatePicker value={value} onChange={onChange} placeholder="Select date" />
  );
};
