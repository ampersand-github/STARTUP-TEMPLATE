import { TextField } from '@mui/material';
import React from 'react';
import { useController, Control } from 'react-hook-form';

// https://www.w3schools.com/tags/att_input_type.asp
type InputType = 'email' | 'text' | 'password';

interface ITextForm {
  control: Control<any>;
  name: string;
  label: string;
  rules: any;
  isError: boolean;
  errorText: string | undefined;
  placeholder?: string;
  inputType: InputType;
}

export const TextForm = (props: ITextForm): JSX.Element => {
  const { field } = useController({
    control: props.control,
    name: props.name,
    rules: props.rules,
  });

  return (
    <TextField
      id={field.name} // id="password"
      name={field.name}
      label={props.label}
      type={props.inputType}
      onChange={field.onChange}
      error={props.isError}
      helperText={props.errorText}
      value={field.value || ''}
      placeholder={props.placeholder}
    />
  );
};
