import { useEffect, useRef } from "react";

/** A quiet, theme-aware lattice and floating cube shared by every page. */
export function BackgroundCubesGrid() {
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const updateHover = () => {
      frame = 0;
      const bounds = cube.getBoundingClientRect();
      const hovered =
        pointerX >= bounds.left &&
        pointerX <= bounds.right &&
        pointerY >= bounds.top &&
        pointerY <= bounds.bottom;
      cube.toggleAttribute("data-hovered", hovered);

      if (hovered) {
        const x = (pointerX - bounds.left) / bounds.width - 0.5;
        const y = (pointerY - bounds.top) / bounds.height - 0.5;
        cube.style.setProperty("--cube-tilt-x", `${-y * 10}deg`);
        cube.style.setProperty("--cube-tilt-y", `${x * 10}deg`);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(updateHover);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="site-cube-backdrop" aria-hidden="true">
      <div ref={cubeRef} className="site-cube-stage">
        <div className="site-cube-core">
          <span className="site-cube-face site-cube-front" />
          <span className="site-cube-face site-cube-back" />
          <span className="site-cube-face site-cube-right" />
          <span className="site-cube-face site-cube-left" />
          <span className="site-cube-face site-cube-top" />
          <span className="site-cube-face site-cube-bottom" />
        </div>
      </div>
    </div>
  );
}