const symbols = {
  HTML: "</>",
  CSS: "#",
  JavaScript: "JS",
  Flutter: "//",
  Dart: "↗",
  Python: "Py",
  "TensorFlow Lite": "TF",
  Supabase: "ϟ",
};

export default function TechnologyStack({ technologies }) {
  return <ul className="project-technology-list" role="list">
    {technologies.map(technology => <li key={technology}>
      <span className="project-technology-mark" aria-hidden="true">
        {technology === "React" ? <svg viewBox="-12 -12 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <ellipse rx="10" ry="4" /><ellipse rx="10" ry="4" transform="rotate(60)" /><ellipse rx="10" ry="4" transform="rotate(120)" /><circle r="1.6" fill="currentColor" stroke="none" />
        </svg> : symbols[technology] || technology.slice(0, 2)}
      </span>
      <span className="project-technology-name">{technology}</span>
    </li>)}
  </ul>;
}
