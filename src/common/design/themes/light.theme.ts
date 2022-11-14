import Color from 'color';
import { ITheme } from './theme.interface';

/**
 * maintained by design tokens go here!
 * the designer.
 */

const primaryColor = '#2b6777';
const accent1Color = '#52ab98';
const accent2Color = '#c8d8e4';
const foregroundColor = '#313030';
const backgroundColor = '#ffffff';
const bgOnBgColor = Color(backgroundColor).darken(0.1).toString();
const successColor = '#22bc33';
const dangerColor = '#cc0023';
const warningColor = '#FFC640';

export const THEME_LIGHT: ITheme = {
  name: 'LIGHT',
  schema: {
    borderRadius: '3px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    primaryColor,
    primaryActiveColor: Color(primaryColor).lighten(0.5).toString(),
    onPrimaryColor: backgroundColor,
    successColor,
    successActiveColor: Color(successColor).darken(0.15).toString(),
    onSuccessColor: backgroundColor,
    dangerColor,
    dangerActiveColor: Color(dangerColor).darken(0.15).toString(),
    onDangerColor: backgroundColor,
    warningColor,
    warningActiveColor: Color(warningColor).darken(0.15).toString(),
    onWarningColor: backgroundColor,
    accent1Color,
    accent1ActiveColor: Color(accent1Color).darken(0.15).toString(),
    onAccent1Color: backgroundColor,
    accent2Color,
    accent2ActiveColor: Color(accent2Color).darken(0.15).toString(),
    onAccent2Color: backgroundColor,
    backgroundColor,
    bgOnBgColor,
    foregroundColor
  }
};
