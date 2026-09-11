import { useEffect, useRef } from "react";
import { onScrollFrame } from "@/lib/scroll-ticker";

/**
 * TracingBeam — a curvy glowing beam pinned to the left edge that traces the
 * page as you scroll. The lit length eases with scroll velocity, and a comet
 * head rides the curve.
 */
export function TracingBeam() {
  const pathRef = useRef<SVGPathElement>(null);
  const litRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);

  const tailRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const lit = litRef.current;
    const tail = tailRef.current;
    const head = headRef.current;
    if (!path || !lit || !tail || !head) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = path.getTotalLength();

    let raf = 0;
    let current = 0;
    let target = 0;
    let last = 0;
    let velocity = 0;

    let lastPoint = -1;

    const frame = () => {
      raf = 0;
      current += (target - current) * (reduced ? 1 : 0.12);
      const p = Math.min(1, Math.max(0, current));
      const len = total * p;

      // Comet: a short bright core trailing into a longer soft tail.
      const coreLen = total * (0.035 + velocity * 0.5);
      const tailLen = total * (0.12 + velocity * 2.2);

      lit.style.strokeDasharray = `${coreLen} ${total}`;
      lit.style.strokeDashoffset = `${coreLen - len}`;
      tail.style.strokeDasharray = `${tailLen} ${total}`;
      tail.style.strokeDashoffset = `${tailLen - len}`;

      const visible = p > 0.002 ? "1" : "0";
      lit.style.opacity = visible;
      tail.style.opacity = p > 0.002 ? `${0.35 + velocity * 2}` : "0";

      // getPointAtLength is the costly call here — only re-measure when the
      // comet head actually moved a visible amount.
      const rounded = Math.round(len);
      if (rounded !== lastPoint) {
        lastPoint = rounded;
        const pt = path.getPointAtLength(len);
        head.setAttribute("cx", `${pt.x}`);
        head.setAttribute("cy", `${pt.y}`);
      }
      head.style.opacity = visible;

      velocity *= 0.9;
      if (Math.abs(target - current) > 0.0006 || velocity > 0.002) {
        raf = requestAnimationFrame(frame);
      }
    };

    const unsubscribe = onScrollFrame(({ progress }) => {
      target = progress;
      velocity = Math.min(0.2, Math.abs(target - last) * 4);
      last = target;
      if (!raf) raf = requestAnimationFrame(frame);
    });

    return () => {
      cancelAnimationFrame(raf);
      unsubscribe();
    };
  }, []);

  const d = "M40 0 L40 250 L16 290 L16 520 L44 560 L44 800";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-2 top-0 z-40 hidden h-screen w-16 lg:block"
    >
      <svg
        viewBox="0 0 64 800"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        {/* Track */}
        <path
          d={d}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeOpacity="0.4"
          vectorEffect="non-scaling-stroke"
        />

        {/* Measuring path */}
        <path ref={pathRef} d={d} fill="none" stroke="none" />

        {/* Soft tail */}
        <path
          ref={tailRef}
          d={d}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="4"
          strokeOpacity="0.35"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="opacity-0"
        />

        {/* Bright core */}
        <path
          ref={litRef}
          d={d}
          fill="none"
          stroke="var(--color-glow)"
          strokeWidth="1.4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="opacity-0"
        />

        <circle ref={headRef} r="2.4" fill="var(--color-glow)" className="opacity-0 transition-opacity duration-300" />
      </svg>
    </div>
  );
}
