import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import {PasswordTextField} from "./index";

export default {
  title: 'Atom/PasswordTextField',
  component: PasswordTextField,
} as ComponentMeta<typeof PasswordTextField>;

export const Default = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordTextField control={control} errors={errors} />
      <input type="submit" />
    </form>
  );
};
