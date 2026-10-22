"use client";

export default function Error({
    reset,
}: {
        error: Error & { digest?: string };
        reset: () => void;
    }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="text-neutral-400">We couldn't load the movies</p>
            <button
                onClick={reset}
                className="rounded-md bg-red-600 px-4 py-2 font-medium hover:bg-red-700"
            >
                Try again
            </button>
        </main>
    );
}