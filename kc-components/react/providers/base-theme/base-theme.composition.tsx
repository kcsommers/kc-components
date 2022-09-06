import React from 'react';
import { BaseTheme } from './base-theme';
import { useTheme } from './theme-context';

const Child = () => {
  const { currentTheme, setCurrentTheme } = useTheme();
  console.log('theme::: ', currentTheme);
  return <div>hello world!</div>;
};

export const DefaultTheme = () => {
  return (
    <BaseTheme>
      <Child />
    </BaseTheme>
  );
};
