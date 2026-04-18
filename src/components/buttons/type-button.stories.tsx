import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TypeButton from './type-button';

const meta = {
  component: TypeButton,
} satisfies Meta<typeof TypeButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};