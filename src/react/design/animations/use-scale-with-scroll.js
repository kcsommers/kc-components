import { easings, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';
import { useScrollPosition } from '../../hooks/use-scroll-position';

const DEFAULT_SCALE = 0.8;

export const useScaleWithScroll = (
  listen,
  elementRef,
  initialScale = DEFAULT_SCALE
) => {
  const [scale, setScale] = useState(initialScale);

  const { elementDOMRect, setIsListening } = useScrollPosition(
    listen,
    elementRef
  );

  const spring = useSpring({
    to: { transform: `scale(${scale})` },
    config: {
      duration: 0,
      easing: easings.easeOutCirc
    }
  });

  useEffect(() => {
    if (!elementDOMRect) {
      return;
    }
    const pctVisible =
      (window.visualViewport.height - elementDOMRect.top) /
      elementDOMRect.height;
    const scaleDegree = (1 - initialScale) * pctVisible;
    setScale(Math.min(Math.max(initialScale + scaleDegree, initialScale), 1));
  }, [elementDOMRect?.bottom]);

  useEffect(() => {
    setIsListening(listen);
  }, [listen]);

  return spring;
};
