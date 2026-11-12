"use client";

import { useEffect, useState } from "react";

export default function NavbarShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-6 py-3 transition-colors duration-300 ${
          scrolled
            ? "bg-neutral-950/70 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-md"
            : "bg-linear-to-b from-black/80 to-transparent"
        }`}
      >
        {children}
      </header>
    );
}
