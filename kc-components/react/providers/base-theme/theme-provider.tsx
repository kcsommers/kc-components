import { IBaseThemeSchema, ITheme, THEME_LIGHT } from '@kcsommers/kc-components.design.themes';
import React, { useMemo, useState } from 'react';
import { THEME_CONTEXT } from './theme-context';

export function computeCssVars<T>(
  theme: T,
  prefix?: string
): React.CSSProperties {
  return Object.entries(theme)
    .map(([key, val]) => {
      const varName = key.replace(/[A-Z]/g, '-$&').toLowerCase();
      const varKey = prefix ? `--${prefix}-${varName}` : `--${varName}`;
      return [varKey, val];
    })
    .reduce((acc, [key, val]) => {
      acc[key] = val;
      return acc;
    }, {});
}

export type ThemeProviderProps = {
  theme?: ITheme;
  overrides?: Partial<IBaseThemeSchema>;
} & React.HTMLAttributes<HTMLDivElement>;

export const ThemeProvider = ({
  children,
  overrides,
  style,
  theme = THEME_LIGHT,
  ...rest
}: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<ITheme>(theme);
  const cssVars = computeCssVars(currentTheme.schema);

  const value = useMemo(() => {
    return {
      currentTheme,
      setCurrentTheme,
    };
  }, [currentTheme]);

  return (
    <div
      style={{
        ...cssVars,
        ...style,
      }}
      {...rest}
    >
      <THEME_CONTEXT.Provider value={value}>{children}</THEME_CONTEXT.Provider>
    </div>
  );
};
