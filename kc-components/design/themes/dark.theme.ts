import Color from 'color';
import { ITheme } from './theme.interface';

/**
 * maintained by design tokens go here!
 * the designer.
 */

const primaryColor = '#de5499';
const accent1Color = '#eddcd9';
const accent2Color = '#e99f4c';
const foregroundColor = '#ffffff';
const backgroundColor = '#313030';
const bgOnBgColor = Color(backgroundColor).lighten(0.35).toString();
const successColor = '#22bc33';
const dangerColor = '#cc0023';
const warningColor = '#FFC640';

export const THEME_DARK: ITheme = {
  name: 'DARK',
  schema: {
    borderRadius: '3px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    primaryColor,
    primaryActiveColor: Color(primaryColor).darken(0.15).toString(),
    onPrimaryColor: foregroundColor,
    successColor,
    successActiveColor: Color(successColor).darken(0.15).toString(),
    onSuccessColor: foregroundColor,
    dangerColor,
    dangerActiveColor: Color(dangerColor).darken(0.15).toString(),
    onDangerColor: foregroundColor,
    warningColor,
    warningActiveColor: Color(warningColor).darken(0.15).toString(),
    onWarningColor: foregroundColor,
    accent1Color,
    accent1ActiveColor: Color(accent1Color).darken(0.15).toString(),
    onAccent1Color: foregroundColor,
    accent2Color,
    accent2ActiveColor: Color(accent2Color).darken(0.15).toString(),
    onAccent2Color: foregroundColor,
    backgroundColor,
    bgOnBgColor,
    foregroundColor,
  },
};
