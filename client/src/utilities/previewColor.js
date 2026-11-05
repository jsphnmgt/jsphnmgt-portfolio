const hue = (red, green, blue) => {
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const chroma = max - min;
  if (!chroma) return null;
  const sector = max === red ? (green - blue) / chroma : max === green ? (blue - red) / chroma + 2 : (red - green) / chroma + 4;
  return (sector * 60 + 360) % 360;
};

export function selectPreviewColor(pixels, palette) {
  const fallback = palette[0]?.token || "--color-mint";
  const buckets = Array(36).fill(0);
  for (let index = 0; index < pixels.length; index += 4) {
    const [red, green, blue, alpha] = pixels.slice(index, index + 4);
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    if (alpha < 128 || max < 35 || max - min < 25) continue;
    buckets[Math.floor(hue(red, green, blue) / 10)] += max - min;
  }
  const strongest = Math.max(...buckets);
  if (!strongest) return fallback;
  const dominant = buckets.indexOf(strongest) * 10 + 5;
  const complement = (dominant + 180) % 360;
  let choice = fallback;
  let bestDistance = Infinity;
  palette.forEach(({ token, rgb }) => {
    const candidate = hue(...rgb);
    if (candidate === null) return;
    const difference = Math.abs(candidate - complement);
    const distance = Math.min(difference, 360 - difference);
    if (distance < bestDistance) {
      bestDistance = distance;
      choice = token;
    }
  });
  return choice;
}
