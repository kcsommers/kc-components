import { useCallback, useEffect, useRef, useState } from 'react';

export const useInterval = (
  callback: Function,
  delay: number,
  immediate: boolean
) => {
  const savedCallback = useRef(callback);
  const intervalId = useRef(0);
  const [intervalIsRunning, setIntervalIsRunning] = useState(!!immediate);

  const clear = useCallback(() => {
    window.clearInterval(intervalId.current);
  }, []);

  const toggleInterval = useCallback(() => {
    setIntervalIsRunning(!intervalIsRunning);
  }, [intervalIsRunning]);

  const resetInterval = useCallback(() => {
    if (intervalId.current) {
      clear();
    }

    if (!intervalIsRunning) {
      return;
    }

    const tick = () => {
      if (!savedCallback.current) {
        return;
      }

      savedCallback.current();
    };

    if (delay !== null) {
      intervalId.current = window.setInterval(tick, delay);
    }
  }, [clear, intervalIsRunning, delay]);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    resetInterval();
  }, [intervalIsRunning, clear, resetInterval]);

  // cleanup
  useEffect(() => clear, []);

  return { resetInterval, toggleInterval, intervalIsRunning };
};
