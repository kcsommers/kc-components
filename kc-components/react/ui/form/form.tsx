import { useKeydown } from '@kcsommers/kc-components.react.hooks';
import { Button, ButtonProps } from '@kcsommers/kc-components.react.ui.button';
import { Input, InputProps } from '@kcsommers/kc-components.react.ui.input';
import { isPromise } from '@kcsommers/kc-components.utils.type-guards';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';

type FormInputConfig = Omit<InputProps, 'onChange'>;

export type FormProps = {
  inputs: Omit<InputProps, 'onChange'>[];
  useCard?: boolean;
  submitButton?: Omit<ButtonProps, 'onClick'>;
  title?: string;
  onSubmit?: (
    e: React.MouseEvent | KeyboardEvent,
    inputValues: FormInputConfig[]
  ) => void | Promise<{ successMessage?: string; errorMessage?: string }>;
};

export const Form = ({
  inputs,
  useCard = false,
  title,
  submitButton,
  onSubmit,
}: FormProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputsMap, setInputMap] = useState<{
    [inputId: string]: FormInputConfig;
  }>(
    inputs?.reduce((map, input) => {
      map[input.id] = cloneDeep(input);
      return map;
    }, {})
  );
  const validateForm = (): boolean => {
    let isValid = true;
    const newMap: {
      [inputId: string]: FormInputConfig;
    } = {};
    Object.values(inputsMap).forEach((input) => {
      if (!input.validation) {
        return;
      }
      let message = '';
      if (input.validation.required && !input.value && input.value !== 0) {
        isValid = false;
        message = `*Required`;
      }
      input.validation.message = message;
      newMap[input.id] = input;
      // @TODO rest of validations
    });
    setInputMap(newMap);
    return isValid;
  };

  const submitForm = (e: React.MouseEvent | KeyboardEvent) => {
    const formValid = validateForm();
    if (!formValid) {
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    if (!onSubmit) {
      return;
    }
    const submitRes = onSubmit(e, Array.from(Object.values(inputsMap)));
    if (isPromise(submitRes)) {
      setIsLoading(true);
      submitRes
        .then((res) => {
          setIsLoading(false);
          if (res.successMessage) {
            setSuccessMessage(res.successMessage);
          } else if (res.errorMessage) {
            setErrorMessage(res.errorMessage);
          }
        })
        .catch(() => {
          setIsLoading(false);
          setErrorMessage('Unexpected error submitting form');
        });
    }
  };

  useKeydown('Enter', submitForm);

  return (
    <form className='flex-1'>
      <div className={`${useCard ? 'card' : ''}`}>
        {title && <h2>{title}</h2>}
        {Object.values(inputsMap).map((inputProps) => (
          <div key={inputProps.id}>
            <Input
              {...inputProps}
              onChange={(e: React.ChangeEvent) => {
                inputsMap[inputProps.id].value = e.target['value'];
              }}
            />
          </div>
        ))}
        {errorMessage && (
          <p className='text-sm mb-05 text-bold color-danger'>{errorMessage}</p>
        )}
        {successMessage && (
          <p className='text-sm mb-05 text-bold color-success'>
            {successMessage}
          </p>
        )}
        <Button
          onClick={submitForm}
          showSpinner={isLoading}
          {...submitButton}
        />
      </div>
    </form>
  );
};
