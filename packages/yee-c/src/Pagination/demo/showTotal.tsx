import { Pagination } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [current, setCurrent] = useState(1);

  return (
    <Pagination
      showTotal={(total, current) => `Page ${current}, Total ${total} items`}
      current={current}
      total={50}
      onChange={({ current }) => setCurrent(current)}
    />
  );
};
