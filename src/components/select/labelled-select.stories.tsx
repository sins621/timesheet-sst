import { OptionItem } from "@/lib/types/common";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import LabelledSelect from "./labelled-select";

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
  component: LabelledSelect,
} satisfies Meta<typeof LabelledSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Component Title",
    placeholder: "Placeholder value",
    options: options,
    onValueChange: fn(),
    value: "value",
    triggerAriaLabel: "Component Aria Label",
  },
};
