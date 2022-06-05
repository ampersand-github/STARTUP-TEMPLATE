import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { PasswordForm } from './index';
import { useForm } from 'react-hook-form';
import { passwordRule } from 'src/service/validation-rule/password-rule';

export default {
  title: 'Atom/Form/PasswordForm',
  component: PasswordForm,
} as ComponentMeta<typeof PasswordForm>;

interface IDefault {
  password: string;
}
export const Default = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IDefault>();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordForm
        control={control}
        rules={passwordRule}
        name={'password'}
        label={'パスワード'}
        isError={errors.password !== undefined}
        errorText={errors.password?.message}
      />
      <input type="submit" />
    </form>
  );
};
