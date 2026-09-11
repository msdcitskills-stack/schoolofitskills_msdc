/**
 * One passive scroll/resize listener and one rAF loop for the whole page.
 * Every scroll-driven effect subscribes here instead of adding its own
 * listener, so scrolling stays on a single, predictable frame budget.
 */
export type ScrollState = {
  y: number;
  /** 0..1 progress through the document */
  progress: number;
  height: number;
};

type Sub = (s: ScrollState) => void;

const subs = new Set<Sub>();
let raf = 0;
let bound = false;
const state: ScrollState = { y: 0, progress: 0, height: 0 };

function read() {
  const doc = document.documentElement;
  state.height = window.innerHeight;
  state.y = window.scrollY;
  const max = doc.scrollHeight - window.innerHeight;
  state.progress = max > 0 ? Math.min(1, Math.max(0, state.y / max)) : 0;
}

function flush() {
  raf = 0;
  read();
  for (const s of subs) s(state);
}

function kick() {
  if (!raf) raf = requestAnimationFrame(flush);
}

export function onScrollFrame(sub: Sub) {
  if (typeof window === "undefined") return () => {};
  subs.add(sub);
  if (!bound) {
    bound = true;
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });
  }
  read();
  sub(state);
  return () => {
    subs.delete(sub);
  };
}

/** Ask the shared loop for one more frame (used by easing effects). */
export const requestScrollFrame = kick;
