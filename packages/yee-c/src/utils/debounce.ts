type AnyFn = (...args: any[]) => any;

export type Debounced<T extends AnyFn> = ((
  ...args: Parameters<T>
) => void) & {
  /** Cancel any pending invocation. */
  cancel: () => void;
};

function debounce<T extends AnyFn>(fn: T, delay: number): Debounced<T> {
  if (typeof fn !== 'function') {
    throw new Error('Expected fn to be a function');
  }
  if (typeof delay !== 'number' || delay < 0) {
    throw new Error('Expected delay to be a positive number');
  }

  let timer: ReturnType<typeof setTimeout> | undefined = undefined;

  const debounced = function (this: unknown, ...args: Parameters<T>) {
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = undefined;
      fn.apply(this, args);
    }, delay);
  } as Debounced<T>;

  debounced.cancel = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  return debounced;
}

export default debounce;
