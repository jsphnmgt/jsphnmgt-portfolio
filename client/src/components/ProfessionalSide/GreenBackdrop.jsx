export default function GreenBackdrop() {
  return <div className="green-backdrop" aria-hidden="true">
    <svg className="green-ribbon" viewBox="0 0 1400 600" fill="none" preserveAspectRatio="none" focusable="false">
      <path d="M-100 470C200 40 360 600 750 290S1170 70 1500 230" stroke="var(--color-mint)" strokeOpacity=".25" strokeWidth="85" />
      <path d="M-100 420C200-10 360 550 750 240S1170 20 1500 180" stroke="var(--color-cream)" strokeOpacity=".5" />
      <path d="M-100 520C200 90 360 650 750 340S1170 120 1500 280" stroke="var(--color-cream)" strokeOpacity=".25" />
    </svg>
    <svg className="green-constellation" viewBox="0 0 360 240" fill="none" focusable="false">
      <path d="m30 160 75-90 85 35 57-65 75 74-65 86-67-95" stroke="currentColor" strokeDasharray="3 8" />
      <g fill="currentColor">
        <circle cx="30" cy="160" r="3" /><circle cx="105" cy="70" r="3" /><circle cx="190" cy="105" r="3" />
        <circle cx="247" cy="40" r="3" /><circle cx="322" cy="114" r="3" /><circle cx="257" cy="200" r="3" />
        <path d="m105 56 3 11 11 3-11 3-3 11-3-11-11-3 11-3Zm152 131 3 10 10 3-10 3-3 10-3-10-10-3 10-3Z" />
      </g>
    </svg>
    <svg className="green-orbits" viewBox="0 0 600 600" fill="none" focusable="false">
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="300" cy="300" r="225" />
        <circle cx="300" cy="300" r="255" strokeDasharray="2 12" />
        <ellipse cx="300" cy="300" rx="280" ry="100" transform="rotate(-35 300 300)" />
      </g>
      <g fill="currentColor">
        <circle cx="116" cy="171" r="5" />
        <circle cx="461" cy="457" r="4" />
        <path d="m359 48 4 17 17 4-17 4-4 17-4-17-17-4 17-4Z" />
      </g>
    </svg>
    <svg className="green-contours" viewBox="0 0 500 700" fill="none" focusable="false">
      <g stroke="currentColor" strokeWidth="1">
        <path d="M-70 20C420 50 50 270 350 370S420 600 90 740" />
        <path d="M-95 45C395 75 25 295 325 395S395 625 65 765" />
        <path d="M-120 70C370 100 0 320 300 420S370 650 40 790" />
        <path d="M-145 95C345 125-25 345 275 445S345 675 15 815" />
      </g>
    </svg>
    <span className="green-section-star">✦</span>
  </div>;
}
