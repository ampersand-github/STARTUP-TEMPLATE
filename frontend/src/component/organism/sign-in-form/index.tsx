import React from 'react';
import { SubmitHandler, UnpackNestedValue, useForm } from 'react-hook-form';
import { Stack, Typography, Button, Box } from '@mui/material';
import { TextForm } from '../../atom/form/text-form';
import { emailRule } from '../../../util/validation-rule/email-rule';
import { passwordRule } from '../../../util/validation-rule/password-rule';
import { PasswordForm } from '../../atom/form/password-form';

interface ISignInForm {
  onSubmit: SubmitHandler<ISignInFormContext>;
}
export interface ISignInFormContext {
  email: string;
  password: string;
}
export const SignInForm = (props: ISignInForm): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInFormContext>();

  const onSubmit: SubmitHandler<ISignInFormContext> = (
    data: UnpackNestedValue<ISignInFormContext>,
  ) => props.onSubmit(data);

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
    >
      <TextForm
        control={control}
        rules={emailRule}
        name={'email'}
        inputType="text"
        label={'メールアドレス'}
        isError={errors.email !== undefined}
        errorText={errors.email?.message}
      />
      <PasswordForm
        control={control}
        rules={passwordRule}
        name={'password'}
        label={'パスワード'}
        isError={errors.password !== undefined}
        errorText={errors.password?.message}
      />
      <Button variant="contained" type="submit">
        <Typography>ログインする</Typography>
      </Button>
    </Stack>
  );
};
