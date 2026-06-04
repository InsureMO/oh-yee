import React from 'react';
import { Alert } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <>
      <Alert
        description="This is a banner alert for important announcements"
        banner
        closable
      />
      <br />
      <Alert
        description="System maintenance scheduled for tonight from 10 PM to 2 AM"
        banner
        status="warning"
        closable
      />
    </>
  );
};