import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StubStepperRoot } from "./stub-stepper";

const meta = {
  component: StubStepperRoot,
} satisfies Meta<typeof StubStepperRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
