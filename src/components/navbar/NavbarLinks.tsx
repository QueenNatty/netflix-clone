"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarShell from "./NavbarShell";

const links = [
    { href: "/", label: "Home" },
    { href: "/my-list", label: "My List" },
];

export default function NavbarLinks() {
    const pathname = usePathname();

    return (
        <nav className="flex gap-4 text-sm">
            {links.map((l) => {
                const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
            <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={active ? "font-semibold text-white" : "text-neutral-400 hover:text-white"}
            >
                {l.label}
            </Link>
            );
            })}
        </nav>
    );
}