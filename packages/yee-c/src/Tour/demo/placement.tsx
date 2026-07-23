import { Button, Space, Tour } from '@rainbow-oh/yee-c';
import React, { useRef, useState } from 'react';

const placements = ['top', 'right', 'bottom', 'left'] as const;
type P = (typeof placements)[number];

export default () => {
  const [open, setOpen] = useState(false);
  const [p, setP] = useState<P>('top');
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <Space direction="vertical">
      <Space>
        {placements.map((pl) => (
          <Button
            key={pl}
            type={p === pl ? 'primary' : 'default'}
            onClick={() => {
              setP(pl);
              setOpen(true);
            }}
          >
            {pl}
          </Button>
        ))}
      </Space>

      <div
        ref={targetRef}
        style={{
          display: 'inline-block',
          padding: '16px 24px',
          border: '1px dashed var(--yee-border-color)',
          borderRadius: 6,
        }}
      >
        目标元素
      </div>

      <Tour
        open={open}
        placement={p}
        onClose={() => setOpen(false)}
        steps={[
          {
            target: () => targetRef.current,
            title: `placement: ${p}`,
            description:
              '气泡卡片相对目标元素的位置；靠近视口边缘时会自动翻转。',
          },
        ]}
      />
    </Space>
  );
};
