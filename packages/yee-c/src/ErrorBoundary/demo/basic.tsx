import { ErrorBoundary, Button } from '@oh/yee-c';
import React from 'react';

const ErrorComponent = () => {
  const [count, setCount] = React.useState(0);

  if (count === 3) {
    throw new Error('This is an error');
  }

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>
        Increase
      </Button>
    </div>
  );
};

export default () => {
  return (
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>
  );
};
