import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Header } from './index';
import React from 'react';

export default {
  title: 'Organism/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const TemplateStory: ComponentStory<typeof Header> = (args) => (
  <Header {...args} />
);

export const SignInEd = TemplateStory.bind({});
SignInEd.args = {
  isAuth: true,
  signInUrl: 'string',
  signUpUrl: 'string',
  onSignOut: () => new Promise<void>(() => {}),
};

export const NotSignIn = TemplateStory.bind({});
NotSignIn.args = {
  isAuth: false,
  signInUrl: 'string',
  signUpUrl: 'string',
  onSignOut: () => new Promise<void>(() => {}),
};
