import { DatePicker, RangePicker } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <DatePicker placeholder="Select date" disabled />
      <RangePicker placeholder={['Start date', 'End date']} disabled />
    </div>
  );
};
