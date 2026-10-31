"use client";

import { useEffect, useState } from "react";

export default function NavbarShell({ children }: { children: React.ReactNode }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed insert-x-0 top-0 z-50 flex items-center justify-between px-6 pt-3 transition-colors duration-300 ${scrolled ? "bg-black/90 backdrop-blur" : "bg-linear-to-b from-black/80 to-transparent"
                }`}
        >
            {children}
        </header>
    );
}