import { Cascader } from '@rainbow-oh/yee-c';
import React from 'react';
import type { Option } from '../interface';

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

  const onChange = (
    value: Array<Array<string | number>> | Array<string | number> | undefined,
    selectedOptions: Option[],
  ) => {
    console.log(value, selectedOptions);
  };

  return (
    <Cascader
      options={options}
      onChange={onChange}
      placeholder="Please select"
      style={{ width: '300px' }}
    />
  );
};
