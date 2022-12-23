import { animated, easings, useTransition } from '@react-spring/web';
import classNames from 'classnames';
import styles from './ImageCrossfader.module.scss';

const TRANSITION_DURATION = 300;

export const ImageCrossfader = ({
  images = [],
  activeImage,
  transitionConfigOverrides = {}
}) => {
  const transitions = useTransition(activeImage || images[0], {
    key: (activeImage || images[0]).url,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: TRANSITION_DURATION,
      easing: easings.linear
    },
    exitBeforeEnter: false,
    ...transitionConfigOverrides
  });

  return transitions((style, img) => (
    <animated.div style={style}>
      <div className={classNames(styles.crossfader_wrap, 'pos-absolute')}>
        <div className={styles.crossfader_img_wrap}>
          <img className={styles.crossfader_img} src={img.src} />
        </div>
      </div>
    </animated.div>
  ));
};
