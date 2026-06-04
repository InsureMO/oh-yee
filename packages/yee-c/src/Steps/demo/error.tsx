import { Steps } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [current, setCurrent] = useState(2);

  const onChange = (current: number) => {
    console.log('onChange:', current);
    setCurrent(current);
  };

  return (
    <Steps
      current={current}
      status="error"
      onChange={onChange}
      items={[
        {
          title: 'Finished',
          description: 'This is a description.',
        },
        {
          title: 'In Progress',
          description: 'This is a description.',
        },
        {
          title: 'Error',
          description: 'This is a description.',
        },
      ]}
    />
  );
};
