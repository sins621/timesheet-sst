"use client";

import { Posts, PostsSchema } from "@/lib/types/example";
import { CommandItem } from "cmdk";
import { use } from "react";

export function PostsList({ postPromise }: { postPromise: Promise<Posts> }) {
  const posts = PostsSchema.parse(use(postPromise));

  return (
    <>
      {posts.map((post) => (
        <CommandItem key={post.id}>
          <span>{post.title}</span>
        </CommandItem>
      ))}
    </>
  );
}
