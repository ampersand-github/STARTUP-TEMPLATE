import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CustomButton } from './index';

export default {
  title: 'Atom/CustomButton',
  component: CustomButton,
} as ComponentMeta<typeof CustomButton>;

const TemplateStory: ComponentStory<typeof CustomButton> = (args) => (
  <CustomButton {...args} />
);

export const Default = TemplateStory.bind({});
Default.args = { text: 'text', onClick: new Promise<void>(() => {}) };
