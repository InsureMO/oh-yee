import { Ellipsis } from '@oh/yee-c';
import React from 'react';

const longText = `这是一段很长的文本内容，用于演示不同行数的省略效果。
yee-c 是一个 React UI 组件库，Ant Design 的目标是使用 React 封装一套高质量的、功能丰富的、可定制的、可扩展的、可访问性友好的企业级组件库。
yee-c 提供了一套完整的 UI 组件，包括按钮、表单、表格、菜单、模态框等等。
yee-c 的设计理念是让用户能够快速搭建出美观、功能完善的界面，同时保持代码的简洁和可维护性。`;

export default () => {
  return (
    <div>
      <h3>1 行</h3>
      <Ellipsis lines={1}>
        {longText}
      </Ellipsis>
      
      <h3 style={{ marginTop: 16 }}>2 行</h3>
      <Ellipsis lines={2}>
        {longText}
      </Ellipsis>
      
      <h3 style={{ marginTop: 16 }}>3 行</h3>
      <Ellipsis lines={3}>
        {longText}
      </Ellipsis>
      
      <h3 style={{ marginTop: 16 }}>5 行</h3>
      <Ellipsis lines={5}>
        {longText}
      </Ellipsis>
    </div>
  );
};
