import { Steps } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [current, setCurrent] = useState(1);

  const onChange = (current: number) => {
    console.log('onChange:', current);
    setCurrent(current);
  };

  return (
    <div style={{ height: 300 }}>
      <Steps
        direction="vertical"
        current={current}
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
            title: 'Waiting',
            description: 'This is a description.',
          },
        ]}
      />
    </div>
  );
};
