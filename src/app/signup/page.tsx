import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm";
import GoogleButton from "@/components/auth/GoogleButton"

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Sign up</h1>
      <SignupForm />
      <div className="flex items-center gap-3 text-sm text-neutral-500">
              <div className="h-px flex-1 bg-neutral-800" />
              or
              <div className="h-px flex-1 bg-neutral-800" />
            </div>
            <GoogleButton/>
      <p className="text-sm text-neutral-400">
        Already have an account?{" "}
        <Link href="/login" className="text-white hover:underline">
          Sign in
        </Link>
      </p>
    </main>
  );
}
