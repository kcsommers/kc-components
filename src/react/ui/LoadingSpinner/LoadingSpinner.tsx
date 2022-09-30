import React from 'react';
import { ThemeColorTypes } from '../../../design/themes/theme-color-types.type';
import { useTheme } from '../../providers/base-theme/theme-context';
import styles from './LoadingSpinner.module.scss';

export type LoadingSpinnerProps = {
  size?: 'lg' | 'md' | 'sm';
  color?: ThemeColorTypes;
};

export const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
}: LoadingSpinnerProps) => {
  const { currentTheme, setCurrentTheme } = useTheme();

  return (
    <div
      className={`${styles.loading_spinner} ${
        styles[`loading_spinner_${size}`]
      }`}
      style={{
        borderLeftColor: currentTheme.schema[`${color}Color`],
        borderRightColor: currentTheme.schema[`${color}Color`],
        borderBottomColor: currentTheme.schema[`${color}Color`],
        borderTopColor: currentTheme.schema[`lightColor`],
      }}
    ></div>
  );
};
