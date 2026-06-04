import { Pagination } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [current, setCurrent] = useState(1);

  return (
    <Pagination
      showTotal={(total, current) => `第 ${current} 页，共 ${total} 条`}
      current={current}
      total={50}
      onChange={({ current }) => setCurrent(current)}
    />
  );
};
