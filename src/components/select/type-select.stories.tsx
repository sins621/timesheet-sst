import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import TypeSelect from "./type-select";

const meta = {
  component: TypeSelect,
} satisfies Meta<typeof TypeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: fn(),
  },
};
