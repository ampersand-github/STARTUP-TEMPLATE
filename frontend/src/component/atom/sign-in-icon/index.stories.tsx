import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SignInIcon } from './index';

export default {
  title: 'Atom/SignInIcon',
  component: SignInIcon,
} as ComponentMeta<typeof SignInIcon>;

const TemplateStory: ComponentStory<typeof SignInIcon> = () => <SignInIcon />;

export const Default = TemplateStory.bind({});
