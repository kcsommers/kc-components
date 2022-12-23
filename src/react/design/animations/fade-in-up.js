import { easings } from '@react-spring/web';

export const fadeInUp = (isVisible, configOverrides = {}) => {
  const animConfig = isVisible
    ? {
        from: {
          opacity: 0,
          y: '80px'
        },
        to: {
          opacity: 1,
          y: '0px'
        }
      }
    : {
        to: {
          opacity: 0,
          y: '80px'
        }
      };
  return {
    ...animConfig,
    config: {
      duration: 600,
      easing: easings.easeOutCirc
    },
    ...configOverrides
  };
};
