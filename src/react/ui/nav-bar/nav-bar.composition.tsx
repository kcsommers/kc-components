import { BaseTheme } from '@kcsommers/kc-components.react.providers.base-theme';
import React from 'react';
import { NavBar } from './nav-bar';

export const BasicNavBar = () => {
  return (
    <BaseTheme>
      <NavBar
        childrenLeft={<div>Logo Here</div>}
        childrenRight={
          <>
            <a href='#'>Log In</a>
            <a style={{ marginLeft: '1rem' }} href='#'>
              Register
            </a>
          </>
        }
      ></NavBar>
    </BaseTheme>
  );
};
