export default function Loading() {
    return (
        <main className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}
                    className="aspect-[2/3] animate-pulse rounded-md bg-neutral-800"
                />
            ))}
        </main>
    );
}