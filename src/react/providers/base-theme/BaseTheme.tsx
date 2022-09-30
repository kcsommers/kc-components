import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { IBaseThemeSchema, ITheme, THEME_LIGHT } from '../../../design/themes';
import styles from './BaseTheme.module.scss';
import { ThemeProvider } from './ThemeProvider';

export interface BaseThemeProps extends React.HTMLAttributes<HTMLDivElement> {
  overrides?: Partial<IBaseThemeSchema>;
  children?: ReactNode;
  className?: string;
  theme?: ITheme;
}

export function BaseTheme({
  theme = THEME_LIGHT,
  children,
  className,
  ...props
}: BaseThemeProps) {
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
}
