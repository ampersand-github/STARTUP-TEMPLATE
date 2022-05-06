import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Header } from './index';

export default {
  title: 'Organism/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const TemplateStory: ComponentStory<typeof Header> = () => (
  <Header/>
);

export const Default = TemplateStory.bind({});
