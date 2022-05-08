import { TextField } from '@mui/material';
import React from 'react';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { ISignUp } from '../../../pages/auth/sign-up';
import { Control } from 'react-hook-form/dist/types/form';
import { Controller } from 'react-hook-form';

interface IEmailTextField {
  errors: FieldErrors;
  control: Control<ISignUp>;
}

export const EmailTextField = (props: IEmailTextField): JSX.Element => {
  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailRule = {
    required: 'メールアドレスを入力してください。',
    pattern: {
      value: emailPattern,
      message: 'メールアドレスの形式が正しくありません',
    },
  };

  return (
    <Controller
      name="email"
      control={props.control}
      rules={emailRule}
      defaultValue={''}
      render={({ field }) => (
        <TextField
          {...field}
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          error={props.errors.email !== undefined}
          helperText={props.errors.email?.message}
        />
      )}
    />
  );
};
