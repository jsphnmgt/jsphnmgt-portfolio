import { assets } from "../../../assets";
const projects = [
  {
    title: "CapsiCAM",
    githubUrl: "https://github.com/hrspnd/CapsiCAM",
    projectType: "Group project",
    description: "A mobile application for real-time chili pepper leaf disease classification using deep learning", techStack: ["Flutter", "Dart", "Python", "TensorFlow Lite", "Supabase"], asset: "capsicam-cover.png", crop: "capsicam"
  },
  {
    title: "Course Companion",
    projectType: "Solo project",
    codeStatus: "Private repository",
    description: "A course companion website helping students organize lessons, track progress, and access learning resources", techStack: ["React", "HTML", "CSS"], asset: "course-companion-cover.png", crop: "course"
  },
  {
    title: "HAUlam",
    githubUrl: "https://github.com/hrspnd/HAUlam",
    projectType: "Group project",
    description: "Haulam helps users discover, browse, bookmark, and interact with food stalls at Holy Angel University", techStack: ["Flutter", "Dart", "Supabase"], asset: "haulam-cover.png", crop: "haulam"
  },
  {
    title: "MYSTICA",
    githubUrl: "https://github.com/jsphnmgt/Mystica",
    projectType: "Solo project",
    description: "Mystica is a Studio Ghibli-inspired website featuring movies, characters, and its magical world", techStack: ["HTML", "CSS", "JavaScript"], asset: "mystica-cover.png", crop: "mystica"
  },
  {
    title: "Portfolio",
    projectType: "Solo project",
    codeStatus: "Repository link coming soon",
    description: "A CV website showcasing professional experience, education, skills, and achievements", techStack: ["React", "HTML", "CSS"], asset: "portfolio-cover.png", crop: "portfolio"
  },
];
export default function Projects({ onCardClick }) {
  return <section id="projects" aria-labelledby="projects-title">
    <p className="chapter-label"><span>01 /</span> Ideas made real</p>
    <div className="section-heading">
      <h2 id="projects-title">Selected <em>projects.</em></h2><span className="ornament" aria-hidden="true" />
    </div>
    <p className="section-intro">A collection of things I've built, explored, and learned along the way.</p>
    <div className="projects-grid">{projects.map((project, index) => <button key={project.title} className="project-card" onClick={() => onCardClick({ ...project, image: assets[project.asset] })} aria-label={`View ${project.title} project`}>
      <div className="project-windowbar" aria-hidden="true"><span className="window-dots"><i /><i /><i /></span><span>{project.projectType}</span><span>{String(index + 1).padStart(2, "0")} / 05</span></div>
      <div className={`project-image ${project.crop}`}><img src={assets[project.asset]} alt={project.title + " screenshot"} loading="lazy" decoding="async" /></div>
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">{project.techStack.map(tag => <span key={tag}>{tag}</span>)}</div>
        <span className="project-open-note" aria-hidden="true">Explore project <span>↗</span></span>
      </div>
    </button>)}</div>
  </section>;
}
