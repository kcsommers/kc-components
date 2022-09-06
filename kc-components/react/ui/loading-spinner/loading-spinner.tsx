import { ThemeColorTypes } from '@kcsommers/kc-components.design.themes';
import { useTheme } from '@kcsommers/kc-components.react.providers.base-theme';
import React from 'react';
import styles from './loading-spinner.module.scss';

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
