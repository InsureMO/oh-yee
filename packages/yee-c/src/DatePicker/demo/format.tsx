import React from 'react';
import { DatePicker } from '@oh/yee-c';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <DatePicker placeholder="Select date" format="YYYY/MM/DD" />
      {/* <DatePicker.RangePicker placeholder={['Start date', 'End date']} format="YYYY/MM/DD" /> */}
    </div>
  );
};
