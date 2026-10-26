import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h2 className="text-xl font-semibold"> Movie not found</h2>
            <p className="text-neutral-400">That page doesn&apos;t exist.</p>
            <Link href="/" className="rounded-md bg-red-600 px-4 py-2 font-medium hover:bg-red-700">
                Back home
            </Link>
        </main>
    );
}