import "../../../styles/skills.css";

const groups = [
  { title: "Development", mark: "</>", description: "Building for the web and mobile, and solving problems through code.", tools: ["HTML", "CSS", "JavaScript", "React", "Flutter", "Dart", "Java", "Python"] },
  { title: "Databases", mark: "DB", description: "Organizing data and working with relational databases.", tools: ["SQL", "PostgreSQL"] },
  { title: "Design & tools", mark: "+", description: "Shaping interfaces, creating visuals, and collaborating on code.", tools: ["Figma", "Canva", "UI/UX Design", "GitHub", "Notion"] },
  { title: "Soft skills", mark: "+", description: "Bringing care, clear communication, and collaboration to the work.", tools: ["Communication", "Teamwork", "Problem-solving", "Organization", "Attention to detail"] },
];

export default function Skills() {
  return <section id="skills" aria-labelledby="skills-title">
    <p className="chapter-label">What I work with</p>
    <div className="section-heading"><h2 id="skills-title">Skills and <em>tools.</em></h2><span className="ornament" aria-hidden="true" /></div>
    <p className="section-intro">My technical skills and the strengths I bring to a team.</p>
    <div className="professional-skills-grid">{groups.map(group => <article className="professional-skill-card" key={group.title}>
      <div className="professional-skill-card-top"><span className="professional-skill-symbol" aria-hidden="true">{group.mark}</span><h3>{group.title}</h3></div>
      <p>{group.description}</p>
      <ul className="project-technology-list">{group.tools.map(tool => <li key={tool}><span className="project-technology-name">{tool}</span></li>)}</ul>
    </article>)}</div>
    <p className="professional-skills-note"><span aria-hidden="true">✧</span> Always learning. Always making room for something new.</p>
  </section>;
}
