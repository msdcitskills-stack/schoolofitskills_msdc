import { useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function MagneticButton({
  children,
  className = "",
  strength = 26,
  plate = true,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  strength?: number;
  /** Show the dashed offset plate behind the button */
  plate?: boolean;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // spring state
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const startRef = useRef<(() => void) | null>(null);
  const enabled = useRef(false);
  const bounds = useRef<DOMRect | null>(null);

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      enabled.current = pointer.matches && !reduced.matches;
      if (!enabled.current) {
        if (raf.current !== null) cancelAnimationFrame(raf.current);
        raf.current = null;
        target.current = { x: 0, y: 0 };
        pos.current = { x: 0, y: 0 };
        vel.current = { x: 0, y: 0 };
        if (btnRef.current) btnRef.current.style.transform = "";
      }
    };
    update();
    pointer.addEventListener("change", update);
    reduced.addEventListener("change", update);
    const stiffness = 0.14;
    const damping = 0.72;

    const tick = () => {
      const p = pos.current;
      const v = vel.current;
      const t = target.current;

      v.x = (v.x + (t.x - p.x) * stiffness) * damping;
      v.y = (v.y + (t.y - p.y) * stiffness) * damping;
      p.x += v.x;
      p.y += v.y;

      if (btnRef.current) {
        btnRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      }

      const settled =
        Math.abs(t.x - p.x) < 0.05 &&
        Math.abs(t.y - p.y) < 0.05 &&
        Math.abs(v.x) < 0.05 &&
        Math.abs(v.y) < 0.05;

      if (settled) {
        p.x = t.x;
        p.y = t.y;
        if (btnRef.current) {
          btnRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        }
        raf.current = null;
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf.current == null) raf.current = requestAnimationFrame(tick);
    };

    startRef.current = start;

    return () => {
      if (raf.current != null) cancelAnimationFrame(raf.current);
      raf.current = null;
      startRef.current = null;
      pointer.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  const kick = () => {
    if (enabled.current) startRef.current?.();
  };

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!enabled.current) return;
    const rect = bounds.current;
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    target.current = {
      x: (x / rect.width) * strength,
      y: (y / rect.height) * strength * 1.4,
    };
    kick();
  };

  const onLeave = () => {
    bounds.current = null;
    target.current = { x: 0, y: 0 };
    kick();
  };

  return (
    <span
      ref={wrapRef}
      onMouseEnter={() => {
        bounds.current = wrapRef.current?.getBoundingClientRect() ?? null;
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative inline-flex isolate p-2"
    >
      {plate && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-2 -z-10 translate-x-2 translate-y-2 rounded-full border border-dashed border-border bg-muted/60"
        />
      )}
      <Button
        ref={btnRef}
        variant="secondary"
        type="button"
        className={`relative h-auto rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-[box-shadow,filter] duration-300 hover:shadow-(--shadow-interactive) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
        {...rest}
      >
        {children}
      </Button>
    </span>
  );
}
