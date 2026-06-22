import { Button, Space, Tour } from '@rainbow-oh/yee-c';
import React, { useRef, useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  const farRef = useRef<HTMLDivElement>(null);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button type="primary" onClick={() => setOpen(true)}>
        开始引导（自动滚动定位）
      </Button>

      <div
        style={{
          height: 600,
          padding: 24,
          background: 'var(--yee-color-bg-layout)',
          borderRadius: 8,
          color: '#999',
        }}
      >
        ↓ 目标在下方，切换步骤时引导会自动滚动定位
      </div>

      <div ref={farRef} style={{ display: 'inline-block' }}>
        <Button>远处的目标</Button>
      </div>

      <Tour
        open={open}
        onClose={() => setOpen(false)}
        onFinish={() => setOpen(false)}
        steps={[
          {
            target: () => farRef.current,
            title: '滚动定位',
            description: '切换到这一步时，目标会自动滚动到视口内。',
          },
          {
            target: '#tour-nonexistent-target',
            title: '目标不存在',
            description: '找不到目标元素时，卡片居中显示（无高亮）。',
          },
        ]}
      />
    </Space>
  );
};
