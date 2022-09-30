import classNames from 'classnames';
import React, { ReactNode } from 'react';
// TODO: remove this after replacing icon fonts with components and deprecate this.
import { IBaseThemeSchema, ITheme, THEME_LIGHT } from '@kcsommers/kc-components.design.themes';
import styles from './base-theme.module.scss';
import { ThemeProvider } from './theme-provider';

const ICON_MOON_VERSION = 'mxd7i0';

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
      // style={{
      //   // @LOOKOUT this is going to be trouble
      //   display: 'flex',
      //   alignItems: 'center',
      //   ...getThemeTokens(theme),
      // }}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Roboto+Mono"
        rel="stylesheet"
      />
      {children}
    </ThemeProvider>
  );
}
