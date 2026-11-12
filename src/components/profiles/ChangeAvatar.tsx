"use client";

import { useState, useTransition } from "react";
import Avatar from "@/components/Avatar";
import { AVATAR_SEEDS } from "@/lib/avatars";
import { updateAvatar } from "@/app/profiles/actions";


export default function ChangeAvatar({
    profileId,
    name,
    current,
}: {
        profileId: string;
        name: string;
        current: string;
    }) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pending, startTransition] = useTransition();

    function choose(seed: string) {
        setError(null);
        startTransition(async () => {
            const result = await updateAvatar(profileId, seed);
            if (result.error) setError(result.error);
            else setOpen(false);
        });
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-label={` Change avatar for ${name}`}
                className="relative shrink-0 rounded-md"
            >
                <Avatar avatar={current} name={name} className="h-12 w-12 text-lg" />
                <span className="absolute -bottom-1 -right-1 rounded-full bg-neutral-900 px-1 text-xs ring-1 ring-white/30">
                    ✏️
                </span>
            </button>

            {open && (
                <div className="order-last w-full rounded-md bg-neutral-900 p-3">
                    <div className="grid grid-cols-6 gap-2">
                        {AVATAR_SEEDS.map((seed) => (
                            <button
                                key={seed}
                                type="button"
                                disabled={pending}
                                onClick={() => choose(seed)}
                                aria-label={`Use ${seed} avatar`}
                                aria-pressed={current === seed}
                                className={`rounded-md ring-2 transition disabled:opacity-60 ${current === seed ? "ring-white" : "ring-transparent hover:ring-white/50"}`}
                            >
                                <Avatar avatar={seed} name={seed} className="aspect-square w-full" />
                            </button>
                        ))}
                    </div>
                    {error && <p className="mt-2 text-sm text-red-500 ">{error}</p>}
                </div>
            )}
        </>
    );
}