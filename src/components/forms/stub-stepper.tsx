"use client";

import { defineStepper } from "@stepperize/react";

const { Scoped, useStepper } = defineStepper(
  {
    id: "type",
    title: "Ticket Type",
  },
  {
    id: "status",
    title: "Indicate Status",
  },
  {
    id: "message",
    title: "Message",
  },
);

export function StubStepperRoot() {
  return (
    <Scoped>
      <StubStepperForm />
      <StubStepperNav />
    </Scoped>
  );
}

export function StubStepperForm() {
  const stepper = useStepper();

  const onValid = () => {
    if (!stepper.state.isLast) stepper.navigation.next();
  };

  return (
    <>
      {stepper.flow.switch({
        type: () => <StubStepperType />,
        status: () => <StubStepperStatus />,
        message: () => <StubStepperMessage />,
      })}
    </>
  );
}

export function StubStepperNav() {
  return <div></div>;
}

export function StubStepperType() {
  return <div></div>;
}

export function StubStepperStatus() {
  return <div></div>;
}

export function StubStepperMessage() {
  return <div></div>;
}
