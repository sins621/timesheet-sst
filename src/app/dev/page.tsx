"use client";
import { toast } from "sonner";
import { useState } from "react";
import { getTokenAction } from "./actions";

export default function Page() {
  const [token, setToken] = useState("No Token");

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={async () => {
          const tokenResult = await getTokenAction();

          if (!tokenResult.success)
            return toast.error(tokenResult.error);

          setToken(tokenResult.data);
        }}
      >
        Get Token
      </button>
      <p>Token: {token}</p>
    </div>
  );
}
