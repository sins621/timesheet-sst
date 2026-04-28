"use client";

import { OptionItem } from "@/lib/types/common";
import { defineStepper } from "@stepperize/react";
import { type ReactNode } from "react";
import TypeButton from "../buttons/type-button";
import { Progress } from "../ui/progress";

const { Scoped: StubStepperScope, useStepper: useStubStepper } = defineStepper(
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

type StubStepperRootProps = {
  children?: ReactNode;
};

export function StubStepperRoot(props: StubStepperRootProps) {
  return (
    <StubStepperScope>
      <div className="border p-2 flex flex-col gap-2 rounded-lg">
        {props.children}
      </div>
    </StubStepperScope>
  );
}

type StubStepperFormProps = {
  children?:
    | ReactNode
    | ((props: { stepper: ReturnType<typeof useStubStepper> }) => ReactNode);
};

export function StubStepperForm(props: StubStepperFormProps) {
  const stepper = useStubStepper();

  if (typeof props.children === "function") {
    return <>{props.children({ stepper })}</>;
  }

  return <>{props.children}</>;
}

export function StubStepperNav() {
  return <div></div>;
}

type StubStepperTypeProps = {
  onStationaryClick: () => void;
  onTransitionedClick: () => void;
};

export function StubStepperType(props: StubStepperTypeProps) {
  return (
    <div className="flex flex-col gap-2">
      <TypeButton
        title="Stationary"
        description="A ticket that has stayed in the same status for the day"
        onClick={props.onStationaryClick}
      />
      <TypeButton
        title="Transitioned"
        description="A ticket that has moved from one status to another"
        onClick={props.onTransitionedClick}
      />
    </div>
  );
}

export function StubStepperSingleStatus() {
  return <div>wip</div>;
}

export function StubStepperDualStatus() {
  return <div>wip</div>;
}

type StubStepperMessageProps = {
  messageOptions: Array<
    OptionItem & {
      onClick: (value: string) => void;
    }
  >;
};

export function StubStepperMessage(props: StubStepperMessageProps) {
  return (
    <div className="flex flex-col gap-2 justify-items-center">
      {props.messageOptions.map((option) => (
        <button
          onClick={() => option.onClick(option.value)}
          key={option.value}
          className="border p-2"
        >
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}

export function StubStepperProgress() {
  const stepper = useStubStepper();

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

export { StubStepperScope, useStubStepper };
