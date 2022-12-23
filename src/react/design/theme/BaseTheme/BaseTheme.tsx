import classNames from 'classnames';
import { IBaseThemeSchema } from 'kc_components/common/design/themes/base-theme-schema.interface';
import { THEME_LIGHT } from 'kc_components/common/design/themes/light.theme';
import { ITheme } from 'kc_components/common/design/themes/theme.interface';
import React, { ReactNode } from 'react';
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
      {(theme.schema.fontUrls || []).map((url) => (
        <link href={url} rel='stylesheet' />
      ))}
      {children}
    </ThemeProvider>
  );
};
