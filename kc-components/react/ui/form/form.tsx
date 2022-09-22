import { useKeydown } from '@kcsommers/kc-components.react.hooks';
import { Button, ButtonProps } from '@kcsommers/kc-components.react.ui.button';
import { Input, InputProps } from '@kcsommers/kc-components.react.ui.input';
import { isPromise } from '@kcsommers/kc-components.utils.type-guards';
import { cloneDeep } from 'lodash';
import React, { useMemo, useState } from 'react';

export type FormProps = {
  inputs: Omit<InputProps, 'onChange'>[];
  useCard?: boolean;
  submitButton?: Omit<ButtonProps, 'onClick'>;
  title?: string;
  onSubmit?: (
    e: React.MouseEvent | KeyboardEvent,
    inputValues: Omit<InputProps, 'onChange'>[]
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
  const inputValuesMap = useMemo(
    () => new Map(inputs.map((i) => [i.id, cloneDeep(i)])),
    []
  );
  const [inputMessages, setInputMessages] = useState({});
  const validateForm = (): boolean => {
    let isValid = true;
    const inputMessages = {};
    inputs.forEach((input) => {
      if (!input.validation) {
        return;
      }
      let message = '';
      const inputValue = inputValuesMap.get(input.id)?.value;
      if (input.validation.required && !inputValue && inputValue !== 0) {
        isValid = false;
        message = `*${input.name} required`;
      }
      // @TODO rest of validations
      inputMessages[input.id] = message;
    });
    setInputMessages(inputMessages);
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
    const submitRes = onSubmit(e, Array.from(inputValuesMap.values()));
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
        {inputs.map((inputProps) => (
          <div key={inputProps.id}>
            {inputMessages[inputProps.id] && (
              <p className='text-sm mb-05 text-bold color-danger'>
                {inputMessages[inputProps.id]}
              </p>
            )}
            <Input
              {...inputProps}
              onChange={(e: React.ChangeEvent) => {
                const inputModel = inputValuesMap.get(inputProps.id)!;
                inputModel.value = e.target['value'];
                inputValuesMap.set(inputProps.id, inputModel);
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
