import { Button, ErrorBoundary } from '@rainbow-oh/yee-c';
import React from 'react';

const ErrorComponent = () => {
  const [count, setCount] = React.useState(0);

  if (count === 2) {
    throw new Error('This is a test error');
  }

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Increase</Button>
    </div>
  );
};

export default () => {
  const [errorInfo, setErrorInfo] = React.useState('');

  return (
    <div>
      <ErrorBoundary
        onError={({ error, errorInfo }) => {
          console.error('Error caught:', error, errorInfo);
          setErrorInfo(error.message);
        }}
        renderError={() => (
          <div style={{ color: 'red' }}>Something went wrong: {errorInfo}</div>
        )}
      >
        <ErrorComponent />
      </ErrorBoundary>
    </div>
  );
};
