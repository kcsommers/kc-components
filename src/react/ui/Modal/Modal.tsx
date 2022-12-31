import { animated, easings, useTransition } from '@react-spring/web';
import classNames from 'classnames';
import CloseIcon from 'kc_components/common/design/icons/close.svg';
import { useOutsideClick } from 'kc_components/react/utils/hooks/use-outside-click';
import { useScrollLock } from 'kc_components/react/utils/hooks/use-scroll-lock';
import { useEffect } from 'react';
import styles from './Modal.module.scss';

export const Modal = ({
  isVisible,
  setIsVisible,
  size = 'small',
  headerContent,
  bodyContent,
  footerContent,
  bannerContent,
  showCloseIcon = true,
  clickoutEnabaled = true
}) => {
  const clickoutRef = useOutsideClick(() => {
    if (isVisible) {
      setIsVisible(false);
    }
  }, clickoutEnabaled && isVisible);

  const { setScrollLocked } = useScrollLock();
  useEffect(() => {
    setScrollLocked(isVisible);
  }, [isVisible]);

  const transitions = useTransition(isVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200,
      easing: easings.linear
    }
  });

  return transitions(
    (transitionStyles, show) =>
      show && (
        <animated.div
          role='document'
          className={classNames(
            styles.modal,
            'pos-fixed d-flex align-items-start justify-content-center'
          )}
          style={transitionStyles}
        >
          <div
            className={classNames(
              styles.modal_content,
              `bg-white ${styles[`modal-${size}`]}`
            )}
            ref={clickoutRef}
          >
            {(bannerContent || showCloseIcon) && (
              <div
                className={classNames(
                  styles.modal_banner,
                  'd-flex align-items-center p-xs'
                )}
              >
                {bannerContent}
                {showCloseIcon && (
                  <button
                    className='btn-clear'
                    onClick={() => setIsVisible(false)}
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            )}
            {headerContent && (
              <div className={classNames(styles.modal_header, 'p-sm')}>
                {headerContent}
              </div>
            )}
            {bodyContent && (
              <div className={styles.modal_body}>{bodyContent}</div>
            )}
            {footerContent && (
              <div className={styles.modal_footer}>{footerContent}</div>
            )}
          </div>
        </animated.div>
      )
  );
};
