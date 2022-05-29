import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {CustomLinkButton} from "./index";


export default {
    title: 'Atom/CustomLinkButton',
    component: CustomLinkButton,
} as ComponentMeta<typeof CustomLinkButton>;

const TemplateStory: ComponentStory<typeof CustomLinkButton> = (args) => (
    <CustomLinkButton {...args} />
);

export const Default = TemplateStory.bind({});
Default.args = { text: 'text', link:"" };
