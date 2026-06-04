function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  if (typeof fn !== 'function') {
    throw new Error('Expected fn to be a function');
  }
  if (typeof delay !== 'number' || delay < 0) {
    throw new Error('Expected delay to be a positive number');
  }

  let timer: ReturnType<typeof setTimeout> | undefined = undefined;
  return function (...args: Parameters<T>) {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, args);
    }, delay);
  };
}

export default debounce;
