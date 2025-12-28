import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './color-toggle';

const meta: Meta = {
  title: 'Experiments/Color Toggle',
  component: 'color-toggle',
  parameters: {
    layout: 'centered',
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      description: {
        component: `
A deceptive binary toggle.

Each interaction advances color perceptually through OKLCH hue space.
State is not preserved; only motion is.
`
      }
    }
  }
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <color-toggle></color-toggle>
  `
};

export const MultipleInstances: Story = {
  render: () => html`
    <div style="display: grid; gap: 2rem;">
      <color-toggle></color-toggle>
      <color-toggle></color-toggle>
      <color-toggle></color-toggle>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Multiple instances do not synchronize.

Each toggle drifts independently, reinforcing the lack of stable global theme.
`
      }
    }
  }
};

export const FramedContext: Story = {
  render: () => html`
    <div
      style="
        padding: 3rem;
        border: 1px dashed currentColor;
        max-width: 800px;
      "
    >
      <color-toggle></color-toggle>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
The component provides its own chromatic context and does not adapt
to surrounding color systems.
`
      }
    }
  }
};
