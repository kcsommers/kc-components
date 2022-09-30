import { BaseTheme } from '@kcsommers/kc-components.react.providers.base-theme';
import React from 'react';
import { Button } from './button';

export const MediumPrimaryButton = () => {
  return (
    <BaseTheme>
      <Button type='primary' text='Medium Primary' />
    </BaseTheme>
  );
};

export const MediumAccentButton = () => {
  return (
    <BaseTheme>
      <Button text='Medium Accent' />
    </BaseTheme>
  );
};

export const SmallDangerButton = () => {
  return (
    <BaseTheme>
      <Button type='danger' size='sm' text='Small Danger' />
    </BaseTheme>
  );
};

export const LoadingButton = () => {
  return (
    <BaseTheme>
      <Button showSpinner={true} text='Loading Button' />
    </BaseTheme>
  );
};
