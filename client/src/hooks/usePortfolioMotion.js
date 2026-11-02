import { useEffect } from "react";

export default function usePortfolioMotion(navbarRef) {
  useEffect(() => {
    const app = navbarRef.current?.closest(".app");
    if (!app) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stopMotion = () => {};
    const setup = () => {
      stopMotion();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      const targets = [...app.querySelectorAll(".hero-card-stack, .section-heading, section > .display-heading, .project-card, .experience-entry, .education-photo, .education-card, .certificate-card, .contact-card")];
      const reveal = element => element.classList.add("is-revealed");
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: "0px 0px 48px 0px" });
      targets.forEach(element => {
        element.setAttribute("data-scroll-reveal", "");
        // Keep initial content visible; reveal later content just before it enters.
        if (element.getBoundingClientRect().top < window.innerHeight + 48) reveal(element);
        else observer.observe(element);
      });
      app.classList.add("scroll-motion-ready");
      const focus = event => {
        const element = event.target instanceof Element ? event.target.closest("[data-scroll-reveal]") : null;
        if (element) reveal(element);
      };
      app.addEventListener("focusin", focus);
      stopMotion = () => {
        observer.disconnect();
        app.removeEventListener("focusin", focus);
        app.classList.remove("scroll-motion-ready");
        targets.forEach(element => {
          element.removeAttribute("data-scroll-reveal");
          element.classList.remove("is-revealed");
        });
      };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      preference.removeEventListener("change", setup);
      stopMotion();
    };
  }, [navbarRef]);
}
