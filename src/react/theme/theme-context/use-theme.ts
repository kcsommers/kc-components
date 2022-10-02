import { useContext } from 'react';
import { THEME_CONTEXT } from './theme-context';

export const useTheme = () => useContext(THEME_CONTEXT);
