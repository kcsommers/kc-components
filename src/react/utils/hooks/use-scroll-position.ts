import { useEffect, useState } from 'react';

export const useScrollPosition = (listen = true, elementRef) => {
  const [windowScrollY, setWindowScrollY] = useState(
    typeof window !== 'undefined' && window.scrollY
  );

  const [prevWindowScrollY, setPrevWindowScrollY] = useState(
    typeof window !== 'undefined' && window.scrollY
  );

  const [elementDOMRect, setElementDOMRect] = useState(
    elementRef?.current?.scrollTop
  );

  const [isListening, setIsListening] = useState(listen);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setWindowScrollY((prev) => {
            setPrevWindowScrollY(prev);
            return window.scrollY;
          });
          if (elementRef?.current) {
            setElementDOMRect(elementRef.current.getBoundingClientRect());
          }
          ticking = false;
        });

        ticking = true;
      }
    };
    if (isListening) {
      window.addEventListener('scroll', handleScroll);
    }
    // Call handler right away so state gets updated with initial window position
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isListening]);

  const position = {
    windowScrollY,
    prevWindowScrollY,
    elementDOMRect: null
  };
  if (elementRef) {
    position.elementDOMRect = elementDOMRect;
  }
  return {
    ...position,
    setIsListening
  };
};
