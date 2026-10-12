import { useRef, useState, createContext, useContext, useEffect } from "react";

const Card3DContext = createContext(false);

/** Wraps children in a perspective container and tilts them toward the cursor. */
export function Card3D({
  children,
  className = "",
  intensity = 12,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  // Tilt is pointer-only: on touch it fights with scrolling and costs frames.
  const enabled = useRef(false);
  const frame = useRef(0);
  const next = useRef({ x: 0, y: 0 });
  const bounds = useRef<DOMRect | null>(null);

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
    el.style.transform = `rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(12px) scale(1.015)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled.current) return;
    const el = ref.current;
    if (!el) return;
    const rect = bounds.current;
    if (!rect) return;
    next.current = {
      x: Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5)),
      y: Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5)),
    };
    if (!frame.current) frame.current = requestAnimationFrame(apply);
  };

  const reset = () => {
    setHovered(false);
    bounds.current = null;
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    if (ref.current) {
      ref.current.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)";
    }
  };

  return (
    <div className={`[perspective:800px] ${className}`}>
      <Card3DContext.Provider value={hovered}>
        <div
          ref={ref}
          onMouseEnter={() => {
            if (!enabled.current) return;
            bounds.current = ref.current?.parentElement?.getBoundingClientRect() ?? null;
            setHovered(true);
          }}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          className="relative h-full w-full transition-transform duration-300 ease-out [transform-style:preserve-3d]"
        >
          {children}
        </div>
      </Card3DContext.Provider>
    </div>
  );
}

/** Lifts its children off the card surface on hover. */
export function Card3DItem({
  children,
  z = 40,
  className = "",
}: {
  children: React.ReactNode;
  z?: number;
  className?: string;
}) {
  const hovered = useContext(Card3DContext);
  return (
    <div
      className={`transition-transform duration-200 ease-out [transform-style:preserve-3d] ${className}`}
      style={{ transform: hovered ? `translateZ(${z}px)` : "translateZ(0px)" }}
    >
      {children}
    </div>
  );
}
