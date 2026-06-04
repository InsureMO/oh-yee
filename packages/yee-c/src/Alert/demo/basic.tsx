import { Alert } from '@oh/yee-c';
import React from 'react';

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