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

  return (
    <div>
      <Cascader
        options={options}
        placeholder="Large Size"
        style={{ width: '300px', marginBottom: '10px' }}
      />
      <br />
      <Cascader
        options={options}
        placeholder="Default Size"
        style={{ width: '300px', marginBottom: '10px' }}
      />
      <br />
      <Cascader
        options={options}
        placeholder="Small Size"
        style={{ width: '300px' }}
      />
    </div>
  );
};
