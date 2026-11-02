const rawAssets = import.meta.glob(["./**/*.svg", "./optimized/*.webp", "!./design-system/**", "!./mockup/**", "!./optimized/stars-*.webp", "!./portfolio/constellation.svg"], {
  eager: true,
  import: "default",
});

export const assets = Object.fromEntries(
  Object.entries(rawAssets).map(([path, module]) => [
    path.startsWith("./optimized/") ? path.split("/").pop().replace(/\.webp$/, "") : path.split("/").pop(),
    module,
  ])
);
