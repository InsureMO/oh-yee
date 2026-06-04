import { Cascader } from '@oh/yee-c';
import React from 'react';

export default () => {
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
            {
              value: 'binjiang',
              label: 'Bin Jiang',
            },
          ],
        },
        {
          value: 'ningbo',
          label: 'Ningbo',
          children: [
            {
              value: 'jiangbei',
              label: 'Jiang Bei',
            },
            {
              value: 'jiangdong',
              label: 'Jiang Dong',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

  const onChange = (value: any, selectedOptions: any) => {
    console.log(value, selectedOptions);
  };

  return (
    <Cascader
      options={options}
      onChange={onChange}
      placeholder="Please select"
      multiple
      style={{ width: '300px' }}
    />
  );
};
