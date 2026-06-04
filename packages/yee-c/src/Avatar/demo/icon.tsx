import React from 'react';
import { Avatar } from '@oh/yee-c';

export default () => {
  return (
    <>
      <Avatar icon="user" />
      <br />
      <br />
      <Avatar icon="U" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} />
      <br />
      <br />
      <Avatar icon="user" style={{ backgroundColor: '#87d068' }} />
    </>
  );
};
