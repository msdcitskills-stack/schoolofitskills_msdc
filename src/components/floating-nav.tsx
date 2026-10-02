import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { onScrollFrame } from "@/lib/scroll-ticker";
import { Palette } from "lucide-react";
import { themes, useTheme } from "./theme-provider";
import soisLogo from "@/assets/sois-logo.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/tally", label: "Tally" },
  { to: "/internships", label: "Internships" },
  { to: "/school-programs", label: "For Schools" },
  { to: "/faculties", label: "Faculties" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function FloatingNav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [openTheme, setOpenTheme] = useState(false);
  const { theme, setTheme } = useTheme();
  const activeTo = links.find((link) =>
    link.to === "/" ? pathname === "/" : pathname === link.to || pathname.startsWith(`${link.to}/`)
  )?.to;

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const target = hovered ?? activeTo;
      const item = Array.from(list.querySelectorAll<HTMLElement>("[data-nav-to]")).find(
        (element) => element.dataset.navTo === target
      );
      if (!item) {
        setIndicator(null);
        return;
      }
      const slot = item.parentElement;
      if (!slot) return;
      const next = { left: slot.offsetLeft, width: slot.offsetWidth };
      setIndicator((previous) =>
        previous?.left === next.left && previous.width === next.width ? previous : next
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [activeTo, hovered]);

  useEffect(() => {
    let last = false;
    return onScrollFrame(({ y }) => {
      const next = y > 20;
      if (next === last) return;
      last = next;
      setScrolled(next);
    });
  }, []);

  return (
    <div
      className={`fixed top-4 left-1/2 z-[9999] isolate -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "top-3 scale-[0.98]" : "top-6"
      }`}
    >
      <nav
        className="glass alive-nav relative flex w-max max-w-[min(96vw,72rem)] flex-nowrap items-center gap-1 overflow-visible rounded-full px-2 py-2 shadow-[0_10px_40px_-20px_color-mix(in_oklab,var(--color-foreground)_50%,transparent)]"
        onMouseLeave={() => setHovered(null)}
      >
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 pl-1.5 pr-2 text-foreground lg:pr-3"
          aria-label="School of IT Skills"
        >
          <img src={soisLogo.url} alt="" className="alive-nav-logo h-8 w-8 rounded-full" />
          <span className="hidden whitespace-nowrap text-sm font-semibold tracking-tight max-md:inline lg:inline">
            School of IT Skills
          </span>
        </Link>
        <div className="mx-1 hidden h-6 w-px shrink-0 bg-border md:block" />
        <ul
          ref={listRef}
          className="relative hidden min-w-0 flex-nowrap items-center md:flex"
          onMouseLeave={() => setHovered(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setHovered(null);
          }}
        >
          <span
            aria-hidden="true"
            className="alive-nav-indicator pointer-events-none absolute inset-y-0 left-0 rounded-full bg-secondary transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{
              width: indicator?.width ?? 0,
              transform: `translateX(${indicator?.left ?? 0}px)`,
              opacity: indicator ? 1 : 0,
            }}
          />
          {links.map((l) => {
            const active = activeTo === l.to;
            return (
              <li key={l.to} className="relative shrink-0">
                <Link
                  to={l.to}
                  data-nav-to={l.to}
                  onMouseEnter={() => setHovered(l.to)}
                  onFocus={() => setHovered(l.to)}
                  aria-current={active ? "page" : undefined}
                  className={`relative z-10 block whitespace-nowrap rounded-full px-2.5 py-2 text-[0.8rem] font-medium transition-[color,transform] duration-300 ease-out hover:-translate-y-px focus-visible:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none motion-reduce:transition-none lg:px-3 lg:text-[0.875rem] ${
                    hovered === l.to || (!hovered && active)
                      ? "text-secondary-foreground"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  <span>{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="relative ml-1 shrink-0">
          <button
            type="button"
            onClick={() => setOpenTheme((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-110"
            aria-label="Change theme"
            aria-expanded={openTheme}
            aria-haspopup="menu"
          >
            <Palette className="alive-nav-palette h-4 w-4" />
          </button>
          {openTheme && (
            <div role="menu" className="glass pointer-events-auto absolute right-0 top-12 z-[10000] flex w-56 flex-col gap-1 rounded-2xl p-2 shadow-xl animate-in fade-in slide-in-from-top-2">
              {themes.map((t) => (
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={theme === t.key}
                  key={t.key}
                  onClick={() => {
                    setTheme(t.key);
                    setOpenTheme(false);
                  }}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-muted ${
                    theme === t.key ? "bg-muted" : ""
                  }`}
                >
                  <span className="font-medium">{t.label}</span>
                  <span className="flex gap-1">
                    {t.swatch.map((c) => (
                      <span
                        key={c}
                        className="h-4 w-4 rounded-full border border-border/60"
                        style={{ background: c }}
                      />
                    ))}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
