import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <TooltipProvider>
      {children}
      <Toaster position="bottom-center" />
    </TooltipProvider>
  );
};
