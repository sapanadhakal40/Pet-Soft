import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-md mx-auto ">
      <div className=" p-10 rounded-lg border border-zinc-200 shadow-md">
        <H1 className="text-center mb-4">Log In</H1>
        <AuthForm type="logIn" />

        <p className="mt-4 text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className=" text-blue-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
