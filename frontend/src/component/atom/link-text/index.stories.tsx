import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LinkText } from './index';

export default {
  title: 'Atom/LinkText',
  component: LinkText,
} as ComponentMeta<typeof LinkText>;

const TemplateStory: ComponentStory<typeof LinkText> = (args) => (
  <LinkText {...args} />
);

export const Default = TemplateStory.bind({});
Default.args = { text: 'linkText', path: 'https://storybook.js.org/' };
