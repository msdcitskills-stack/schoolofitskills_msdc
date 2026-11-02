import { useEffect, useRef } from "react";
import { onScrollFrame } from "@/lib/scroll-ticker";

/**
 * A frosted-glass edge pinned to the bottom of the viewport. It slides up
 * once the page is scrolling and settles there while the magnetic section
 * snap holds the content — the "glass shelf" the page comes to rest on.
 * Visibility is driven by the shared scroll ticker; the element is fully
 * non-interactive and hidden (including its backdrop-filter) at the top.
 */
export function GlassEdge() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let shown = null;
    return onScrollFrame(({ y }) => {
      const next = y > 28;
      if (next === shown) return;
      shown = next;
      if (next) el.setAttribute("data-shown", "");
      else el.removeAttribute("data-shown");
    });
  }, []);

  return (
    <div ref={ref} aria-hidden className="glass-edge pointer-events-none fixed inset-x-0 bottom-0 z-30" />
  );
}
