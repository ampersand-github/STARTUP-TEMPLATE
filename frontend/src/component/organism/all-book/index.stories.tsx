import { AllBook } from './index';
import { ComponentMeta } from '@storybook/react';

export default {
  title: 'Organism/AllBook',
  component: AllBook,
  AllBook,
} as ComponentMeta<typeof AllBook>;

export const Default = AllBook.bind({});
