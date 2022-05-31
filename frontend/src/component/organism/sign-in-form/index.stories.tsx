import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ISignInFormContext, SignInForm } from './index';

export default {
  title: 'organism/SignInForm',
  component: SignInForm,
} as ComponentMeta<typeof SignInForm>;

const TemplateStory: ComponentStory<typeof SignInForm> = (args) => (
  <SignInForm {...args} />
);

const onSubmit = (data: ISignInFormContext) => console.log(data);
export const Default = TemplateStory.bind({});
Default.args = { onSubmit: onSubmit };
