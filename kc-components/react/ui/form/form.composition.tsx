import { BaseTheme } from '@kcsommers/kc-components.react.providers.base-theme';
import React from 'react';
import { Form } from './form';

export const BasicForm = () => {
  return (
    <BaseTheme>
      <Form
        inputs={[
          {
            id: 'name',
            placeholder: 'Full Name',
            label: {
              text: 'Name',
              for: 'name',
            },
          },
          {
            id: 'email',
            placeholder: 'Email',
            label: {
              text: 'Email',
              for: 'email',
            },
          },
        ]}
        submitButton={{
          text: 'Submit',
        }}
      ></Form>
    </BaseTheme>
  );
};
