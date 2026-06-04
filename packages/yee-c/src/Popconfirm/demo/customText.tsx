import { Button, Popconfirm } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Popconfirm
      title="Are you sure to submit?"
      description="It will enter the review process after submission"
      confirmText="Submit"
      cancelText="Cancel"
      onConfirm={() => console.log('Submitted')}
      onCancel={() => console.log('Canceled')}
    >
      <Button type="primary">Submit</Button>
    </Popconfirm>
  );
};
