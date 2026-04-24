import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TicketType } from "@/lib/types/entities";
import { useState } from "react";
import { userEvent, within } from "storybook/test";
import {
  StubStepperDualStatus,
  StubStepperForm,
  StubStepperMessage,
  StubStepperNav,
  StubStepperProgress,
  StubStepperRoot,
  StubStepperSingleStatus,
  StubStepperType,
} from "./stub-stepper";

const statusOptionsA = [
  { label: "To do", value: "to-do" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
];

const statusOptionsB = [
  { label: "To do", value: "to-do" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
];

const messageOptions = [
  { label: "Today I began working on...", value: "began", onClick: () => {} },
  { label: "Today I worked on...", value: "worked", onClick: () => {} },
  { label: "Today I completed...", value: "completed", onClick: () => {} },
  { label: "Today I reviewed...", value: "reviewed", onClick: () => {} },
];

function StubStepperStoryFlow() {
  const [type, setType] = useState<TicketType | null>(null);

  return (
    <StubStepperRoot>
      <StubStepperProgress />
      <StubStepperForm>
        {({ stepper }) =>
          stepper.flow.switch({
            type: () => (
              <StubStepperType
                onStationaryClick={() => {
                  setType(TicketType.stationary);
                  stepper.navigation.next();
                }}
                onTransitionedClick={() => {
                  setType(TicketType.transitioned);
                  stepper.navigation.next();
                }}
              />
            ),
            status:
              type === TicketType.stationary
                ? () => (
                    <StubStepperSingleStatus
                      options={statusOptionsA}
                      onConfirm={() => stepper.navigation.next()}
                    />
                  )
                : () => (
                    <StubStepperDualStatus
                      optionsA={statusOptionsA}
                      optionsB={statusOptionsB}
                      onConfirm={() => stepper.navigation.next()}
                    />
                  ),
            message: () => (
              <StubStepperMessage messageOptions={messageOptions} />
            ),
          })
        }
      </StubStepperForm>
      <StubStepperNav />
    </StubStepperRoot>
  );
}

const meta = {
  component: StubStepperRoot,
  render: StubStepperStoryFlow,
} satisfies Meta<typeof StubStepperStoryFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const StationaryFlow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    await userEvent.click(
      await canvas.findByRole("button", {
        name: "Stationary A ticket that has stayed in the same status for the day",
      }),
    );
    await userEvent.click(await canvas.findByRole("combobox"));
    await userEvent.click(
      await canvas.findByText("In Progress", { exact: true }),
    );
    await userEvent.click(
      await canvas.findByRole("button", { name: "Confirm" }),
    );
    await userEvent.click(
      await canvas.findByRole("button", {
        name: "Today I began working on...",
      }),
    );
  },
};

export const TransitionedFlow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    await userEvent.click(
      await canvas.findByRole("button", {
        name: "Transitioned A ticket that has moved from one status to another",
      }),
    );
    await userEvent.click((await canvas.findAllByRole("combobox"))[0]);
    await userEvent.click(
      await canvas.findByText("In Progress", { exact: true }),
    );
    await userEvent.click((await canvas.findAllByRole("combobox"))[1]);
    await userEvent.click(
      (await canvas.findAllByText("Done", { exact: true }))[1],
    );
    await userEvent.click(
      await canvas.findByRole("button", { name: "Confirm" }),
    );
    await userEvent.click(
      await canvas.findByRole("button", { name: "Today I completed..." }),
    );
  },
};
