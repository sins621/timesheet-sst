import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export function TestFunction({
  title,
  text,
  fn,
  children,
}: {
  title: string;
  text?: string;
  fn: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="rounded border p-4 bg-secondary flex flex-col gap-2 min-w-sm">
      <span className="font-semibold text-lg">{title}</span>
      {text ? <p className="text-muted-foreground">{text}</p> : <>{children}</>}
      <Button className="w-full" onClick={fn}>
        Get Token
      </Button>
    </div>
  );
}
