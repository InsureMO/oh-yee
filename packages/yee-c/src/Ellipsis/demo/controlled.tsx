import { Ellipsis } from '@oh/yee-c';
import React, { useState } from 'react';

const longText = `yee-c 是一个 React UI 组件库。antd 的目标是使用 React 封装一套高质量的、功能丰富的、可定制的、可扩展的、可访问性友好的企业级组件库。antd 是一个 React UI 组件库。antd 的目标是使用 React 封装一套高质量的、功能丰富的、可定制的、可扩展的、可访问性友好的企业级组件库。`;

export default () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <h3>受控模式</h3>
      <Ellipsis 
        lines={3}
        expanded={expanded}
        onExpand={setExpanded}
      >
        {longText}
      </Ellipsis>
      <p style={{ marginTop: 8 }}>
        当前状态: {expanded ? '已展开' : '已收起'}
      </p>
    </div>
  );
};
