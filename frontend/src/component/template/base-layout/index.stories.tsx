import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BaseLayout, IBaseLayout } from './index';
import { IHeader } from '../../organism/header';

export default {
  title: 'Template/BaseLayout',
  component: BaseLayout,
} as ComponentMeta<typeof BaseLayout>;

const TemplateStory: ComponentStory<typeof BaseLayout> = (
  args: IBaseLayout,
) => <BaseLayout {...args} />;

export const Default = TemplateStory.bind({});
const header: IHeader = {
  isAuth: false,
  signInUrl: 'string',
  signUpUrl: 'string',
  onSignOut: new Promise(() => {}),
};
Default.args = { children: <div>aaa</div>, header: header };
