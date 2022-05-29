import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { TextField } from '@mui/material';
import React from 'react';
import { ISignUp } from 'pages/auth/sign-up';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';

interface IPasswordTextField {
  errors: FieldErrors;
  control: Control;
}

export const PasswordTextField = (props: IPasswordTextField) => {
  // 英字と数字と記号が最低1文字必要
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/;
  const passwordRule = {
    required: 'パスワードを入力してください。',
    minLength: {
      value: 8,
      message: 'パスワードは8文字以上で入力してください',
    },
    pattern: {
      value: passwordPattern,
      message: '英字と数字と記号を組み合わせたパスワードを設定してください',
    },
  };
  return (
    <Controller
      name="password"
      control={props.control}
      rules={passwordRule}
      defaultValue={''}
      render={({ field }) => (
        <TextField
          {...field}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={props.errors.password !== undefined}
          helperText={props.errors.password?.message}
        />
      )}
    />
  );
};
