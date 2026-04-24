import { TicketType } from "@/lib/types/entities";
import TypeSelect from "./type-select";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { userEvent, expect, fn } from "storybook/test";

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

export const StationaryClickedTest: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ args, canvas }) => {
    await userEvent.click(
      await canvas.findByRole("button", {
        name: "Stationary A ticket that has stayed in the same status for the day",
      }),
    );
    await expect(args.onClick).toHaveBeenCalledWith(TicketType.stationary);
  },
};

export const TransitionClickedTest: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ args, canvas }) => {
    await userEvent.click(
      await canvas.findByRole("button", {
        name: "Transitioned A ticket that has moved from one status to another",
      }),
    );
    await expect(args.onClick).toHaveBeenCalledWith(TicketType.transitioned);
  },
};
