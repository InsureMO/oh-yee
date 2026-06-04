import { Cascader } from '@oh/yee-c';
import React from 'react';

export default () => {
  const options = [
    {
      code: 'zhejiang',
      name: 'Zhejiang',
      items: [
        {
          code: 'hangzhou',
          name: 'Hangzhou',
          items: [
            {
              code: 'xihu',
              name: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      code: 'jiangsu',
      name: 'Jiangsu',
      items: [
        {
          code: 'nanjing',
          name: 'Nanjing',
          items: [
            {
              code: 'zhonghuamen',
              name: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

  const fieldNames = {
    label: 'name',
    value: 'code',
    children: 'items',
  };

  const onChange = (value: any, selectedOptions: any) => {
    console.log(value, selectedOptions);
  };

  return (
    <Cascader
      fieldNames={fieldNames}
      options={options as any}
      onChange={onChange}
      placeholder="Please select"
      style={{ width: '300px' }}
    />
  );
};
