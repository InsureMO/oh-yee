import { CodeBlock, Markdown } from '@rainbow-oh/yee-x';
import React from 'react';

export default function Index() {
  const markdown = `
# title one

start content xxxx end

~~~tsx
import React, { FC } from 'react';

interface DemoProps {
    className?: string;
    style?: React.CSSProperties;
}

const Demo: FC<DemoProps> = (props) => {
    const { className, style} = props;

    return (
        <div className={className} style={style}>
            <span>test 1</span>
            <span>test 2</span>
        </div>
    )
}

export default Demo;
~~~

  `;

  const components = {
    code: (props: any) => {
      const { className, children } = props;
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      return <CodeBlock language={language} code={children} />;
    },
  };

  return <Markdown markdown={markdown} components={components} />;
}
