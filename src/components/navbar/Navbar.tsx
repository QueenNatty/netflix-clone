import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import CurrentProfile from "@/components/CurrentProfile";
import NavbarLinks from "./NavbarLinks";
import NavbarShell from "./NavbarShell";

export default function Navbar() {
    return (
        <NavbarShell>
            <div className="flex items-center gap-6">
                <Link href="/" aria-label="MovieZone home" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="" width={32} height={32} priority />
                    <span className="hidden text-xl font-extrabold tracking-wide text-red-600 sm:inline">
                    MOVIEZONE
                    </span>
                </Link>
                <Suspense
                fallback={
                    <nav className="flex gap-4 text-sm text-neutral-400">
                        <span>Home</span>
                        <span>My List</span>
                    </nav>
                }
                >
                <NavbarLinks />
                </Suspense>
            </div>
            <Suspense fallback={null}>
                <CurrentProfile />
            </Suspense>
        </NavbarShell>
    );
}