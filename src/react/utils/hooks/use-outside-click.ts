import { useCallback, useEffect, useRef } from 'react';

export const useOutsideClick = (callback: Function, listen = true) => {
  const ref = useRef<any>();

  const handleClick = useCallback(
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    },
    [ref.current, callback]
  );

  useEffect(() => {
    if (!listen) {
      return document.removeEventListener('click', handleClick);
    }
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [listen, handleClick]);

  return ref;
};
