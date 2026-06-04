import { Button, Popconfirm } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Popconfirm
      title="确定要提交吗？"
      description="提交后将进入审核流程"
      confirmText="提交"
      cancelText="取消"
      onConfirm={() => console.log('Submitted')}
      onCancel={() => console.log('Canceled')}
    >
      <Button type="primary">提交</Button>
    </Popconfirm>
  );
};
