"use client";

import { stubInputSchema } from "@/lib/schemas/forms";
import {
  StubMessageInputSchema,
  StubStatusInputSchema,
  StubTypeInputSchema
} from "@/lib/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { defineStepper } from "@stepperize/react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

const { Scoped, useStepper } = defineStepper(
  {
    id: "type",
    title: "Ticket Type",
    schema: stubInputSchema.pick({ type: true }),
  },
  {
    id: "status",
    title: "Indicate Status",
    schema: stubInputSchema.pick({ statusA: true, statusB: true }),
  },
  {
    id: "message",
    title: "Message",
    schema: stubInputSchema.pick({ messageTemplate: true }),
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
  const schema = stepper.state.current.data.schema;

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "",
      statusA: "",
      statusB: "",
      messageTemplate: "",
    },
  });

  const onValid = () => {
    if (!stepper.state.isLast) stepper.navigation.next();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((value) => {
          onValid();
          console.log(value);
        })}
      >
        {stepper.flow.switch({
          type: () => <StubStepperType />,
          status: () => <StubStepperStatus />,
          message: () => <StubStepperMessage />,
        })}
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}

export function StubStepperNav() {
  const stepper = useStepper();
  return <div></div>;
}

export function StubStepperType() {
  const form = useFormContext<StubTypeInputSchema>();
  return (
    <div>
      <label>Name</label>
      <input {...form.register("type")} />
      {form.formState.errors.type && (
        <span>{form.formState.errors.type.message}</span>
      )}
    </div>
  );
}

export function StubStepperStatus() {
  const form = useFormContext<StubStatusInputSchema>();
  return (
    <>
      <div>
        <label>Name</label>
        <input {...form.register("statusA")} />
        {form.formState.errors.statusA && (
          <span>{form.formState.errors.statusA.message}</span>
        )}
      </div>
      <div>
        <label>Name</label>
        <input {...form.register("statusB")} />
        {form.formState.errors.statusB && (
          <span>{form.formState.errors.statusB.message}</span>
        )}
      </div>
    </>
  );
}

export function StubStepperMessage() {
  const form = useFormContext<StubMessageInputSchema>();
  return (
    <div>
      <label>Name</label>
      <input {...form.register("messageTemplate")} />
      {form.formState.errors.messageTemplate && (
        <span>{form.formState.errors.messageTemplate.message}</span>
      )}
    </div>
  );
}
