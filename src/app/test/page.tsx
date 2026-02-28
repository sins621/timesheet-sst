import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
  return <div></div>
  
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
    </>
  );
}
