import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutBtn from "@/components/sign-out-btn";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <main className="">
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="h-[500px] flex flex-col justify-center items-center gap-3">
        <p>Logged in as {session?.user.email}</p>

        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}
