import { Cascader } from '@rainbow-oh/yee-c';
import React from 'react';
import type { Option } from '../interface';

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

  const onChange = (
    value: Array<Array<string | number>> | Array<string | number> | undefined,
    selectedOptions: Option[],
  ) => {
    console.log(value, selectedOptions);
  };

  return (
    <Cascader
      fieldNames={fieldNames}
      options={options as unknown as Option[]}
      onChange={onChange}
      placeholder="Please select"
      style={{ width: '300px' }}
    />
  );
};
