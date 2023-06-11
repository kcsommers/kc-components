import { useSpring } from '@react-spring/web';
import { fadeInUp } from 'kc_components/react/design/animations/fade-in-up';
import { useIntersectionObserver } from 'kc_components/react/utils/hooks/use-intersection-observer';

/**
 *
 * @param {Object} intersectionObserverConfig { ref, threshold, initialOnly }
 * @param {Object} animationConfig { fn, config } // fn defaults to fadeInUp
 * @returns {Object} { isVisible, styles }
 */
export const useEntryAnimation = (
  intersectionObserverConfig,
  animationConfig
) => {
  const animationFn = animationConfig?.fn || fadeInUp;
  const config = animationConfig?.config || {};
  const { isVisible } = useIntersectionObserver(
    intersectionObserverConfig.ref,
    !isNaN(intersectionObserverConfig.threshold)
      ? intersectionObserverConfig.threshold
      : 0.25,
    intersectionObserverConfig.initialOnly
  );
  const styles = useSpring(animationFn(isVisible, config));
  return { isVisible, styles };
};
