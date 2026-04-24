import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LabelledSelect from "./labelled-select";
import { fn, expect, userEvent, within } from "storybook/test";
import { OptionItem } from "@/lib/types/common";

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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);

    await userEvent.click(
      await canvas.findByRole("combobox", { name: "Component Aria Label" }),
    );
    await userEvent.click(
      await canvas.findByRole("option", { name: "Select Item Label 1" }),
    );
    await expect(args.onValueChange).toHaveBeenCalledWith(
      "label_1",
      expect.anything(),
    );
  },
};
