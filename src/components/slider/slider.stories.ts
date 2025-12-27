import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './slider';

const meta: Meta = {
  title: 'Components/LightRangeSlider',
  component: 'light-range-slider',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <light-range-slider></light-range-slider>
  `,
};
