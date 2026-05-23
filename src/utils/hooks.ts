/**
 * Custom React hooks for common patterns
 */

import { useCallback, useRef, useEffect } from 'react';

type TimeoutHandle = ReturnType<typeof setTimeout>;

/**
 * Debounce hook to prevent rapid function calls
 */
export const useDebounce = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const timeoutRef = useRef<TimeoutHandle | null>(null);

  return useCallback(
    (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );
};

/**
 * Throttle hook to limit function call frequency
 */
export const useThrottle = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const lastCallRef = useRef<number>(0);
  const timeoutRef = useRef<TimeoutHandle | null>(null);

  return useCallback(
    (...args: T) => {
      const now = Date.now();
      if (now - lastCallRef.current < delay) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          lastCallRef.current = Date.now();
          callback(...args);
        }, delay - (now - lastCallRef.current));
      } else {
        lastCallRef.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );
};

/**
 * Previous value hook
 */
export const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
