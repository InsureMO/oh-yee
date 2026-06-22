import { Button, Space, Tour } from '@rainbow-oh/yee-c';
import React, { useRef, useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  const startRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  return (
    <Space direction="vertical">
      <Space>
        <div ref={startRef} style={{ display: 'inline-block' }}>
          <Button type="primary" onClick={() => setOpen(true)}>
            开始引导
          </Button>
        </div>
        <div ref={midRef} style={{ display: 'inline-block' }}>
          <Button>导出</Button>
        </div>
        <div ref={endRef} style={{ display: 'inline-block' }}>
          <Button>设置</Button>
        </div>
      </Space>

      <Tour
        open={open}
        onClose={() => setOpen(false)}
        onFinish={() => setOpen(false)}
        steps={[
          {
            target: () => startRef.current,
            title: '欢迎使用',
            description: '点击此处开始你的操作流程。',
          },
          {
            target: () => midRef.current,
            title: '导出数据',
            description: '在这里可以将数据导出为文件。',
            placement: 'bottom',
          },
          {
            target: () => endRef.current,
            title: '系统设置',
            description: '配置系统参数。点击「完成」结束引导。',
            placement: 'left',
          },
        ]}
      />
    </Space>
  );
};
