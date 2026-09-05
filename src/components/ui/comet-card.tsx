import { useEffect, useRef } from "react";

/**
 * Perspective 3D tilt card with a moving glare, inspired by Perplexity Comet.
 * Dependency-free: pointer input is throttled through requestAnimationFrame
 * and disabled for coarse pointers / reduced-motion users.
 */
export function CometCard({
  children,
  className = "",
  rotateDepth = 14,
  translateDepth = 14,
}: {
  children: React.ReactNode;
  className?: string;
  rotateDepth?: number;
  translateDepth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);
  const frame = useRef(0);
  const next = useRef({ x: 0, y: 0 });

  useEffect(() => {
    enabled.current =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const apply = () => {
    frame.current = 0;
    const el = ref.current;
    if (!el) return;
    const { x, y } = next.current;
    el.style.transform = `rotateY(${x * rotateDepth}deg) rotateX(${-y * rotateDepth}deg) translate3d(${x * translateDepth}px, ${y * translateDepth}px, 0) scale(1.04)`;
    el.style.boxShadow = `${-x * 40}px ${-y * 40 + 18}px 45px -22px rgba(0,0,0,0.35)`;
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
    el.style.setProperty("--glare", "1");
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled.current) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    next.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    };
    if (!frame.current) frame.current = requestAnimationFrame(apply);
  };

  const reset = () => {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    const el = ref.current;
    if (!el) return;
    el.style.transform = "rotateY(0deg) rotateX(0deg) translate3d(0,0,0) scale(1)";
    el.style.boxShadow = "none";
    el.style.setProperty("--glare", "0");
  };

  return (
    <div className={`[perspective:700px] ${className}`}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="relative h-full w-full rounded-2xl transition-transform duration-200 ease-out [transform-style:preserve-3d] will-change-transform"
      >
        {children}
        {/* comet glare */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: "var(--glare,0)" as unknown as number,
            background:
              "radial-gradient(160px circle at var(--gx,50%) var(--gy,50%), color-mix(in oklab, var(--color-primary) 26%, transparent), transparent 68%)",
            mixBlendMode: "soft-light",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl transition-opacity duration-300"
          style={{
            opacity: "var(--glare,0)" as unknown as number,
            background:
              "linear-gradient(105deg, transparent 38%, color-mix(in oklab, white 45%, transparent) 50%, transparent 62%)",
          }}
        />
      </div>
    </div>
  );
}
