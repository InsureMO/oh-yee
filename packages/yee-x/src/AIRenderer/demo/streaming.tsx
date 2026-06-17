/**
 * Streaming example - Shows streaming message rendering
 */

import { Button } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';
import { StreamingAIRenderer } from '../StreamingAIRenderer';

const StreamingDemo: React.FC = () => {
  const [content, setContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  // Simulated streaming messages
  const streamMessages = [
    '{"op":"init","path":"root","value":"form-card"}',
    '{"op":"add","path":"components.form-card","value":{"type":"card","props":{"title":"User Registration"},"children":["user-form"]}}',
    '{"op":"add","path":"components.user-form","value":{"type":"form","props":{"layout":"vertical"},"children":["name-field","birthday-field","email-field","submit-btn"]}}',
    '{"op":"add","path":"components.name-field","value":{"type":"form-field","props":{"name":"name","label":"Name","rules":[{"required":true,"message":"Please enter your name"}]},"children":["name-input"]}}',
    '{"op":"add","path":"components.name-input","value":{"type":"input","props":{"placeholder":"Please enter your name"}}}',
    '{"op":"add","path":"components.birthday-field","value":{"type":"form-field","props":{"name":"birthday","label":"Date of Birth"}, "children":["birthday-input"]}}',
    '{"op":"add","path":"components.birthday-input","value":{"type":"date-picker","props":{"placeholder":"Select a date"}}}',
    '{"op":"add","path":"components.email-field","value":{"type":"form-field","props":{"name":"email","label":"Email"},"children":["email-input"]}}',
    '{"op":"add","path":"components.email-input","value":{"type":"input","props":{"placeholder":"Please enter your email"}}}',
    '{"op":"add","path":"components.submit-btn","value":{"type":"button","props":{"children":"Submit","type":"primary","htmlType":"submit"}}}',
  ];

  const startStreaming = () => {
    setContent('');
    setIsStreaming(true);

    let index = 0;
    const interval = setInterval(() => {
      if (index < streamMessages.length) {
        const cur = streamMessages[index];
        setContent((prev) => {
          return prev + cur + '\n';
        });
        index++;
      } else {
        setIsStreaming(false);
        clearInterval(interval);
      }
    }, 500);
  };

  const handleUpdate = (update: any) => {
    console.log('Schema updated:', update);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Streaming Rendering Example</h2>
      <Button
        type="primary"
        onClick={startStreaming}
        disabled={isStreaming}
        style={{ marginBottom: 20 }}
      >
        {isStreaming ? 'Streaming...' : 'Start Streaming'}
      </Button>

      <StreamingAIRenderer
        content={content}
        isStreaming={isStreaming}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default StreamingDemo;
