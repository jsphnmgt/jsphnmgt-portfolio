import { assets } from "../../../assets";
import { projectShowcases } from "../../../data/projectShowcases";
const projects = [
  {
    title: "CapsiCAM",
    image: projectShowcases.CapsiCAM.views[0].image,
    githubUrl: "https://github.com/hrspnd/CapsiCAM",
    projectType: "Group project",
    description: "An Android application developed for an undergraduate thesis that classifies chili pepper leaf images using deep learning and displays visual explanations of its predictions.", techStack: ["Flutter", "Dart", "Python", "TensorFlow Lite", "Supabase"], asset: "capsicam_homescreen.jpg", crop: "capsicam"
  },
  {
    title: "Course Companion",
    image: projectShowcases["Course Companion"].views[0].image,
    projectType: "Solo project",
    githubUrl: "https://github.com/jsphnmgt/Course-Companion",
    description: "A course companion website with subject lessons and flashcards for reviewing questions and answers.", techStack: ["React", "HTML", "CSS"], crop: "course"
  },
  {
    title: "HAUlam",
    githubUrl: "https://github.com/hrspnd/HAUlam",
    projectType: "Group project",
    description: "A mobile application for discovering food stalls at Holy Angel University, finding dishes, and saving favorite stalls for easy access.", techStack: ["Flutter", "Dart", "Supabase"], asset: "haulam-cover.png", crop: "haulam"
  },
  {
    title: "My Bookshelf",
    projectType: "Solo project",
    description: "A React app for adding books to a personal collection and displaying them on a responsive virtual shelf.",
    techStack: ["React", "JavaScript", "CSS"],
    image: projectShowcases["My Bookshelf"].views[0].image,
    crop: "bookshelf",
    githubUrl: "https://github.com/jsphnmgt/my-bookshelf",
  },
  {
    title: "MYSTICA",
    githubUrl: "https://github.com/jsphnmgt/Mystica",
    projectType: "Solo project",
    description: "Mystica is a Studio Ghibli-inspired website featuring movies, characters, and its magical world", techStack: ["HTML", "CSS", "JavaScript"], asset: "mystica-cover.png", crop: "mystica"
  },
];
export default function Projects({ onCardClick }) {
  return <section id="projects" aria-labelledby="projects-title">
    <p className="chapter-label">Ideas made real</p>
    <div className="section-heading">
      <h2 id="projects-title">Featured <em>projects.</em></h2><span className="ornament" aria-hidden="true" />
    </div>
    <p className="section-intro">A collection of things I've built, explored, and learned along the way.</p>
    <div className="projects-grid">{projects.map((project, index) => <button key={project.title} className="project-card" onClick={() => onCardClick({ ...project, showcase: projectShowcases[project.title], image: project.image || assets[project.asset] })} aria-label={`View ${project.title} project`}>
      <div className="project-windowbar" aria-hidden="true"><span className="window-dots"><i /><i /><i /></span><span>{project.projectType}</span><span>{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span></div>
      <div className={`project-image ${project.crop}`}><img src={project.image || assets[project.asset]} alt={project.title + " screenshot"} loading="lazy" decoding="async" /></div>
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.techStack.length > 0 && <div className="tags">{project.techStack.map(tag => <span key={tag}>{tag}</span>)}</div>}
        <span className="project-open-note" aria-hidden="true">Explore project <span>↗</span></span>
      </div>
    </button>)}</div>
  </section>;
}
