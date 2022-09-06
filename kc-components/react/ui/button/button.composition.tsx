import { BaseTheme } from '@kcsommers/kc-components.react.providers.base-theme';
import React from 'react';
import { Button } from './button';

export const MediumPrimaryButton = () => {
  return (
    <BaseTheme>
      <Button type="primary">Medium Primary</Button>
    </BaseTheme>
  );
};

export const MediumAccentButton = () => {
  return (
    <BaseTheme>
      <Button>Medium Accent</Button>
    </BaseTheme>
  );
};

export const SmallDangerButton = () => {
  return (
    <BaseTheme>
      <Button type="danger" size="sm">
        Small Danger
      </Button>
    </BaseTheme>
  );
};

export const LoadingButton = () => {
  return (
    <BaseTheme>
      <Button showSpinner={true}>Loading Button</Button>
    </BaseTheme>
  );
};
