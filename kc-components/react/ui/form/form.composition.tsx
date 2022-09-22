import { BaseTheme } from '@kcsommers/kc-components.react.providers.base-theme';
import React from 'react';
import { Form } from './form';
import '@kcsommers/kc-components.design.styles.base-styles';

export const FormWithLabels = () => {
  return (
    <BaseTheme>
      <Form
        title='Basic Form'
        useCard={true}
        inputs={[
          {
            id: 'name',
            name: 'Name',
            placeholder: 'Full Name',
            label: {
              text: 'Name',
              for: 'name',
            },
            validation: {
              required: true,
            },
            value: '',
          },
          {
            id: 'email',
            name: 'Email',
            placeholder: 'Email',
            label: {
              text: 'Email',
              for: 'email',
            },
            validation: {
              required: true,
            },
            value: '',
          },
        ]}
        submitButton={{
          text: 'Submit',
        }}
        onSubmit={(e, submittedInputs) =>
          new Promise((res) => {
            setTimeout(() => {
              res({
                successMessage: 'Form Submitted Successfully',
              });
              console.log('submitted inputs:::: ', submittedInputs);
            }, 3000);
          })
        }
      />
    </BaseTheme>
  );
};

export const FormNoLabels = () => {
  return (
    <BaseTheme>
      <Form
        title='Basic Form'
        useCard={true}
        inputs={[
          {
            id: 'name',
            name: 'Name',
            placeholder: 'Full Name',
            validation: {
              required: true,
            },
            value: '',
          },
          {
            id: 'email',
            name: 'Email',
            placeholder: 'Email',
            validation: {
              required: true,
            },
            value: '',
          },
        ]}
        submitButton={{
          text: 'Submit',
        }}
        onSubmit={(e, submittedInputs) =>
          new Promise((res) => {
            setTimeout(() => {
              res({
                successMessage: 'Form Submitted Successfully',
              });
              console.log('submitted inputs:::: ', submittedInputs);
            }, 3000);
          })
        }
      />
    </BaseTheme>
  );
};
