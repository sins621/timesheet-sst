import { cn } from "@/lib/utils";

type TypeButtonProps = {
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
};

export default function TypeButton(props: TypeButtonProps) {
  return (
    <button
      className={cn("border flex flex-col gap-2 p-2", props.className)}
      onClick={props.onClick}
    >
      <span>{props.title}</span>
      <span className="text-muted-foreground">{props.description}</span>
    </button>
  );
}
