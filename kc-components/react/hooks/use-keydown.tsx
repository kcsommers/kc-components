import { useEffect } from 'react';

export const useKeydown = (
  targetKey: string,
  listener: (event: KeyboardEvent) => any,
  deps?: any[]
) => {
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.code === targetKey) {
        listener(event);
      }
    };
    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, deps || []);
};
