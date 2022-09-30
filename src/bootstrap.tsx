import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './design/styles/base-styles/base-styles.scss';
import { THEME_DARK } from './design/themes/dark.theme';
import { BaseTheme } from './react/providers/base-theme/BaseTheme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BaseTheme theme={THEME_DARK}>
      <App />
    </BaseTheme>
  </React.StrictMode>
);
