import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import StatusSelect from "./status-select";

const meta = {
  component: StatusSelect,
} satisfies Meta<typeof StatusSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "title",
    placeholder: "placeholder",
    options: [
      {
        label: "label",
        value: "value",
      },
    ],
  },
};
