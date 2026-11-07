import heroPortrait from "../../../assets/optimized/hero-portrait-lakeside.jpg.webp";
const skillRows = [["JavaScript", "HTML", "CSS", "React"], ["Flutter", "Figma", "UI/UX Design"]];
export default function Hero() {
  return <section id="home" aria-labelledby="hero-title">
    <svg className="hero-constellation" viewBox="0 0 320 240" fill="none" aria-hidden="true" focusable="false">
      <path d="m24 174 61-86 72 35 54-85 80 50-66 96-68-61-53 86-80-35" stroke="currentColor" strokeOpacity=".55" strokeDasharray="4 7" />
      <g fill="currentColor">{[[24, 174], [85, 88], [157, 123], [211, 38], [291, 88], [225, 184], [104, 209]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />)}</g>
      <path d="m85 70 3 14 15 4-15 3-3 15-4-15-14-3 14-4 4-14Zm140 101 3 10 10 3-10 2-3 11-2-11-11-2 11-3 2-10Z" fill="currentColor" />
    </svg>
    <div className="hero-margin-note" aria-hidden="true">jsphnmgt / a work in progress, always</div>
    <div className="hero-card-stack">
      <div className="hero-text">
        <p className="hero-eyebrow"><span aria-hidden="true">✦</span> Frontend developer & creative thinker</p>
        <div className="hero-heading">
          <h1 id="hero-title"><span className="hero-greeting">Hi, I'm</span> Maria Josephine <em>Magat.</em></h1>
        </div>
        <p className="tagline">A little code. A little curiosity. A lot of care.</p>
        <div className="hero-bio"><p>I'm a Computer Science student focused on frontend development, interface design, and the details that make products intuitive. I enjoy turning messy ideas into clean, usable experiences where design and code meet.</p><p>I'm seeking an internship where I can learn from experienced people, contribute to a team, and help ship thoughtful work.</p></div>
        <div className="hero-actions"><a className="creative-button hero-cv-button" href={`${import.meta.env.BASE_URL}Maria-Josephine-Magat_CV.pdf`} target="_blank" rel="noopener noreferrer">Download CV <span aria-hidden="true">↓</span><span className="sr-only"> (opens in a new tab)</span></a><a className="hero-contact-link" href="#contact">Let's connect <span aria-hidden="true">↗</span></a></div>
      </div>
      <div className="hero-media">
        <div className="portrait-caption"><span>A face behind the work.</span><span aria-hidden="true">✦</span></div>
        <div className="hero-photo"><img src={heroPortrait} alt="Maria Josephine Magat on a lakeside wooden walkway among trees" style={{ objectPosition: "50% 85%" }} fetchPriority="high" /></div>
        <span className="portrait-sticker" aria-hidden="true"><span>build. learn.</span><em>repeat.</em></span>
      </div>
      <div className="hero-skills">
        <div className="skills-list" aria-label="Skills">{skillRows.map((row, index) => (
          <div className="skills-row" key={index}>
            {row.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
          </div>
        ))}</div>
        <p className="portrait-footnote">my ever-growing creative toolkit</p>
      </div>
    </div>
    <div className="hero-bottom-note"><a href="#projects">Keep exploring <span aria-hidden="true">↓</span></a></div>
  </section>;
}
