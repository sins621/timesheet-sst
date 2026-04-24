import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import OptionButtonSelect from "./option-button-select";
import { OptionItem } from "@/lib/types/common";
import { expect, fn, userEvent, within } from "storybook/test";

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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    await userEvent.click(
      await canvas.findByRole("button", { name: "Label 1" }),
    );
    await expect(args.onClick).toHaveBeenCalledWith("label_1");
  },
};
