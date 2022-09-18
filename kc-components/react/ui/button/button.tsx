import { LoadingSpinner } from '@kcsommers/kc-components.react.ui.loading-spinner';
import React, { useEffect, useRef } from 'react';
import styles from './button.module.scss';

export type ButtonTypes =
  | 'primary'
  | 'accent1'
  | 'danger'
  | 'success'
  | 'warning';

export type ButtonSizes = 'lg' | 'md' | 'sm';

export type ButtonProps = {
  text?: string;
  type?: ButtonTypes;
  size?: ButtonSizes;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  showSpinner?: boolean;
  onClick?: (e: React.MouseEvent) => void;
};

export function Button({
  text,
  type = 'accent1',
  size = 'md',
  isFullWidth = false,
  isDisabled = false,
  showSpinner = false,
  onClick,
}: ButtonProps) {
  const buttonEl = useRef<HTMLButtonElement>();

  const clicked = async (event: React.MouseEvent) => {
    event.preventDefault();
    buttonEl.current?.blur();
    if (!onClick || !buttonEl.current || showSpinner) {
      return;
    }
    onClick(event);
  };

  useEffect(() => {
    if (!buttonEl.current || isFullWidth) {
      return;
    }

    const _btnWidth = buttonEl.current.getBoundingClientRect().width;
    buttonEl.current.style.minWidth = `${_btnWidth}px`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonEl]);

  return (
    <button
      className={`${styles.btn} ${styles[`btn_${size}`]} ${[
        `${styles[`btn_${type}`]}`,
      ]} ${isFullWidth ? styles.btn_full_width : ''}${
        isDisabled ? ' disabled' : ''
      }`}
      onClick={clicked}
      ref={(el: HTMLButtonElement) => (buttonEl.current = el)}
    >
      {showSpinner ? <LoadingSpinner size="sm" /> : text}
    </button>
  );
}
