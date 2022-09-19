import { Button, ButtonProps } from '@kcsommers/kc-components.react.ui.button';
import { Input, InputProps } from '@kcsommers/kc-components.react.ui.input';
import { isPromise } from '@kcsommers/kc-components.utils.type-guards';
import React, { useMemo, useState } from 'react';

export type FormProps = {
  inputs: Omit<InputProps, 'onChange'>[];
  useCard?: boolean;
  submitButton?: Omit<ButtonProps, 'onClick'>;
  title?: string;
  onSubmit?: (
    e: React.MouseEvent,
    inputValues: [string, any][]
  ) => void | Promise<{ successMessage: string; errorMessage: string }>;
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
    () => new Map(inputs.map((i) => [i.id, i.value])),
    []
  );

  const submitForm = (e: React.MouseEvent) => {
    setErrorMessage('');
    setSuccessMessage('');
    if (!onSubmit) {
      return;
    }
    const submitRes = onSubmit(e, Array.from(inputValuesMap.entries()));
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
        });
    }
  };

  return (
    <form className='flex-1'>
      {title && <h1>{title}</h1>}
      <div className={`${useCard ? 'card' : ''}`}>
        {inputs.map((inputProps) => (
          <Input
            {...inputProps}
            onChange={(e: React.ChangeEvent) => {
              inputValuesMap.set(inputProps.id, e.target['value']);
            }}
          />
        ))}
        <Button
          onClick={submitForm}
          showSpinner={isLoading}
          {...submitButton}
        />
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
      </div>
    </form>
  );
};
