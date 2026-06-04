import { Ellipsis } from '@oh/yee-c';
import React from 'react';

const longText = `yee-c 是一个 React UI 组件库。antd 的目标是使用 React 封装一套高质量的、功能丰富的、可定制的、可扩展的、可访问性友好的企业级组件库。antd 是一个 React UI 组件库。antd 的目标是使用 React 封装一套高质量的、功能丰富的、可定制的、可扩展的、可访问性友好的企业级组件库。`;

export default () => {
  return (
    <div>
      <h3>默认展开</h3>
      <Ellipsis 
        lines={3}
        defaultExpanded
      >
        {longText}
      </Ellipsis>
    </div>
  );
};
