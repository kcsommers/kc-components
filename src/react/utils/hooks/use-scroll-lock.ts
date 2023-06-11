import { useEffect, useRef, useState } from 'react';
import { useScrollPosition } from './use-scroll-position';

export const useScrollLock = (toTopOnLock = false) => {
  const [scrollLocked, setScrollLocked] = useState(false);
  const fixedScrollY = useRef(typeof window !== 'undefined' && window.scrollY);

  const { windowScrollY, setIsListening } = useScrollPosition(false);

  const isMounted = useRef(false);

  const lockScroll = () => {
    document.body.style.overflow = 'hidden';
    // the rest is necessary because iOS doesn't respect overflow hidden on body
    // store the current scroll position so it can be reset on unlock
    fixedScrollY.current = window.scrollY;
    document.body.style.top = `-${fixedScrollY.current}px`;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  };

  const unlockScroll = () => {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, fixedScrollY.current);
    setIsListening(false);
  };

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }
    if (!scrollLocked) {
      unlockScroll();
      return;
    }
    // if we're scrolling to the top on lock, tell the scroll hook to listen
    // and scroll the window up
    if (toTopOnLock && window.scrollY > 0) {
      setIsListening(true);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      lockScroll();
    }
  }, [scrollLocked]);

  useEffect(() => {
    if (!toTopOnLock || !isMounted.current) {
      return;
    }
    // when the window hits the top, lock the scroll
    if (windowScrollY === 0) {
      setIsListening(false);
      lockScroll();
    }
  }, [windowScrollY]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return { scrollLocked, setScrollLocked };
};
