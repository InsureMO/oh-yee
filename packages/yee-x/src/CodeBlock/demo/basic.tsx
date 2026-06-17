import { CodeBlock } from '@rainbow-oh/yee-x';
import React from 'react';

const Demo = () => {
  const code = `
~~~jsx
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

  return <CodeBlock code={code} />;
};

export default Demo;
