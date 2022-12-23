import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './common/design/styles/base-styles.scss';
import { THEME_DARK } from './common/design/themes/dark.theme';
import { BaseTheme } from './react/design/theme/BaseTheme/BaseTheme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BaseTheme theme={THEME_DARK}>
      <App />
    </BaseTheme>
  </React.StrictMode>
);
