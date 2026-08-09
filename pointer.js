(() => {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!finePointer.matches || reducedMotion.matches) return;

  let frame = 0;
  const reset = () => {
    cancelAnimationFrame(frame);
    hero.style.setProperty("--pointer-x", "50%");
    hero.style.setProperty("--pointer-y", "45%");
    hero.style.setProperty("--parallax-x", "0px");
    hero.style.setProperty("--parallax-y", "0px");
  };

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      hero.style.setProperty("--pointer-x", `${(x * 100).toFixed(2)}%`);
      hero.style.setProperty("--pointer-y", `${(y * 100).toFixed(2)}%`);
      hero.style.setProperty("--parallax-x", `${((x - 0.5) * 16).toFixed(2)}px`);
      hero.style.setProperty("--parallax-y", `${((y - 0.5) * 10).toFixed(2)}px`);
    });
  }, { passive: true });

  hero.addEventListener("pointerleave", reset);
})();
