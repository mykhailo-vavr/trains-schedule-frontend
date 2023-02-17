import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export const useDebounce = <T>(initialValue: T, delay = 500): [T, T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return [debouncedValue, value, setValue];
};
