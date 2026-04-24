import { CommandExample } from "@/components/input/command-example";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { loadSearchParams } from "@/lib/nuqs/search";
import type { SearchParams } from "nuqs/server";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: Props) {
  const { userId } = await loadSearchParams(searchParams);

  const refreshSomePage = async () => {
    "use server";
    revalidatePath("/test", "page");
  };

  const signIn = async () => {
    "use server";


    const response = await auth.api.signInSocial({
      body: {
        provider: "microsoft",
        callbackURL: "/dashboard",
      },
    });
    if (response?.url) redirect(response.url);
  };

  const signOut = async () => {
    "use server";
    const response = await auth.api.signOut({
      headers: await headers(),
    });

    if (response.success) redirect("/dashboard");
  };

  const linkJira = async () => {
    "use server";
    const response = await auth.api.linkSocialAccount({
      body: {
        provider: "atlassian",
      },
      headers: await headers(),
    });

    if (response?.url) redirect(response.url);
  };
  const unLinkJira = async () => {
    "use server";
    const response = await auth.api.unlinkAccount({
      body: {
        providerId: "atlassian",
      },
    });
    if (response.status) redirect("/dashboard");
  };

  const someMath = async () => {
    "use server";
    const num1 = 1;
    const num2 = 2;
    const result = num1 + num2;
    console.log(result);
  };

  const postPromise = fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  ).then((res) => res.json());

  return (
    <>
      <form action={signIn}>
        <Button type="submit">Sign In with Microsoft</Button>
      </form>
      <form action={signOut}>
        <Button type="submit">SignOut</Button>
      </form>
      <form action={linkJira}>
        <Button type="submit">Link Jira Account</Button>
      </form>
      <form action={unLinkJira}>
        <Button type="submit">Un-Link Jira Account</Button>
      </form>
      <form action={someMath}>
        <Button type="submit">Do Some Math</Button>
      </form>
      <Button onClick={refreshSomePage}>Click me</Button>
      <CommandExample postPromise={postPromise} />
    </>
  );
}
