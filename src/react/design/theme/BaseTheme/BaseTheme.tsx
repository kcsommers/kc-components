import classNames from 'classnames';
import React, { ReactNode } from 'react';
import {
  IBaseThemeSchema,
  ITheme,
  THEME_LIGHT
} from '../../../../common/design/themes';
import { ThemeProvider } from '../theme-context/ThemeProvider';
import styles from './BaseTheme.module.scss';

export interface BaseThemeProps extends React.HTMLAttributes<HTMLDivElement> {
  overrides?: Partial<IBaseThemeSchema>;
  children?: ReactNode;
  className?: string;
  theme?: ITheme;
}

export const BaseTheme = ({
  theme = THEME_LIGHT,
  children,
  className,
  ...props
}: BaseThemeProps) => {
  return (
    <ThemeProvider
      {...props}
      theme={theme}
      className={classNames(styles.theme, className)}
    >
      <link
        href='https://fonts.googleapis.com/css?family=Roboto+Mono'
        rel='stylesheet'
      />
      {children}
    </ThemeProvider>
  );
};
