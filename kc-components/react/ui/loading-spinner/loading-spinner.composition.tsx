import { BaseTheme } from '@kcsommers/kc-components.react.providers.base-theme';
import React from 'react';
import { LoadingSpinner } from './loading-spinner';

export const LargePrimarySpinner = () => {
  return (
    <BaseTheme>
      <LoadingSpinner size="lg" />
    </BaseTheme>
  );
};

export const MediumAccentSpinner = () => {
  return (
    <BaseTheme>
      <LoadingSpinner color="accent1" size="md" />
    </BaseTheme>
  );
};

export const SmallPrimarySpinner = () => {
  return (
    <BaseTheme>
      <LoadingSpinner size="sm" />
    </BaseTheme>
  );
};
