import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-md mx-auto ">
      <div className=" p-8 rounded-lg border border-zinc-200 shadow-md">
        <H1 className="text-center mb-4">Sign Up</H1>
        <AuthForm type="signup" />

        <p className="mt-4 text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className=" font-medium text-blue-500 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
