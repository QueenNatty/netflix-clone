import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <LoginForm />
      <p className="text-sm text-neutral-400">
        New here?{" "}
        <Link href="/signup" className="text-white hover:underline">
          Sign up
        </Link>
      </p>
    </main>
  );
}
