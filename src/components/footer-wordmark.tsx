import { useRef, useState } from "react";

export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  const text = "SCHOOL OF IT SKILLS";

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="group relative mx-auto mt-14 w-full max-w-7xl select-none overflow-hidden px-6"
      aria-hidden
    >
      <div className="relative">
        {/* base ghost text */}
        <span className="block whitespace-nowrap text-center font-semibold leading-[0.9] tracking-[-0.04em] text-foreground/[0.06] transition-colors duration-500 group-hover:text-foreground/[0.09] text-[clamp(1.75rem,8.2vw,9rem)]">
          {text}
        </span>

        {/* glowing spotlight layer */}
        <span
          className="pointer-events-none absolute inset-0 block whitespace-nowrap text-center font-semibold leading-[0.9] tracking-[-0.04em] text-primary text-[clamp(1.75rem,8.2vw,9rem)] transition-opacity duration-500"
          style={{
            opacity: active ? 1 : 0,
            WebkitMaskImage: `radial-gradient(22rem 22rem at ${pos.x}% ${pos.y}%, black 0%, rgba(0,0,0,0.55) 35%, transparent 68%)`,
            maskImage: `radial-gradient(22rem 22rem at ${pos.x}% ${pos.y}%, black 0%, rgba(0,0,0,0.55) 35%, transparent 68%)`,
            textShadow:
              "0 0 24px color-mix(in oklab, var(--color-primary) 55%, transparent), 0 0 70px color-mix(in oklab, var(--color-glow, var(--color-primary)) 40%, transparent)",
          }}
        >
          {text}
        </span>

        {/* soft ambient bloom following cursor */}
        <span
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: active ? 0.5 : 0,
            background: `radial-gradient(16rem 10rem at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--color-primary) 22%, transparent), transparent 70%)`,
          }}
        />
      </div>
      <div className="mt-3 text-center text-[0.7rem] uppercase tracking-[0.35em] text-muted-foreground/70 transition-colors duration-500 group-hover:text-muted-foreground">
        Manipal Skill Development Centre
      </div>
    </div>
  );
}
