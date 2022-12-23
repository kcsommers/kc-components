import React, { useState } from 'react';

export type InputProps = {
  id: string;
  value: any;
  type?: string;
  name?: string;
  placeholder?: string;
  label?: {
    text: string;
    for: string;
  };
  errorMessage: string;
  validator?: (value: string) => string; // return error message if invalid, nothing if valid
  onChange?: (e: React.ChangeEvent) => void;
};

export const Input = ({
  type = 'text',
  value,
  name,
  id,
  placeholder,
  label,
  errorMessage,
  onChange
}: InputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const inputValueChanged = (e: React.ChangeEvent) => {
    setInputValue(e.target['value']);
    onChange && onChange(e);
  };

  const inputEl = (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={inputValue}
      onChange={inputValueChanged}
    />
  );

  return label ? (
    <>
      <label className='mb-05 cursor-pointer' htmlFor={label.for}>
        <span className='d-inline-flex'>
          {label.text}
          {errorMessage && (
            <p className='text-sm color-danger text-light ml-05'>
              {errorMessage}
            </p>
          )}
        </span>
      </label>
      {inputEl}
    </>
  ) : (
    <>
      {errorMessage && (
        <p className='text-sm mb-05 color-danger'>{errorMessage}</p>
      )}
      {inputEl}
    </>
  );
};
