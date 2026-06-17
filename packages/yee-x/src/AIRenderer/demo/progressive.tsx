/**
 * title: Progressive Rendering Comparison
 * description: Compare waiting for complete messages vs progressive rendering
 */
import { Button, Card, Radio, Space, Spin } from '@rainbow-oh/yee-c';
import React, { useEffect, useMemo, useState } from 'react';
import { AIRenderer } from '../AIRenderer';
import type { UISchema } from '../interface';
import { StreamingAIRenderer } from '../StreamingAIRenderer';
import { applyStreamMessages, parseStreamMessages } from '../utils';

// Streaming message array - simulates a complete user info form
const streamMessages = [
  '{"op":"init","path":"root","value":"card-1"}',
  '{"op":"add","path":"components.card-1","value":{"type":"card","props":{"title":"User Info Form"},"children":["form-1"]}}',
  '{"op":"add","path":"components.form-1","value":{"type":"form","props":{"layout":"vertical"},"children":["space-1"]}}',
  '{"op":"add","path":"components.space-1","value":{"type":"space","props":{"direction":"vertical"},"children":["field-1","field-2","field-3","field-4","btn-1"]}}',
  '{"op":"add","path":"components.field-1","value":{"type":"form-field","props":{"name":"name","label":"Name","rules":[{"required":true,"message":"Please enter your name"}]},"children":["input-1"]}}',
  '{"op":"add","path":"components.input-1","value":{"type":"input","props":{"placeholder":"Please enter your name"}}}',
  '{"op":"add","path":"components.field-2","value":{"type":"form-field","props":{"name":"email","label":"Email","rules":[{"required":true,"message":"Please enter your email"},{"type":"email","message":"Invalid email format"}]},"children":["input-2"]}}',
  '{"op":"add","path":"components.input-2","value":{"type":"input","props":{"placeholder":"Please enter your email"}}}',
  '{"op":"add","path":"components.field-3","value":{"type":"form-field","props":{"name":"phone","label":"Phone"},"children":["input-3"]}}',
  '{"op":"add","path":"components.input-3","value":{"type":"input","props":{"placeholder":"Please enter your phone number"}}}',
  '{"op":"add","path":"components.field-4","value":{"type":"form-field","props":{"name":"address","label":"Address"},"children":["textarea-1"]}}',
  '{"op":"add","path":"components.textarea-1","value":{"type":"textarea","props":{"placeholder":"Please enter your address","rows":3}}}',
  '{"op":"add","path":"components.btn-1","value":{"type":"button","props":{"children":"Submit","type":"primary","htmlType":"submit"}}}',
];

type RenderMode = 'progressive' | 'waiting';

// Renderer that waits for complete messages
const WaitingRenderer: React.FC<{
  content: string;
  isStreaming: boolean;
  onUpdate?: (update: any) => void;
}> = ({ content, isStreaming, onUpdate }) => {
  // Only render when all messages have been received
  const schema: UISchema = useMemo(() => {
    if (isStreaming) {
      // During streaming, return empty schema
      return { components: {}, data: {} };
    }

    if (!content || !content.trim()) {
      return { components: {}, data: {} };
    }

    // Parse streaming messages
    const messages = parseStreamMessages(content);

    // Apply messages to generate UI Schema
    const initialSchema: UISchema = { components: {}, data: {} };
    return applyStreamMessages(initialSchema, messages);
  }, [content, isStreaming]);

  // If streaming, show loading state
  if (isStreaming) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16, color: '#666' }}>
          Waiting for all messages to be received...
        </div>
      </div>
    );
  }

  // If no content
  if (!content) {
    return (
      <div style={{ textAlign: 'center', color: '#999', padding: '60px 0' }}>
        Click &ldquo;Start Streaming&rdquo; to see the effect
      </div>
    );
  }

  // Render complete UI
  return <AIRenderer schema={schema} onUpdate={onUpdate} />;
};

const ProgressiveDemo: React.FC = () => {
  const [content, setContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [mode, setMode] = useState<RenderMode>('progressive');

  // Simulate message-by-message transmission
  const startStreaming = () => {
    setContent('');
    setCurrentMessageIndex(0);
    setIsStreaming(true);
  };

  useEffect(() => {
    if (!isStreaming) return;

    if (currentMessageIndex >= streamMessages.length) {
      setIsStreaming(false);
      return;
    }

    const timer = setTimeout(() => {
      // Add messages one by one
      const newMessage = streamMessages[currentMessageIndex];
      setContent((prev) => (prev ? `${prev}\n${newMessage}` : newMessage));
      setCurrentMessageIndex((prev) => prev + 1);
    }, 500); // Add one message every 500ms

    return () => clearTimeout(timer);
  }, [isStreaming, currentMessageIndex]);

  const reset = () => {
    setContent('');
    setCurrentMessageIndex(0);
    setIsStreaming(false);
  };

  // Count parsed messages
  const parsedMessages = content
    ? content.split('\n').filter((line) => {
        try {
          JSON.parse(line);
          return true;
        } catch {
          return false;
        }
      }).length
    : 0;

  const handleUpdate = (update: any) => {
    console.log('Schema updated:', update);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Card title="Progressive Rendering vs Waiting for Complete Messages">
        <Space direction="vertical" style={{ width: '100%' }}>
          {/* Control Panel */}
          <div
            style={{ padding: '16px', background: '#fafafa', borderRadius: 4 }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Space>
                <Button
                  type="primary"
                  onClick={startStreaming}
                  disabled={isStreaming}
                >
                  {isStreaming ? 'Transmitting...' : 'Start Streaming'}
                </Button>
                <Button onClick={reset}>Reset</Button>
              </Space>

              <div>
                <strong>Highlight Mode:</strong>
                <Radio.Group
                  value={mode}
                  onChange={(e: any) => setMode(e.target.value as RenderMode)}
                  style={{ marginLeft: 12 }}
                >
                  <Radio value="progressive">
                    Progressive (render as received)
                  </Radio>
                  <Radio value="waiting">
                    Wait for complete (render after all received)
                  </Radio>
                </Radio.Group>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 12,
                }}
              >
                <div>
                  <strong>Message Progress:</strong>
                  <div style={{ marginTop: 4 }}>
                    {currentMessageIndex} / {streamMessages.length} messages
                    <div
                      style={{
                        marginTop: 4,
                        height: 4,
                        background: '#f0f0f0',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          background: '#1890ff',
                          width: `${
                            (currentMessageIndex / streamMessages.length) * 100
                          }%`,
                          transition: 'width 0.3s',
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <strong>Parsed Messages:</strong>
                  <div style={{ marginTop: 4, fontSize: 24, color: '#1890ff' }}>
                    {parsedMessages} messages
                  </div>
                </div>

                <div>
                  <strong>Transfer Status:</strong>
                  <div style={{ marginTop: 4 }}>
                    {isStreaming ? (
                      <span style={{ color: '#1890ff' }}>
                        &#x1F7E2; Transmitting
                      </span>
                    ) : currentMessageIndex > 0 ? (
                      <span style={{ color: '#52c41a' }}>
                        &#x2705; Complete
                      </span>
                    ) : (
                      <span style={{ color: '#999' }}>
                        &#x26AA; Not started
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Space>
          </div>

          {/* Rendering Comparison */}
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
          >
            {/* Progressive Rendering */}
            <div>
              <div
                style={{
                  padding: '8px 12px',
                  background: mode === 'progressive' ? '#e6f7ff' : '#f5f5f5',
                  borderRadius: '4px 4px 0 0',
                  fontWeight: 'bold',
                  border:
                    mode === 'progressive'
                      ? '2px solid #1890ff'
                      : '1px solid #d9d9d9',
                  borderBottom: 'none',
                }}
              >
                &#x1F680; Progressive Rendering
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 'normal',
                    color: '#666',
                    marginTop: 4,
                  }}
                >
                  Render immediately as each message is received
                </div>
              </div>
              <div
                style={{
                  padding: 16,
                  border:
                    mode === 'progressive'
                      ? '2px solid #1890ff'
                      : '1px solid #d9d9d9',
                  borderTop: 'none',
                  borderRadius: '0 0 4px 4px',
                  minHeight: 450,
                  background: '#fff',
                }}
              >
                {content ? (
                  <StreamingAIRenderer
                    content={content}
                    isStreaming={isStreaming}
                    onUpdate={handleUpdate}
                  />
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      color: '#999',
                      padding: '60px 0',
                    }}
                  >
                    Click &ldquo;Start Streaming&rdquo; to see the effect
                  </div>
                )}
              </div>
            </div>

            {/* Wait for Complete Messages */}
            <div>
              <div
                style={{
                  padding: '8px 12px',
                  background: mode === 'waiting' ? '#e6f7ff' : '#f5f5f5',
                  borderRadius: '4px 4px 0 0',
                  fontWeight: 'bold',
                  border:
                    mode === 'waiting'
                      ? '2px solid #1890ff'
                      : '1px solid #d9d9d9',
                  borderBottom: 'none',
                }}
              >
                &#x23F3; Wait for Complete Messages
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 'normal',
                    color: '#666',
                    marginTop: 4,
                  }}
                >
                  Display all at once after receiving everything
                </div>
              </div>
              <div
                style={{
                  padding: 16,
                  border:
                    mode === 'waiting'
                      ? '2px solid #1890ff'
                      : '1px solid #d9d9d9',
                  borderTop: 'none',
                  borderRadius: '0 0 4px 4px',
                  minHeight: 450,
                  background: '#fff',
                }}
              >
                <WaitingRenderer
                  content={content}
                  isStreaming={isStreaming}
                  onUpdate={handleUpdate}
                />
              </div>
            </div>
          </div>
        </Space>
      </Card>

      {/* Mode Comparison */}
      <Card title="Mode Comparison" style={{ marginTop: 16 }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
        >
          <div>
            <h3 style={{ color: '#1890ff' }}>
              &#x1F680; Progressive Rendering
            </h3>
            <div style={{ color: '#666', lineHeight: 1.8 }}>
              <p>
                <strong>Advantages:</strong>
              </p>
              <ul>
                <li>Instant feedback: Users see content immediately</li>
                <li>
                  Smooth experience: UI builds up progressively, feels natural
                </li>
                <li>
                  Fast perceived speed: No need to wait for everything to
                  complete
                </li>
                <li>
                  Ideal for long forms: Fields appear one by one, no blank
                  waiting
                </li>
              </ul>
              <p>
                <strong>Disadvantages:</strong>
              </p>
              <ul>
                <li>Layout may shift: New components may affect layout</li>
                <li>
                  Some references may break: Child components may not be
                  generated yet
                </li>
              </ul>
              <p>
                <strong>Use Cases:</strong>
              </p>
              <ul>
                <li>Complex forms (multiple fields)</li>
                <li>Long lists (display items progressively)</li>
                <li>Multi-card layouts</li>
                <li>Scenarios requiring quick feedback</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#52c41a' }}>
              &#x23F3; Wait for Complete Messages
            </h3>
            <div style={{ color: '#666', lineHeight: 1.8 }}>
              <p>
                <strong>Advantages:</strong>
              </p>
              <ul>
                <li>Stable layout: Renders all at once, no shifting</li>
                <li>
                  Complete references: All component relationships are clear
                </li>
                <li>Clear logic: Complete component tree</li>
              </ul>
              <p>
                <strong>Disadvantages:</strong>
              </p>
              <ul>
                <li>
                  Long wait time: Needs to wait for everything to generate
                </li>
                <li>
                  Blank period: Only shows loading state during generation
                </li>
                <li>Slow perceived speed: Users need to wait patiently</li>
              </ul>
              <p>
                <strong>Use Cases:</strong>
              </p>
              <ul>
                <li>Simple interfaces (few components)</li>
                <li>Complex layouts (need complete structure)</li>
                <li>Strong dependencies (cross-component references)</li>
                <li>High layout stability requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Usage Recommendations */}
      <Card title="Usage Recommendations" style={{ marginTop: 16 }}>
        <Space direction="vertical">
          <div>
            <strong>1. Choose based on your scenario</strong>
            <pre
              style={{
                marginTop: 8,
                padding: 12,
                background: '#f5f5f5',
                borderRadius: 4,
                fontSize: 12,
              }}
            >
              {`// Recommended: Use progressive rendering (default)
<StreamingAIRenderer content={content} isStreaming={isStreaming} />

// If you need to wait for complete, you can implement
// a WaitingRenderer-like logic yourself
// Show loading state when isStreaming is true,
// render only when isStreaming is false`}
            </pre>
          </div>

          <div>
            <strong>2. Using in chat applications</strong>
            <pre
              style={{
                marginTop: 8,
                padding: 12,
                background: '#f5f5f5',
                borderRadius: 4,
                fontSize: 12,
              }}
            >
              {`import { StreamingAIRenderer } from '@rainbow-oh/yee-x';

const ChatMessage = ({ content, isStreaming }) => {
  return (
    <StreamingAIRenderer
      content={content}
      isStreaming={isStreaming}
      onUpdate={(update) => console.log('UI updated:', update)}
    />
  );
};`}
            </pre>
          </div>

          <div>
            <strong>3. AI prompt optimization</strong>
            <p style={{ marginTop: 8, color: '#666' }}>
              Tell the AI to generate components in order - containers first,
              then content:
            </p>
            <pre
              style={{
                marginTop: 8,
                padding: 12,
                background: '#f5f5f5',
                borderRadius: 4,
                fontSize: 12,
              }}
            >
              {`Generate UI components in the following order:
1. Initialize the root component first (init operation)
2. Then generate outer containers (card, form)
3. Then generate layout components (space)
4. Finally generate specific content (input, button)

This allows the interface to display progressively for a better user experience.`}
            </pre>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default ProgressiveDemo;
