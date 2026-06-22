import { Button, Space, Tour } from '@rainbow-oh/yee-c';
import React, { useRef, useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);

  return (
    <Space direction="vertical">
      <Space>
        <div ref={aRef} style={{ display: 'inline-block' }}>
          <Button>导入</Button>
        </div>
        <div ref={bRef} style={{ display: 'inline-block' }}>
          <Button>筛选</Button>
        </div>
        <Button type="primary" onClick={() => setOpen(true)}>
          开始
        </Button>
      </Space>

      <Tour
        open={open}
        onClose={() => setOpen(false)}
        onFinish={() => setOpen(false)}
        indicatorsRender={(current, total) => (
          <>
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  marginInlineEnd: 4,
                  borderRadius: '50%',
                  background:
                    i === current
                      ? 'var(--yee-primary-color)'
                      : 'var(--yee-border-color)',
                  transition: 'background 0.2s',
                }}
              />
            ))}
          </>
        )}
        steps={[
          {
            target: () => aRef.current,
            title: '导入',
            description: '点击此处导入数据文件。',
          },
          {
            target: () => bRef.current,
            title: '筛选',
            description: '在这里筛选你需要的数据。',
          },
        ]}
      />
    </Space>
  );
};
