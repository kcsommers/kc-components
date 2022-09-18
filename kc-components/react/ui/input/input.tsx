import React, { ReactNode, useState } from 'react';

export type InputProps = {
  id: string;
  type?: string;
  value?: any;
  name?: string;
  placeholder?: string;
  label?: {
    text: string;
    for: string;
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
  onChange,
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
    <label htmlFor={label.for}>
      {label.text}
      {inputEl}
    </label>
  ) : (
    inputEl
  );
};
