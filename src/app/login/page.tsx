import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import GoogleButton from "@/components/auth/GoogleButton"

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <LoginForm />
      <div className="flex items-center gap-3 text-sm text-neutral-500">
        <div className="h-ph flex-1 bg-neutral-800" />
        or
        <div className="h-ph flex-1 bg-neutral-800" />
      </div>
      <GoogleButton/>
      <p className="text-sm text-neutral-400">
        New here?{" "}
        <Link href="/signup" className="text-white hover:underline">
          Sign up
        </Link>
      </p>
    </main>
  );
}

