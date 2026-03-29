"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { userSearchParams } from "@/lib/nuqs/search";
import { Posts, PostsSchema } from "@/lib/types/example";
import { CommandLoading } from "cmdk";
import { useQueryStates } from "nuqs";
import { startTransition, use, useTransition } from "react";

export function CommandExample({
  postPromise,
}: {
  postPromise: Promise<Posts>;
}) {
  const [isLoading, setLoading] = useTransition();

  const [{ userId }, setUserId] = useQueryStates(userSearchParams, {
    shallow: false,
    limitUrlUpdates: {
      method: "debounce",
      timeMs: 100,
    },
    startTransition: setLoading,
  });

  const posts = PostsSchema.parse(use(postPromise));

  return (
    <Command shouldFilter={false} className="max-w-sm rounded-lg border">
      <CommandInput
        value={userId}
        onValueChange={(value) =>
          startTransition(async () => {
            await setUserId({ userId: value });
          })
        }
        placeholder="Type a command or search..."
      />
      <CommandList>
        <CommandGroup heading="Suggestions">
          {isLoading ? (
            <CommandLoading>Loading...</CommandLoading>
          ) : (
            <div>
              {posts.map((post) => (
                <CommandItem key={post.id}>
                  <span>{post.title}</span>
                </CommandItem>
              ))}
            </div>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
