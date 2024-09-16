import { useEffect, useRef } from "react";

export const useDebounce = (
  callback: (arg0: any) => void,
  delay: number | undefined
) => {
  const debounceTimeout = useRef(null);

  const debouncedFunction = (...args: any[]) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // @ts-ignore
    debounceTimeout.current = setTimeout(() => {
      // @ts-ignore
      callback(...args);
    }, delay);
  };

  // 清除定时器
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return debouncedFunction;
};
