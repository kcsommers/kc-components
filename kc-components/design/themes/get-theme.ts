import { ITheme } from './theme.interface';
import { THEME_DARK } from './dark.theme';
import { THEME_LIGHT } from './light.theme';
import { ThemeNames } from './theme-names.type';

export const getTheme = (theme: ThemeNames): ITheme => {
  const themes = {
    LIGHT: THEME_LIGHT,
    DARK: THEME_DARK,
  };

  return themes[theme] || themes.LIGHT;
};
