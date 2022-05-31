import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { TextForm } from './index';
import { useForm } from 'react-hook-form';
import { emailRule } from '../../../../util/validation-rule/email-rule';

export default {
  title: 'Atom/Form/TextForm',
  component: TextForm,
} as ComponentMeta<typeof TextForm>;

interface IDefault {
  email: string;
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
      <TextForm
        control={control}
        rules={emailRule}
        name={'email'}
        inputType="text"
        label={'メールアドレス'}
        isError={errors.email !== undefined}
        errorText={errors.email?.message}
      />
      <input type="submit" />
    </form>
  );
};
