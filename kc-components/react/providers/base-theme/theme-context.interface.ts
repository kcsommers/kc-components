import { ITheme } from '@kcsommers/kc-components.design.themes';

export interface IThemeContext {
  currentTheme: ITheme;
  setCurrentTheme: React.Dispatch<React.SetStateAction<ITheme>>;
}
