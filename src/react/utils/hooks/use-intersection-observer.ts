import { useEffect, useMemo, useState } from 'react';

export const useIntersectionObserver = (
  elementRef,
  threshold = 0,
  initialOnly = true,
  adjustThreshold = true
) => {
  const [isVisible, setIsVisible] = useState(false);

  // the adjustedThreshold handles cases where the dom element is taller than the window,
  // in which case its possible the provided threshold will never be met
  const adjustedThreshold = useMemo(() => {
    if (!adjustThreshold || !elementRef.current) {
      return threshold;
    }
    const elDOMRect = elementRef.current.getBoundingClientRect();
    const elTallerThanWin = elDOMRect.height > window.visualViewport.height;
    if (!elTallerThanWin) {
      return threshold;
    }
    const maxThreshold =
      window.visualViewport.height /
      // this math ensures the threshold will always be met
      (elDOMRect.height + (window.visualViewport.height / 100) * 10);
    return Math.min(maxThreshold, threshold);
  }, [elementRef.current, threshold]);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }
    const intersectionCb = (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= adjustedThreshold
        ) {
          setIsVisible(true);
          if (initialOnly) {
            observer.unobserve(entry.target);
          }
        } else {
          setIsVisible(false);
        }
      });
    };
    const observer = new IntersectionObserver(intersectionCb, {
      threshold: adjustedThreshold
    });
    observer.observe(elementRef.current);
    return () => {
      observer.disconnect();
    };
  }, [elementRef.current, adjustedThreshold]);

  return { isVisible };
};
