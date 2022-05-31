import React from 'react';
import {
  useForm,
  SubmitHandler,
  Control,
  UnpackNestedValue,
} from 'react-hook-form';
import { Stack, Typography, Button } from '@mui/material';
import { ISignInFormContext } from '../sign-in-form';
import { TextForm } from '../../atom/form/text-form';
import { emailRule } from '../../../util/validation-rule/email-rule';
import { passwordRule } from '../../../util/validation-rule/password-rule';
import { PasswordForm } from '../../atom/form/password-form';

interface ISignUpForm {
  onSubmit: SubmitHandler<ISignUpFormContext>;
}
export interface ISignUpFormContext {
  email: string;
  password: string;
}
export const SignUpForm = (props: ISignUpForm): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormContext>();

  const onSubmit: SubmitHandler<ISignUpFormContext> = (
    data: UnpackNestedValue<ISignUpFormContext>,
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
        <Typography>新規登録する</Typography>
      </Button>
    </Stack>
  );
};
