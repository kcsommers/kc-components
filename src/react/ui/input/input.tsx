import React, { ReactNode, useState } from 'react';

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
  validation?: {
    required?: boolean;
    pattern?: string;
    min?: number;
    max?: number;
    message?: string;
  };
  onChange?: (e: React.ChangeEvent) => void;
};

export const Input = ({
  type = 'text',
  value,
  name,
  id,
  placeholder,
  label,
  validation,
  onChange,
}: InputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const inputValueChanged = (e: React.ChangeEvent) => {
    setInputValue(e.target['value']);
    onChange && onChange(e);
  };

  console.log();
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
    <label htmlFor={label.for}>
      <span className='flex'>
        {label.text}
        {validation?.message && (
          <p className='text-sm color-danger text-light ml-05'>
            {validation.message}
          </p>
        )}
      </span>
      {inputEl}
    </label>
  ) : (
    <>
      {validation?.message && (
        <p className='text-sm mb-05 color-danger'>{validation.message}</p>
      )}
      {inputEl}
    </>
  );
};
