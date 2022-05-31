import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SignUpForm } from './index';
import { ISignInFormContext } from '../sign-in-form';

export default {
  title: 'organism/SignUpForm',
  component: SignUpForm,
} as ComponentMeta<typeof SignUpForm>;

const TemplateStory: ComponentStory<typeof SignUpForm> = (args) => (
  <SignUpForm {...args} />
);

const onSubmit = (data: ISignInFormContext) => console.log(data);
export const Default = TemplateStory.bind({});
Default.args = { onSubmit: onSubmit };
