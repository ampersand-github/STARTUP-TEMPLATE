import {AllBook} from "./index";
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Organism/AllBook',
  component: AllBook,
  AllBook
} as ComponentMeta<typeof AllBook>;
const TemplateStory: ComponentStory<typeof AllBook> = () => (
  <AllBook  />
);

export const Default = AllBook.bind({});
