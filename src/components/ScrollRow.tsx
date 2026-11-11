"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const arrow =
  "absolute top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-2xl leading-none text-white ring-1 ring-white/20 transition hover:scale-110 hover:bg-black md:flex";

export default function ScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [update]);

  function scroll(direction: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {canLeft && (
        <button
          aria-label="Scroll left"
          onClick={() => scroll(-1)}
          className={`${arrow} left-2`}
        >
          ‹
        </button>
      )}
      <ul
        ref={ref}
        onScroll={update}
        className="no-scrollbar flex gap-3 overflow-x-auto px-6 py-4"
      >
        {children}
      </ul>
      {canRight && (
        <button
          aria-label="Scroll right"
          onClick={() => scroll(1)}
          className={`${arrow} right-2`}
        >
          ›
        </button>
      )}
    </div>
  );
}
