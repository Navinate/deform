import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './test-element.ts';
const meta: Meta = {
  component: 'test-element',
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: 'Hello World',
  },
};