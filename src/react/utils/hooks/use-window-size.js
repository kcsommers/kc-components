import { useEffect, useState } from 'react';
import { useDebounce } from 'kc_components/react/utils/hooks/use-debounce';

export const useWindowSize = (listen = true, debounceDelay = 0) => {
  const [windowDims, setWindowDims] = useState({
    width: undefined,
    height: undefined,
  });

  const [debouncedWindowDims, setDebouncedWindowDims] = useState({
    width: undefined,
    height: undefined,
  });

  const debouncer = useDebounce(windowDims, debounceDelay);

  useEffect(() => {
    setDebouncedWindowDims(debouncer);
  }, [debouncer]);

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      setWindowDims({
        width: window.visualViewport.width,
        height: window.visualViewport.height,
      });
    };
    if (listen) {
      // Add event listener
      window.addEventListener('resize', handleResize);
    }
    // Call handler right away so state gets updated with initial window size
    handleResize();
    return () => {
      if (listen) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return debounceDelay ? debouncedWindowDims : windowDims;
};
