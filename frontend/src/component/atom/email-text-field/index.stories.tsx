import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { EmailTextField } from './index';
import { useForm } from 'react-hook-form';

export default {
  title: 'Atom/EmailTextField',
  component: EmailTextField,
} as ComponentMeta<typeof EmailTextField>;

export const Default = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailTextField control={control} errors={errors} />
      <input type="submit" />
    </form>
  );
};
