"use client";

import { OptionItem } from "@/lib/types/common";
import { defineStepper } from "@stepperize/react";
import TypeButton from "../buttons/type-button";
import StatusSelect from "../select/status-select";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

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
      <div className="border p-2 flex flex-col gap-2">
        <StubStepperProgress />
        <StubStepperForm />
        <StubStepperNav />
      </div>
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
  const stepper = useStepper();

  return (
    <div className="flex flex-col gap-2">
      <TypeButton
        title="Stationary"
        description="A ticket that has stayed in the same status for the day"
        onClick={() => stepper.navigation.next()}
      />
      <TypeButton
        title="Transitioned"
        description="A ticket that has moved from one status to another"
        onClick={() => stepper.navigation.next()}
      />
    </div>
  );
}

export function StubStepperStatus() {
  const stepper = useStepper();

  const selectOneOptions: OptionItem[] = [
    {
      value: "1",
      label: "Option 1",
    },
    {
      value: "2",
      label: "Option 2",
    },
  ];
  const selectTwoOptions = [
    {
      value: "3",
      label: "Status A",
    },
    {
      value: "4",
      label: "Option 2",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <StatusSelect
        title="Starting Status"
        placeholder="Option 1"
        options={selectOneOptions}
      />
      <StatusSelect
        title="Ending Status"
        placeholder="Option 2"
        options={selectTwoOptions}
      />
      <Button className="w-full" onClick={() => stepper.navigation.next()}>
        Confirm
      </Button>
    </div>
  );
}

export function StubStepperMessage() {
  const messageOptions: OptionItem[] = [
    {
      value: "1",
      label: "Option 1",
    },
    {
      value: "2",
      label: "Option 2",
    },
    {
      value: "3",
      label: "Status A",
    },
    {
      value: "4",
      label: "Option 2",
    },
  ];

  return (
    <div className="flex flex-col gap-2 justify-items-center">
      {messageOptions.map((option) => (
        <button key={option.value} className="border p-2">
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}

export function StubStepperProgress() {
  const stepper = useStepper();

  const title = stepper.state.current.data.title;
  const stepOneProgress = stepper.state.isFirst ? 0 : 100;
  const stepTwoProgress = stepper.state.isLast ? 100 : 0;

  return (
    <div className="grid grid-cols-3 gap-2 p-1 w-full">
      <Progress
        onClick={() => stepper.navigation.goTo("type")}
        value={stepOneProgress}
      />
      <Progress
        onClick={() => stepper.navigation.goTo("status")}
        value={stepTwoProgress}
      />
      <Progress onClick={() => stepper.navigation.goTo("message")} value={0} />
    </div>
  );
}
