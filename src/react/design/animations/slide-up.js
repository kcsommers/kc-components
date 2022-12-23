import { easings } from '@react-spring/web';

export const slideUp = (isVisible, configOverrides = {}) => {
  const animConfig = isVisible
    ? {
        from: {
          y: '100%'
        },
        to: {
          y: '0%'
        }
      }
    : { to: { y: '100%' } };
  return {
    ...animConfig,
    config: {
      duration: 600,
      easing: easings.easeOutCirc
    },
    ...configOverrides
  };
};
