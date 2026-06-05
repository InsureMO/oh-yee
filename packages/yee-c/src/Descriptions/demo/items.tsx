import type { DescriptionsProps } from '@rainbow-oh/yee-c';
import { Descriptions } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const items: DescriptionsProps['items'] = [
    { key: '1', label: 'UserName', children: 'Zhou Maomao' },
    { key: '2', label: 'Telephone', children: '18100000000' },
    { key: '3', label: 'Live', children: 'Hangzhou, Zhejiang' },
    {
      key: '4',
      label: 'Address',
      children: 'No. 18, Wantang Road, Xihu District',
    },
  ];

  return <Descriptions title="User Info (items)" items={items} />;
};
