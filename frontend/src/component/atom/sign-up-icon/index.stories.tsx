import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SignUpIcon } from './index';

export default {
  title: 'Atom/SignUpIcon',
  component: SignUpIcon,
} as ComponentMeta<typeof SignUpIcon>;

const TemplateStory: ComponentStory<typeof SignUpIcon> = () => <SignUpIcon />;

export const Default = TemplateStory.bind({});
