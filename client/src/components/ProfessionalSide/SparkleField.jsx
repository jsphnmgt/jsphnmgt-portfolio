import { useId } from "react";

// Normalized positions keep the pattern deterministic and independent of layout.
const dots = [
  [.04, .09, .8, .5], [.15, .04, 1.1, .6], [.28, .12, .7, .4],
  [.43, .05, .8, .65], [.58, .1, 1.2, .5], [.78, .04, .7, .45],
  [.94, .16, .9, .6], [.08, .33, .7, .45], [.24, .29, 1, .5],
  [.38, .23, .6, .6], [.62, .32, .8, .4], [.83, .29, 1, .55],
  [.97, .43, .7, .65], [.16, .49, .9, .5], [.31, .43, .7, .4],
  [.48, .52, 1.1, .6], [.72, .46, .7, .5], [.87, .56, .8, .6],
  [.03, .69, .8, .5], [.26, .67, 1, .55], [.42, .73, .7, .4],
  [.59, .63, .9, .6], [.77, .74, .6, .55], [.95, .7, 1, .4],
  [.12, .89, 1.1, .55], [.34, .92, .7, .5], [.55, .87, .8, .65],
  [.71, .96, .7, .4], [.91, .91, .9, .6],
  [.19, .18, .65, .4], [.53, .39, .7, .4], [.9, .36, .65, .45],
  [.36, .81, .7, .4], [.64, .89, .65, .4], [.09, .6, .6, .4],
];
const stars = [[.09, .19, .8], [.48, .19, .38], [.82, .15, .65], [.31, .56, .55], [.68, .66, .9], [.08, .8, .4], [.88, .91, .48]];

export default function SparkleField({ variant = "opening" }) {
  const id = `sparkles-${useId().replace(/:/g, "")}`;
  const offset = variant === "closing" ? .27 : 0;
  const pattern = compact => {
    const width = compact ? 320 : 560;
    const height = compact ? 360 : 440;
    return <pattern id={`${id}-${compact ? "compact" : "wide"}`} key={String(compact)} width={width} height={height} patternUnits="userSpaceOnUse">
      {dots.map(([x, y, radius, opacity], index) => <circle key={`dot-${index}`} cx={((x + offset) % 1) * width} cy={y * height} r={radius} fill="currentColor" opacity={opacity} />)}
      {stars.map(([x, y, scale], index) => <use key={`star-${index}`} href={`#${id}-star`} transform={`translate(${((x + offset) % 1) * width} ${y * height}) scale(${scale * (compact ? .75 : 1)}) rotate(${index % 3 === 0 ? 45 : 0})`} opacity={index % 2 ? .65 : .9} />)}
    </pattern>;
  };

  return <svg className={`sparkle-field sparkle-field-${variant}`} width="100%" height="100%" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id={`${id}-glow`}><stop stopColor="currentColor" stopOpacity=".3" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient>
      <g id={`${id}-star`}>
        <circle r="25" fill={`url(#${id}-glow)`} />
        <path d="M0-12C1-3 3-1 12 0C3 1 1 3 0 12C-1 3-3 1-12 0C-3-1-1-3 0-12Z" fill="currentColor" />
        <circle r="1.5" fill="currentColor" />
      </g>
      {pattern(false)}
      {pattern(true)}
    </defs>
    <rect className="sparkle-field-wide" width="100%" height="100%" fill={`url(#${id}-wide)`} />
    <rect className="sparkle-field-compact" width="100%" height="100%" fill={`url(#${id}-compact)`} />
  </svg>;
}
