import { useEffect, useRef } from "react";
import { onScrollFrame } from "@/lib/scroll-ticker";

/** Short-lived feedback outside control subtrees, preserving layout and menus. */
export function TapFeedback() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pending = new Map<HTMLElement, ReturnType<typeof setTimeout>>();
    const remove = (frame: HTMLElement) => {
      clearTimeout(pending.get(frame));
      pending.delete(frame);
      frame.remove();
    };
    const clear = () => pending.forEach((_, frame) => remove(frame));

    const activate = (event: MouseEvent) => {
      if (preference.matches || event.button !== 0) return;
      const source = event.target;
      if (!(source instanceof Element)) return;
      const control = source.closest<HTMLElement>(
        'a[href], button, [role="button"], [role="tab"]',
      );
      if (!control || control.matches(':disabled, [aria-disabled="true"]')) return;
      const bounds = control.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      // Keyboard activation receives the same feedback, originating centrally.
      const x = event.detail === 0 ? bounds.width / 2 : Math.max(0, Math.min(bounds.width, event.clientX - bounds.left));
      const y = event.detail === 0 ? bounds.height / 2 : Math.max(0, Math.min(bounds.height, event.clientY - bounds.top));
      const radius = Math.hypot(Math.max(x, bounds.width - x), Math.max(y, bounds.height - y));
      const frame = document.createElement("div");
      frame.className = "tap-feedback-frame";
      Object.assign(frame.style, {
        left: `${bounds.left}px`, top: `${bounds.top}px`,
        width: `${bounds.width}px`, height: `${bounds.height}px`,
        borderRadius: getComputedStyle(control).borderRadius,
      });
      const wave = document.createElement("span");
      wave.className = "tap-feedback-wave";
      Object.assign(wave.style, {
        left: `${x - radius}px`, top: `${y - radius}px`,
        width: `${radius * 2}px`, height: `${radius * 2}px`,
      });
      frame.append(wave);
      // Bound transient layers even during rapid repeated clicking.
      if (pending.size >= 3) {
        const oldest = pending.keys().next().value;
        if (oldest) remove(oldest);
      }
      layer.append(frame);
      wave.addEventListener("animationend", () => remove(frame), { once: true });
      pending.set(frame, setTimeout(() => remove(frame), 750));
    };

    let lastY = window.scrollY;
    const unsubscribe = onScrollFrame(({ y }) => {
      if (y !== lastY) clear();
      lastY = y;
    });
    document.addEventListener("click", activate, { capture: true });
    preference.addEventListener("change", clear);
    return () => {
      document.removeEventListener("click", activate, { capture: true });
      preference.removeEventListener("change", clear);
      unsubscribe();
      clear();
    };
  }, []);

  return <div ref={layerRef} className="tap-feedback-layer" aria-hidden="true" />;
}