import React from 'react';
import { Alert } from '@oh/yee-c';

export default () => {
  return (
    <>
      <Alert title="Message title" description="This is a basic alert description" />
      <br />
      <Alert description="This is a closable alert description" closable />
      <br />
      <Alert description="This is an alert with title" title="Alert Title" />
    </>
  );
};