import { useEffect, useRef } from "react";

export const useDebounce = (callback, delay) => {
  const debounceTimeout = useRef(null);

  const debouncedFunction = (...args) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
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
