import { useEffect } from "react";
import { onScrollFrame } from "@/lib/scroll-ticker";

const decorativeTargets = ".orbit-border, .moving-border, .moving-border-outer, .aurora-mesh, .live-float, .live-aura, .live-sheen, .live-wash, .live-twinkle, .text-live, .animate-marquee";

/** Only visible decorations need to animate; native scrolling remains untouched. */
export function MotionManager() {
  useEffect(() => {
    const root = document.documentElement;
    const tracked = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.toggleAttribute("data-motion-paused", !entry.isIntersecting);
      }
    }, { rootMargin: "80px" });

    const scan = () => {
      for (const element of tracked) {
        if (!element.isConnected) {
          observer.unobserve(element);
          tracked.delete(element);
        }
      }
      document.querySelectorAll(decorativeTargets).forEach((element) => {
        if (tracked.has(element)) return;
        tracked.add(element);
        element.setAttribute("data-motion-paused", "");
        observer.observe(element);
      });
    };
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    let lastY = window.scrollY;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const unsubscribe = onScrollFrame(({ y }) => {
      if (y === lastY) return;
      lastY = y;
      root.setAttribute("data-scrolling", "");
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => root.removeAttribute("data-scrolling"), 150);
    });
    const visibility = () => root.toggleAttribute("data-motion-hidden", document.hidden);
    document.addEventListener("visibilitychange", visibility);
    visibility();

    return () => {
      unsubscribe();
      clearTimeout(settleTimer);
      mutations.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      tracked.forEach((element) => element.removeAttribute("data-motion-paused"));
      root.removeAttribute("data-scrolling");
      root.removeAttribute("data-motion-hidden");
    };
  }, []);
  return null;
}