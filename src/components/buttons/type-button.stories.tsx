import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TypeButton from "./type-button";
import { fn } from "storybook/test";

const meta = {
  component: TypeButton,
} satisfies Meta<typeof TypeButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Title",
    description: "This is a long description for the button",
    onClick: fn(),
  },
};
