import { Button, Space, Switch } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [disabled, setDisabled] = useState(true);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  return (
    <>
      <Space>
        <Switch disabled={disabled} />
        <Switch disabled={disabled} checked />
      </Space>
      <br />
      <Button onClick={toggleDisabled} style={{ marginTop: 16 }}>
        Toggle disabled
      </Button>
    </>
  );
};
