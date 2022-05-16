import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BaseLayout, IBaseLayout } from './index';

export default {
  title: 'Template/BaseLayout',
  component: BaseLayout,
} as ComponentMeta<typeof BaseLayout>;

const TemplateStory: ComponentStory<typeof BaseLayout> = (
  args: IBaseLayout,
) => <BaseLayout {...args} />;

export const Default = TemplateStory.bind({});
Default.args = { children: <div>aaa</div> };
