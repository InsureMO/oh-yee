import * as React from 'react';

function useDebounceValue(value: unknown, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default useDebounceValue;
