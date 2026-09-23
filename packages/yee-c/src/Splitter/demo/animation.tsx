import { Button, Splitter } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <Button type="primary" onClick={() => setOpen((v) => !v)}>
          {open ? 'Close Panel' : 'Open Panel'}
        </Button>
      </div>
      <div style={{ height: 300 }}>
        <Splitter animation>
          <Splitter.Item min="30%">
            <div style={{ padding: 16, backgroundColor: '#f0f0f0' }}>Content Panel</div>
          </Splitter.Item>
          {open ? (
            // 条件渲染的面板：挂载时从 0 展开到目标尺寸，卸载时过渡收合到 0 后移除
            <Splitter.Item size="40%" min="200px" max="60%">
              <div style={{ padding: 16, backgroundColor: '#e0e0e0' }}>Assistant Panel</div>
            </Splitter.Item>
          ) : null}
        </Splitter>
      </div>
    </div>
  );
};
