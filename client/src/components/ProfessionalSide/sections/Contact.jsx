import { assets } from "../../../assets";
import "../../../styles/contact.css";
export default function Contact() {
  return <section id="contact" aria-labelledby="contact-title">
    <div className="ornament contact-divider" aria-hidden="true" />
    <p className="chapter-label">Get in touch</p>
    <h2 id="contact-title" className="display-heading">Let's connect</h2>
    <p className="contact-intro">I'm open to internship opportunities and project collaborations.</p>
    <div className="contact-card">
      <a href="mailto:jsphnmagat@gmail.com"><span className="contact-stamp"><img src={assets["gmail-logo.png"]} alt="" /></span><span className="contact-watermark" aria-hidden="true">@</span>
        <h3>Email</h3>
        <p>jsphnmagat@gmail.com</p>
        <span className="contact-action">Write an email <span aria-hidden="true">&#8599;</span></span>
      </a>
      <a href="https://github.com/jsphnmgt" target="_blank" rel="noopener noreferrer"><span className="contact-stamp"><img src={assets["github-logo.png"]} alt="" /></span><span className="contact-watermark" aria-hidden="true">&lt;/&gt;</span>
        <h3>GitHub</h3>
        <p>jsphnmgt</p>
        <span className="contact-action">View repositories <span aria-hidden="true">&#8599;</span></span>
        <span className="sr-only">Opens in a new tab</span>
      </a>
      <a href="https://www.linkedin.com/in/josephine-magat-615076325/" target="_blank" rel="noopener noreferrer"><span className="contact-stamp"><img src={assets["linkedin-logo.png"]} alt="" /></span><span className="contact-watermark" aria-hidden="true">in</span>
        <h3>LinkedIn</h3>
        <p>Maria Josephine Magat</p>
        <span className="contact-action">View profile <span aria-hidden="true">&#8599;</span></span>
        <span className="sr-only">Opens in a new tab</span>
      </a>
    </div>
    <footer className="portfolio-footer"><span>✦ jsphnmgt Portfolio</span><a href="#home">Back to the stars ↑</a></footer>
  </section>;
}
