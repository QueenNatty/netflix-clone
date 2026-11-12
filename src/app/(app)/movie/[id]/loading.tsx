export default function Loading() {
    return (
        <main className="mx-auto max-w-4xl animate-pulse p-6">
            <div className="h-5 w-16 rounded bg-neutral-800" />
            <div className="mt-4 aspect-video w-full rounded-md bg-neutral-800" />
            <div className="mt-6 h-8 w-2/3 rounded bg-neutral-800" />
            <div className="mt-4 h-4 w-full rounded bg-neutral-800" />
            <div className="mt-2 h-4 w-5/6 rounded bg-neutral-800" />
        </main>
    );
}