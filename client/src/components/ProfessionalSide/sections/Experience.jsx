import { assets } from "../../../assets";
const experience = [
  { role: "League of Outstanding Programmers Finance Staff", description: "Assisted in managing financial transactions, processing receipts, tracking expenses, maintaining accurate records, preparing financial reports, and monitoring budgets for LOOP while ensuring compliance with financial policies and procedures." },
  { role: "Alpha Fox Finance Staff", description: "Supported Alpha Fox, a department organization, by handling financial transactions, processing receipts, tracking expenses, maintaining records, preparing financial reports, and monitoring budgets in accordance with financial policies and procedures." },
];
export default function Experience() {
  return <section id="experience" aria-labelledby="experience-title">
    <p className="chapter-label">Along the way</p>
    <h2 id="experience-title" className="display-heading">Experience</h2>
    <p className="experience-subtitle">Roles and contributions in student organizations.</p>
    <div className="experience-layout">
      <div className="experience-list">{experience.map(item => <article className="experience-entry" key={item.role}>
        <p className="experience-date">2024 - 2025</p>
        <div className="experience-card">
          <h3>{item.role}</h3>
          <p className="organization">at School of Computing Department | Holy Angel University</p>
          <div className="experience-description"><img src={assets["experience-bullet.png"]} alt="" /><p>{item.description}</p></div>
        </div>
      </article>)}</div>
    </div>
  </section>;
}
