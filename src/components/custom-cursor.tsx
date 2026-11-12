import { useEffect, useRef } from "react";

/** A lightweight, theme-aware pointer accent for precise desktop pointers. */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const root = document.documentElement;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let position = { x: 0, y: 0 };

    const clear = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      root.removeAttribute("data-custom-cursor");
      cursor.removeAttribute("data-visible");
      cursor.removeAttribute("data-hover");
    };

    const enabled = () => finePointer.matches && !reducedMotion.matches;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !enabled()) return;
      position = { x: event.clientX, y: event.clientY };
      root.setAttribute("data-custom-cursor", "");
      cursor.setAttribute("data-visible", "");
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        cursor.style.setProperty("--cursor-x", `${position.x}px`);
        cursor.style.setProperty("--cursor-y", `${position.y}px`);
      });
    };

    const updateHover = (event: PointerEvent) => {
      if (!enabled() || !(event.target instanceof Element)) return;
      const interactive = event.target.closest(
        'a[href], button, [role="button"], [role="link"], input, textarea, select, label',
      );
      cursor.toggleAttribute("data-hover", Boolean(interactive));
    };

    const updateAvailability = () => {
      if (!enabled()) clear();
    };
    const pointerLeave = (event: PointerEvent) => {
      if (!event.relatedTarget) clear();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", pointerLeave);
    window.addEventListener("blur", clear);
    document.addEventListener("pointerover", updateHover, { passive: true });
    finePointer.addEventListener("change", updateAvailability);
    reducedMotion.addEventListener("change", updateAvailability);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", pointerLeave);
      window.removeEventListener("blur", clear);
      document.removeEventListener("pointerover", updateHover);
      finePointer.removeEventListener("change", updateAvailability);
      reducedMotion.removeEventListener("change", updateAvailability);
      clear();
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <span className="custom-cursor-ring" />
      <span className="custom-cursor-core" />
    </div>
  );
}