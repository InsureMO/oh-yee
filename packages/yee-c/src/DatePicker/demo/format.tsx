import { DatePicker } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <DatePicker placeholder="Select date" format="YYYY/MM/DD" />
      {/* <DatePicker.RangePicker placeholder={['Start date', 'End date']} format="YYYY/MM/DD" /> */}
    </div>
  );
};
