import { OptionItem } from "@/lib/types/common";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import OptionButtonSelect from "./option-button-select";

const options: OptionItem[] = [
  {
    label: "Label 1",
    value: "label_1",
  },
  {
    label: "Label 2",
    value: "label_2",
  },
  {
    label: "Label 3",
    value: "label_3",
  },
];

const meta = {
  component: OptionButtonSelect,
} satisfies Meta<typeof OptionButtonSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options,
    onClick: fn(),
  },
};
