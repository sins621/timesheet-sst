"use client";
import { useState } from "react";
import { toast } from "sonner";
import { getJiraProjectsAction, getTokenAction } from "./actions";
import { TestFunction } from "./components";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const [token, setToken] = useState("No Token");
  const [jiraProjects, setJiraProjects] = useState("No Jira Projects");

  return (
    <div className="flex flex-1 flex-col gap-2 items-center justify-center h-screen">
      <TestFunction
        title="Test Token"
        text={token}
        fn={async () => {
          const result = await getTokenAction();

          if (!result.success) return toast.error(result.error);

          setToken(result.data);
        }}
      />
      <TestFunction
        title="Test Get Jira Projects"
        fn={async () => {
          const result = await getJiraProjectsAction();

          if (!result.success) return toast.error(result.error);

          setJiraProjects(JSON.stringify(result.data));
        }}
      >
        <Textarea className="rounded text-muted-foreground" value={jiraProjects} readOnly />
      </TestFunction>
    </div>
  );
}
