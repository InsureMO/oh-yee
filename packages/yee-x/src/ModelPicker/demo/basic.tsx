import { Space } from '@rainbow-oh/yee-c';
import { ModelPicker, type AIModel } from '@rainbow-oh/yee-x';
import React, { useState } from 'react';

const models: Array<AIModel> = [
  {
    id: 'claude-sonnet',
    group: 'Claude',
    name: 'Claude Sonnet',
    meta: '200k context · balanced',
    quality: 90,
    speed: 78,
    cost: 55,
    thinking: true,
    firstToken: 'first token ~0.8s',
    price: '$3 / M tokens',
  },
  {
    id: 'claude-haiku',
    group: 'Claude',
    name: 'Claude Haiku',
    meta: 'fast and cheap',
    quality: 72,
    speed: 96,
    cost: 18,
    firstToken: 'first token ~0.4s',
    price: '$0.8 / M tokens',
  },
  {
    id: 'gpt-o',
    group: 'GPT',
    name: 'GPT-o',
    meta: 'reasoning-first',
    quality: 94,
    speed: 40,
    cost: 85,
    thinking: true,
    firstToken: 'first token ~2.1s',
    price: '$10 / M tokens',
  },
  {
    id: 'legacy',
    name: 'Legacy mini',
    disabled: true,
    meta: 'deprecated 2025-12',
  },
];

export default function Basic() {
  const [modelId, setModelId] = useState('claude-sonnet');
  const [thinking, setThinking] = useState(false);
  const [effort, setEffort] = useState<'low' | 'medium' | 'high'>('medium');

  return (
    <Space direction="vertical">
      <ModelPicker
        models={models}
        value={modelId}
        onChange={setModelId}
        thinkingEnabled={thinking}
        onThinkingChange={setThinking}
        effort={effort}
        onEffortChange={setEffort}
      />
      <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
        selected: {modelId} · thinking: {String(thinking)} · effort: {effort}
      </span>
    </Space>
  );
}
