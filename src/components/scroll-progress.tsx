import { useEffect, useRef } from "react";
import { onScrollFrame } from "@/lib/scroll-ticker";

/** Thin gradient bar at the top of the page tracking scroll progress. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastP = -1;
    return onScrollFrame(({ progress }) => {
      const p = Math.round(progress * 1000) / 1000;
      if (p === lastP) return;
      lastP = p;
      el.style.transform = `scaleX(${p})`;
      el.style.opacity = p > 0.005 ? "1" : "0";
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden>
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0 opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--color-primary) 90%, transparent), var(--color-glow), color-mix(in oklab, var(--color-accent) 90%, transparent))",
          boxShadow: "0 0 14px color-mix(in oklab, var(--color-glow) 70%, transparent)",
        }}
      />
    </div>
  );
}
