import { assets } from "../../../assets";
export default function Contact() {
  return <section id="contact" aria-labelledby="contact-title">
    <div className="ornament contact-divider" aria-hidden="true" />
    <p className="chapter-label"><span>05 /</span> The next chapter</p>
    <h2 id="contact-title" className="display-heading">Let's make<br /><em>something good.</em></h2>
    <p className="contact-intro">An internship, an idea, or just a hello — I'd love to hear from you.</p>
    <div className="contact-card">
      <a href="mailto:jsphnmagat@gmail.com"><img src={assets["gmail-logo.png"]} alt="" />
        <h3>Email</h3>
        <p>jsphnmagat@gmail.com</p>
      </a>
      <a href="https://github.com/jsphnmgt" target="_blank" rel="noreferrer"><img src={assets["github-logo.png"]} alt="" />
        <h3>GitHub</h3>
        <p>jsphnmgt</p>
        <span className="sr-only">Opens in a new tab</span>
      </a>
      <a href="https://www.linkedin.com/in/josephine-magat-615076325/" target="_blank" rel="noreferrer"><img src={assets["linkedin-logo.png"]} alt="" />
        <h3>LinkedIn</h3>
        <p>Maria Josephine Magat</p>
        <span className="sr-only">Opens in a new tab</span>
      </a>
    </div>
    <footer className="portfolio-footer"><span>✦ jsphnmgt Portfolio</span><a href="#home">Back to the stars ↑</a></footer>
  </section>;
}
