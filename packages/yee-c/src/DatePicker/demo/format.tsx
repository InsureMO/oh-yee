import { DatePicker } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <DatePicker placeholder="Select date" format="YYYY/MM/DD" />
      <DatePicker
        placeholder="YYYY/MM/DDTHH:mm:ss"
        format="YYYY/MM/DDTHH:mm:ss"
      />
      <DatePicker placeholder="YYYY/MM/DDTHH:mm" format="YYYY/MM/DDTHH:mm" />
      <DatePicker placeholder="YYYY/MM/DDTHH" format="YYYY/MM/DDTHH" />
    </div>
  );
};
