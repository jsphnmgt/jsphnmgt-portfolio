import { useEffect, useState } from "react";

export function ReadingBoardClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 10000);
    return () => window.clearInterval(timer);
  }, []);
  const time = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Singapore", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(now);
  return <div className="reading-digital-clock" aria-label={`Singapore time ${time}`}>
    <time dateTime={now.toISOString()}>{time}</time>
    <span>time for a chapter</span>
  </div>;
}

export default function ReadingBoardDecor() {
  return <div className="reading-board-accessories reading-mounted-decor" aria-hidden="true">
    <div className="reading-mounted-shelf">
      <div className="reading-shelf-contents">
        <svg className="reading-illustrated-plant" viewBox="0 0 140 160" fill="none">
          <g stroke="var(--color-steel)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M70 116V37M70 93 45 68M70 79l26-25M70 60 52 42" />
            <path fill="var(--color-lavender)" d="M69 44C50 33 60 16 72 9c12 17 12 27-3 35ZM53 64C30 66 22 49 24 36c23 0 35 9 29 28ZM87 72c-4-23 10-34 29-34 0 20-10 33-29 34ZM59 94C35 95 26 82 28 68c20-1 33 9 31 26ZM79 104c-1-22 14-32 32-29-2 19-13 29-32 29Z" />
            <path fill="var(--color-cream)" d="m43 115 6 34q21 9 42 0l6-34Z" />
            <rect x="39" y="108" width="62" height="12" rx="4" fill="var(--color-lavender)" />
            <path d="M61 129v13m9-13v16m9-16v13" opacity=".4" />
          </g>
        </svg>
        <div className="reading-shelf-book-stack"><i /><i /><i /><span>slow mornings,<br />good stories.</span></div>
      </div>
      <span className="reading-physical-ledge" /><span className="reading-shelf-bracket reading-shelf-bracket-left" /><span className="reading-shelf-bracket reading-shelf-bracket-right" />
    </div>
    <div className="reading-mounted-headphones"><span className="reading-metal-hook" />
      <svg className="reading-illustrated-headphones" viewBox="0 0 150 180" fill="none">
        <g stroke="var(--color-steel)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M29 113V71a46 46 0 0 1 92 0v42" strokeWidth="13" />
          <path d="M29 108V71a46 46 0 0 1 92 0v37" stroke="var(--color-lavender)" strokeWidth="8" />
          <path d="M40 69a35 35 0 0 1 70 0" stroke="var(--color-cream)" strokeWidth="5" />
          <rect x="20" y="102" width="29" height="53" rx="13" fill="var(--color-lavender)" transform="rotate(-8 20 102)" />
          <rect x="34" y="106" width="17" height="44" rx="8" fill="var(--color-cream)" transform="rotate(-8 34 106)" />
          <rect x="101" y="102" width="29" height="53" rx="13" fill="var(--color-lavender)" transform="rotate(8 130 102)" />
          <rect x="99" y="106" width="17" height="44" rx="8" fill="var(--color-cream)" transform="rotate(8 116 106)" />
          <path d="m120 154-2 9q-1 10-14 10H83" />
        </g>
      </svg>
    </div>
    <div className="reading-mounted-pens"><span className="reading-cup-hooks" /><div className="reading-pen-stems"><i /><i /><i /><i /><i /></div><span className="reading-mesh-cup" /></div>
  </div>;
}
