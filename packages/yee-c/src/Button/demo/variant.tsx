import { Button, Space } from '@rainbow-oh/yee-c';
import React from 'react';

const types = ['primary', 'default', 'dashed', 'text', 'link'] as const;
const colors = ['default', 'primary', 'success', 'danger', 'warning'] as const;
const variants = [
  'solid',
  'outlined',
  'dashed',
  'filled',
  'text',
  'link',
] as const;

const labelStyle: React.CSSProperties = {
  flex: '0 0 80px',
  color: '#969696',
  fontSize: 14,
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
};

export default () => {
  return (
    <Space direction="horizontal" block gap={12} wrap>
      <div style={rowStyle}>
        <span style={labelStyle}>type</span>
        <Space wrap>
          {types.map((t) => (
            <Button key={t} type={t}>
              {t}
            </Button>
          ))}
        </Space>
      </div>

      {variants.map((variant) => (
        <div key={variant} style={rowStyle}>
          <span style={labelStyle}>{variant}</span>
          <Space wrap>
            {colors.map((color) => (
              <Button key={color} color={color} variant={variant}>
                {color}
              </Button>
            ))}
          </Space>
        </div>
      ))}
    </Space>
  );
};
