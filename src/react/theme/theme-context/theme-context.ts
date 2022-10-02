import { createContext } from 'react';
import { IThemeContext } from './theme-context.interface';

export const THEME_CONTEXT = createContext<IThemeContext>({} as IThemeContext);
