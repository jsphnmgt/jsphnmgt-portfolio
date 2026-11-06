const education = [
  { degree: "Bachelor of Science in Computer Science", school: "Holy Angel University", date: "2023 - present", current: true },
  { degree: "Science, Technology, Engineering, and Mathematics", school: "Bloomingfields Academy", date: "2021 - 2023", label: "Senior high school" },
  { degree: "Junior High School", school: "St. Nathanael Academy", date: "2017 - 2021", label: "Secondary education" },
  { degree: "Elementary School", school: "St. Nathanael Academy", date: "2011 - 2017", label: "Primary education" },
];
export default function Education() {
  return <section id="education" aria-labelledby="education-title">
    <p className="chapter-label">My learning journey</p>
    <div className="section-heading">
      <h2 id="education-title">Education</h2>
      <span className="ornament" aria-hidden="true" />
    </div>
    <div className="education-layout">
      <ol className="education-list education-path">{education.map(item => <li className={`education-step${item.current ? " is-current" : ""}`} key={`${item.school}-${item.degree}`}>
        <div className="education-milestone"><span className="education-path-date">{item.date}</span><span className="education-path-label">{item.current ? "Learning continues" : item.label}</span></div>
        <article className="education-card">
          <div className="education-card-heading">
            <h3>{item.degree}</h3>
            {item.current && <span className="education-current">Currently studying</span>}
          </div>
          <p>{item.school}</p>
        </article>
      </li>)}
      </ol>
    </div>
  </section>;
}
