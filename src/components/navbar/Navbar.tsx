import { Suspense } from "react";
import Link from "next/link";
import CurrentProfile from "@/components/CurrentProfile";
import NavbarLinks from "./NavbarLinks";
import NavbarShell from "./NavbarShell";

export default function Navbar() {
    return (
        <NavbarShell>
            <div className="flex items-center gap-6">
                <Link href="/" className="text-xl font-extrabold tracking-wide text-red-600">
                    MOVIEZONE
                </Link>
                <NavbarLinks />
            </div>
            <Suspense fallback={null}>
                <CurrentProfile />
            </Suspense>
        </NavbarShell>
    );
}