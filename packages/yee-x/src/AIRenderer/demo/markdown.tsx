/**
 * Markdown integration example - Shows embedding JSON UI in Markdown (simulating AI streaming output)
 */

import { Button } from '@rainbow-oh/yee-c';
import { AIRendererMarkdown, Markdown } from '@rainbow-oh/yee-x';
import React, { useEffect, useMemo, useState } from 'react';

const ContentParser = (props: any) => {
  const { content } = props;

  const components = useMemo(
    () => ({
      'ai-renderer': ({ children }: any) => {
        return <AIRendererMarkdown>{children}</AIRendererMarkdown>;
      },
    }),
    [],
  );

  return <Markdown markdown={content} components={components} />;
};

const MarkdownDemo: React.FC = () => {
  const [content, setContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  // Complete streaming messages
  const streamMessages = [
    '{"op":"init","path":"root","value":"form-card"}',
    '{"op":"add","path":"components.form-card","value":{"type":"card","props":{"title":"Contact Us"},"children":["contact-form"]}}',
    '{"op":"add","path":"components.contact-form","value":{"type":"form","props":{"layout":"vertical"},"children":["name-field","email-field","message-field","submit-btn"]}}',
    '{"op":"add","path":"components.name-field","value":{"type":"form-field","props":{"name":"name","label":"Name","rules":[{"required":true,"message":"Please enter your name"}]},"children":["name-input"]}}',
    '{"op":"add","path":"components.name-input","value":{"type":"date-picker","props":{"placeholder":"Select a date"}}}',
    '{"op":"add","path":"components.email-field","value":{"type":"form-field","props":{"name":"email","label":"Email","rules":[{"required":true,"message":"Please enter your email"},{"type":"email","message":"Invalid email format"}]},"children":["email-input"]}}',
    '{"op":"add","path":"components.email-input","value":{"type":"input","props":{"placeholder":"Please enter your email"}}}',
    '{"op":"add","path":"components.message-field","value":{"type":"form-field","props":{"name":"message","label":"Message"},"children":["message-input"]}}',
    '{"op":"add","path":"components.message-input","value":{"type":"textarea","props":{"placeholder":"Please enter your message","rows":4}}}',
    '{"op":"add","path":"components.submit-btn","value":{"type":"button","props":{"children":"Send","type":"primary","htmlType":"submit", action}}}',
  ];

  const startStreaming = () => {
    setContent('');
    setIsStreaming(true);

    let index = 0;
    const interval = setInterval(() => {
      const cur = streamMessages[index];
      if (index < streamMessages.length) {
        setContent((prev) => prev + cur + '\n');
        index++;
      } else {
        setIsStreaming(false);
        clearInterval(interval);
      }
    }, 300); // Add one message every 300ms, simulating AI streaming output
  };

  // Auto-start streaming on mount
  useEffect(() => {
    startStreaming();
  }, []);

  const markdownContent = content
    ? `
Here is a contact form, please fill in your information:

<ai-renderer>
${content}
</ai-renderer>

Thank you for your feedback!
  `
    : 'Generating form...';

  return (
    <div style={{ padding: '24px' }}>
      <h2>Markdown Integration Example - AI Streaming Output</h2>
      <p>Simulating the process of AI progressively generating UI</p>

      <div style={{ marginBottom: '16px' }}>
        <Button onClick={startStreaming} disabled={isStreaming} type="primary">
          {isStreaming ? 'Streaming...' : 'Restart Streaming'}
        </Button>
        <span style={{ marginLeft: '16px', color: '#666' }}>
          Generated {content.split('\n').filter((line) => line.trim()).length} /{' '}
          {streamMessages.length} messages
        </span>
      </div>

      <div style={{ marginTop: '24px' }}>
        <h3>Rendered Result:</h3>
        <div
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            padding: '16px',
            backgroundColor: '#fff',
          }}
        >
          <ContentParser content={markdownContent} />
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <h3>Current Markdown Source:</h3>
        <pre
          style={{
            padding: '16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: '400px',
          }}
        >
          {markdownContent}
        </pre>
      </div>

      <div style={{ marginTop: '24px' }}>
        <h3>Streaming Messages (JSON):</h3>
        <pre
          style={{
            padding: '16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: '300px',
            fontSize: '12px',
          }}
        >
          {content || 'Waiting to generate...'}
        </pre>
      </div>
    </div>
  );
};

export default MarkdownDemo;
