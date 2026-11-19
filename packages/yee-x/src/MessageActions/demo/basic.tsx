import { Space } from '@rainbow-oh/yee-c';
import { MessageActions } from '@rainbow-oh/yee-x';
import React from 'react';

export default function Basic() {
  return (
    <Space direction="vertical">
      <MessageActions
        text="Streamed answer content to copy."
        onRegenerate={() => {}}
        total={3}
        onFeedbackChange={() => {}}
        onReadAloud={() => {}}
      />
      <MessageActions
        text="Regenerating state."
        onRegenerate={() => {}}
        regenerating
        onFeedbackChange={() => {}}
      />
    </Space>
  );
}
