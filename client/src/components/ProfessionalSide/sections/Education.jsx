import { assets } from "../../../assets";
const education = [
  { degree: "Bachelor of Science in Computer Science", school: "Holy Angel University", date: "2023 - present" },
  { degree: "Science, Technology, Engineering, and Mathematics", school: "Bloomingfields Academy", date: "2021 - 2023" },
];
export default function Education() {
  return <section id="education" aria-labelledby="education-title">
    <p className="chapter-label"><span>03 /</span> Always a student</p>
    <div className="section-heading">
      <h2 id="education-title">Education</h2>
      <span className="ornament" aria-hidden="true" />
    </div>
    <div className="education-layout">
      <img className="education-photo" src={assets["education-cafe.png"]} alt="A leafy green café with a warmly lit entrance" loading="lazy" decoding="async" />
      <div className="education-list">{education.map(item => <article className="education-card" key={item.school}>
        <h3>{item.degree}</h3>
        <p>{item.school}</p>
        <p className="education-date">{item.date}</p>
      </article>)}
      </div>
    </div>
  </section>;
}
