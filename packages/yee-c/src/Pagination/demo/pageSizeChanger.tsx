import { Pagination } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <Pagination
      showSizeChanger
      pageSizeOptions={[5, 10, 20, 50]}
      current={current}
      pageSize={pageSize}
      total={100}
      onChange={({ current, pageSize }) => {
        setCurrent(current);
        setPageSize(pageSize);
      }}
    />
  );
};
