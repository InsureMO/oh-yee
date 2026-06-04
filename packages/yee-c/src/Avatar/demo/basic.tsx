import React from 'react';
import { Avatar } from '@oh/yee-c';

export default () => {
  return (
    <>
      <Avatar size="small" icon="A" />
      <Avatar />
      <Avatar size="large" icon="B" />
      <br />
      <br />
      <Avatar shape="square" size="small" icon="C" />
      <Avatar shape="square" icon="D" />
      <Avatar shape="square" size="large" icon="E" />
    </>
  );
};
