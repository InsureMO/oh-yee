import React, { useState } from 'react';
import { Button, Collapse } from '@rainbow-oh/yee-c';

export default () => {
  const [activeKey, setActiveKey] = useState(['1']);

  const onChange = (key: unknown) => {
    console.log('Collapse changed to:', key);
    setActiveKey(Array.isArray(key) ? key : [key]);
  };

  return (
    <>
      <Button
        onClick={() => setActiveKey(activeKey.length === 0 ? ['1'] : [])}
        style={{ marginBottom: '10px' }}
      >
        {activeKey.length === 0 ? 'Expand first panel' : 'Collapse all'}
      </Button>
      <Collapse
        activeKey={activeKey}
        onChange={onChange}
        items={[
          {
            title: 'This is panel header 1',
            key: '1',
            children: <p>Content of panel 1</p>,
          },
          {
            title: 'This is panel header 2',
            key: '2',
            children: <p>Content of panel 2</p>,
          },
          {
            title: 'This is panel header 3',
            key: '3',
            children: <p>Content of panel 3</p>,
          },
        ]}
      />
    </>
  );
};
