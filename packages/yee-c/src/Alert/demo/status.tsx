import React from 'react';
import { Alert } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <>
      <Alert description="This is an info alert" status="info" />
      <br />
      <Alert description="This is a success alert" status="success" />
      <br />
      <Alert description="This is a warning alert" status="warning" />
      <br />
      <Alert description="This is an error alert" status="error" />
    </>
  );
};