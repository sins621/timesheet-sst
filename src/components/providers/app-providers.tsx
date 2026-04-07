import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import TanstackQueryProvider from "./tanstack-query-provider";
import { MSWProvider } from "./msw-provider";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <NuqsAdapter>
      <MSWProvider>
        <TanstackQueryProvider>
          <TooltipProvider>
            {children}
            <Toaster position="bottom-center" />
          </TooltipProvider>
        </TanstackQueryProvider>
      </MSWProvider>
    </NuqsAdapter>
  );
};
