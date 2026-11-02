import { assets } from "../../../assets";
const skillRows = [["HTML/CSS", "JAVASCRIPT", "REACT"], ["UI DESIGN", "FLUTTER", "FIGMA"]];
export default function Hero() {
  return <section id="home" aria-labelledby="hero-title">
    <div className="hero-card-stack">
      <div className="hero-text">
        <div className="hero-heading">
          <h1 id="hero-title">Hi, I'm Josephine Magat</h1>
          <span aria-hidden="true" /></div>
        <p className="tagline">Frontend developer, still figuring out the backend</p>
        <p className="blurb">I'm a Computer Science student focused on front-end development, interface design, interaction, and details that make a product feel intuitive rather than functional. I care about where design and code meet, and I enjoy turning messy ideas into something clean, usable, and ready for people. I’m especially interested in how small design choices can make everyday interactions feel smoother. I'm seeking an internship where I can bring that mindset to a team, learn from experienced people, and contribute to work that ships.</p>
      </div>
      <div className="hero-media">
        <img src={assets["profile-photo.jpg"]} alt="An illustrated character enjoying a drink among plants" fetchPriority="high" />
        <div className="skills-list">{skillRows.map((row, index) => (
          <div className="skills-row" key={index}>
            {row.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
          </div>
        ))}</div>
      </div>
    </div>
  </section>;
}
