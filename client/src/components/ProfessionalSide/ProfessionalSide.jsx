import { useEffect, useRef, useState } from "react";
import Overlay from "./Overlay";
import ProjectPreview from "./ProjectPreview";
import PortfolioScrollbar from "./PortfolioScrollbar";
import usePortfolioMotion from "../../hooks/usePortfolioMotion";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Certificates from "./sections/Certificates";
import Contact from "./sections/Contact";
import RoomInvitation from "./RoomInvitation";
import SparkleField from "./SparkleField";
import { assets } from "../../assets";

export default function ProfessionalSide({ savedPosition = null }) {
  const [activeItem, setActiveItem] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navbarRef = useRef(null);
  usePortfolioMotion(navbarRef);

  useEffect(() => {
    const navbar = navbarRef.current;
    const app = navbar.closest(".app");
    const observer = new ResizeObserver(() => {
      app.style.setProperty("--navbar-height", navbar.getBoundingClientRect().height + "px");
    });
    observer.observe(navbar);
    app.style.setProperty("--navbar-height", navbar.getBoundingClientRect().height + "px");
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    const frame = requestAnimationFrame(() => {
      if (savedPosition) {
        const anchor = savedPosition.anchorId ? document.getElementById(savedPosition.anchorId) : null;
        const top = anchor && Number.isFinite(savedPosition.anchorOffset)
          ? window.scrollY + anchor.getBoundingClientRect().top - savedPosition.anchorOffset
          : savedPosition.top;
        window.scrollTo({ top, behavior: "instant" });
        document.querySelector(".explore-room-btn")?.focus({ preventScroll: true });
      } else target?.scrollIntoView({ behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [savedPosition]);

  useEffect(() => {
    if (!isNavOpen) return;
    const dismiss = event => {
      if (!navbarRef.current?.contains(event.target)) setIsNavOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [isNavOpen]);

  useEffect(() => {
    const sections = [...navbarRef.current.closest(".app").querySelectorAll("section[id]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!navbarRef.current) return;
      const readingLine = navbarRef.current.getBoundingClientRect().bottom + window.innerHeight * .2;
      let current = sections[0]?.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = sections.at(-1)?.id;
      setActiveSection(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <>
    <a className="skip-link" href="#portfolio-content">Skip to content</a>
    <PortfolioScrollbar />
    <nav ref={navbarRef} className={`navbar${isNavOpen ? " is-open" : ""}`} aria-label="Main navigation" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setIsNavOpen(false); }} onKeyDown={event => {
      if (event.key === "Escape" && isNavOpen) {
        setIsNavOpen(false);
        event.currentTarget.querySelector(".nav-toggle").focus();
      }
    }}>
      <button className="nav-toggle" aria-expanded={isNavOpen} aria-controls="portfolio-nav-links" onClick={() => setIsNavOpen(open => !open)}>Menu <span aria-hidden="true">{isNavOpen ? "−" : "+"}</span></button>
      <div id="portfolio-nav-links" className="nav-links">{["Home", "Projects", "Experience", "Education", "Certificates", "Contact"].map(label => <a key={label} href={`#${label.toLowerCase()}`} onClick={() => { setIsNavOpen(false); document.getElementById("portfolio-content")?.focus({ preventScroll: true }); }} aria-current={activeSection === label.toLowerCase() ? "location" : undefined}>{label}</a>)}</div>
      <button className="explore-room-btn" onClick={() => { window.location.hash = "room"; }}><span>Explore my room</span><img src={assets["room-arrow.svg"]} alt="" /></button>
    </nav>
    <div id="portfolio-content" tabIndex={-1}>
      <div className="blue-sky opening">
        <SparkleField />
        <div><Hero /><Projects onCardClick={setActiveItem} /></div>
      </div>
      <div className="green-world"><Experience /><Education /></div>
      <div className="blue-sky closing"><SparkleField variant="closing" /><Certificates onCardClick={setActiveItem} /><RoomInvitation /><Contact /></div>
    </div>
    <Overlay className={activeItem?.techStack ? "project-overlay" : activeItem?.type === "certificate" ? "project-overlay certificate-overlay" : ""} isOpen={!!activeItem} onClose={() => setActiveItem(null)}>{activeItem && (activeItem.techStack ? <div className="project-detail-scroll" tabIndex={0} aria-label="Project details">
      <div className="project-detail-layout">
        <ProjectPreview key={activeItem.image} image={activeItem.image} title={activeItem.title} />
        <div className="project-detail-copy">
          <div className="project-detail-body">
            <div className="project-detail-summary">
              <span className="project-detail-label">{activeItem.projectType || "Selected project"}</span>
              <h2 id="detail-title">{activeItem.title}</h2>
              <p>{activeItem.description}</p>
            </div>
            <div className="project-detail-actions">
              {activeItem.githubUrl ? <a className="project-code-button" href={activeItem.githubUrl} target="_blank" rel="noreferrer"><img src={assets["github-logo.png"]} alt="" />GitHub Code <span className="sr-only">(opens in a new tab)</span></a> : <span className="project-code-unavailable">{activeItem.codeStatus || "Code link unavailable"}</span>}
            </div>
            <div className="project-detail-technologies"><h3>Built with</h3><div className="tags">{activeItem.techStack.map(tag => <span key={tag}>{tag}</span>)}</div></div>
          </div>

        </div>
      </div>
    </div> : activeItem.type === "certificate" ? <div className="project-detail-scroll" tabIndex={0} aria-label="Certificate details">
      <div className="project-detail-layout certificate-detail-layout">
        <div className="certificate-detail-preview">
          <img className="certificate-detail-image" src={activeItem.image} alt={`${activeItem.title} certificate`} />
        </div>
        <div className="project-detail-copy">
          <div className="project-detail-body">
            <div className="project-detail-summary">
              <span className="project-detail-label">Certificate</span>
              <h2 id="detail-title">{activeItem.title}</h2>
              <p>{activeItem.description}</p>
            </div>
            <dl className="certificate-detail-meta">
              <div><dt>Issued by</dt><dd>{activeItem.issuer}</dd></div>
              <div><dt>Date earned</dt><dd>{activeItem.dateEarned}</dd></div>
            </dl>
            <div className="project-detail-actions">
              {activeItem.credentialUrl ? <a className="project-code-button" href={activeItem.credentialUrl} target="_blank" rel="noreferrer">View Credential <span className="sr-only">(opens in a new tab)</span></a> : <button className="project-code-button" disabled title="Credential link coming soon">View Credential</button>}
              <a className="certificate-image-link" href={activeItem.image} target="_blank" rel="noreferrer">Open full-size certificate <span className="sr-only">(opens in a new tab)</span></a>
            </div>
          </div>
        </div>
      </div>
    </div> : <>
      <h2 id="detail-title">{activeItem.title}</h2>
      {activeItem.image && <img className="detail-image" src={activeItem.image} alt={activeItem.title + " preview"} />}
      <p>{activeItem.description}</p>
    </>)}</Overlay>
  </>;
}
