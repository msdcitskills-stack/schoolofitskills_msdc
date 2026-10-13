import { useEffect } from "react";
import { onScrollFrame } from "@/lib/scroll-ticker";

const decorativeTargets = ".orbit-border, .moving-border, .moving-border-outer, .pathway-card, .aurora-mesh, .live-float, .live-aura, .live-sheen, .live-wash, .live-twinkle, .text-live, .animate-marquee";

/**
 * Only visible decorations need to animate; native scrolling remains untouched.
 *
 * Pause flags are written only after the page has hydrated: React hydrates
 * lazily rendered routes after this effect mounts, and an attribute added
 * before that subtree hydrates reads as a server/client mismatch.
 */
export function MotionManager() {
  useEffect(() => {
    const root = document.documentElement;
    const tracked = new Set<Element>();
    const queued = new Map<Element, boolean>();
    let ready = false;

    const write = (element: Element, paused: boolean) =>
      element.toggleAttribute("data-motion-paused", paused);

    const setPaused = (element: Element, paused: boolean) => {
      if (ready) write(element, paused);
      else queued.set(element, paused);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setPaused(entry.target, !entry.isIntersecting);
      },
      { rootMargin: "80px" },
    );

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
        setPaused(element, true);
        observer.observe(element);
      });
    };
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    const release = () => {
      ready = true;
      queued.forEach((paused, element) => {
        if (element.isConnected) write(element, paused);
      });
      queued.clear();
    };
    const timer = setTimeout(() => {
      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number })
          .requestIdleCallback?.(release, { timeout: 900 }) ?? release();
      } else {
        release();
      }
    }, 400);

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
      clearTimeout(timer);
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
