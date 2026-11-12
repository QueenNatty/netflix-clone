export default function Loading() {
    return (
        <main className="space-y-6 pb-12">
            <div className="mt-16 h-[65vh] min-h-96 w-full animate-pulse bg-neutral-900"/>
            {Array.from({ length: 3 }).map((_, row) => (
                <section key={row}>
                    <div className="mt-6 space-y-6">
                        
                    <div className="mb-1 ml-6 h-6 w-40 animate-pulse rounded bg-neutral-800" />
                    <div className="flex gap-3 overflow-hidden px-6 py-3">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="aspect-2/3 w-36 shrink-0 animate-pulse rounded-md bg-neutral-800 sm:w-44"
                            />
                        ))}
                    </div>
                    </div>
                </section>
            ))}
        </main>
    );
}