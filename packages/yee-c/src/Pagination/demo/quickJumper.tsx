import { Pagination } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [current, setCurrent] = useState(1);

  return (
    <Pagination
      showQuickJumper
      current={current}
      total={50}
      onChange={({ current }) => setCurrent(current)}
    />
  );
};
