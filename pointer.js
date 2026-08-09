(() => {
  const hero = document.querySelector(".hero");
  const zones = Array.from(document.querySelectorAll(".pointer-zone"));
  if (!zones.length) return;

  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!finePointer.matches || reducedMotion.matches) return;

  let frame = 0;
  const reset = (zone) => {
    cancelAnimationFrame(frame);
    zone.style.setProperty("--pointer-x", "50%");
    zone.style.setProperty("--pointer-y", "50%");
    zone.style.setProperty("--zone-x", "0px");
    zone.style.setProperty("--zone-y", "0px");
    if (zone === hero) {
      zone.style.setProperty("--parallax-x", "0px");
      zone.style.setProperty("--parallax-y", "0px");
    }
  };

  zones.forEach((zone) => {
    zone.addEventListener("pointermove", (event) => {
      const rect = zone.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        zone.style.setProperty("--pointer-x", `${(x * 100).toFixed(2)}%`);
        zone.style.setProperty("--pointer-y", `${(y * 100).toFixed(2)}%`);
        zone.style.setProperty("--zone-x", `${((x - 0.5) * 8).toFixed(2)}px`);
        zone.style.setProperty("--zone-y", `${((y - 0.5) * 6).toFixed(2)}px`);
        if (zone === hero) {
          zone.style.setProperty("--parallax-x", `${((x - 0.5) * 16).toFixed(2)}px`);
          zone.style.setProperty("--parallax-y", `${((y - 0.5) * 10).toFixed(2)}px`);
        }
      });
    }, { passive: true });

    zone.addEventListener("pointerleave", () => reset(zone));
  });
})();
