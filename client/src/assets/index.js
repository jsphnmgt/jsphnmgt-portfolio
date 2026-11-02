const rawAssets = import.meta.glob(["./**/*.svg", "./optimized/*.webp", "!./design-system/**", "!./mockup/**"], {
  eager: true,
  import: "default",
});

export const assets = Object.fromEntries(
  Object.entries(rawAssets).map(([path, module]) => [
    path.startsWith("./optimized/") ? path.split("/").pop().replace(/\.webp$/, "") : path.split("/").pop(),
    module,
  ])
);
