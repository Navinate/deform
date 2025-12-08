import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './button.ts';
const meta: Meta = {
  component: 'deform-button',
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: "Demo",

  },
};