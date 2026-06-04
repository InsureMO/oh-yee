import React from 'react';
import { DatePicker } from '@oh/yee-c';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <DatePicker placeholder="Select week" picker="week" />
      <DatePicker placeholder="Select month" picker="month" />
      <DatePicker placeholder="Select quarter" picker="quarter" />
      <DatePicker placeholder="Select year" picker="year" />
    </div>
  );
};
