import { useEffect, useId, useRef, useState } from "react";
export default function ProjectPreview({ image, title, certificate = false, gallery, children }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const galleryId = useId();
  const stageRef = useRef(null);
  const views = gallery?.length ? gallery : null;
  const selectedView = views?.[selectedIndex];
  const isPageView = Boolean(selectedView && selectedView.device !== "phone" && selectedView.presentation !== "detail");
  useEffect(() => {
    stageRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [selectedIndex]);
  const onThumbnailKeyDown = event => {
    const keys = { ArrowRight: 1, ArrowLeft: -1, Home: "first", End: "last" };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const direction = keys[event.key];
    const next = direction === "first" ? 0 : direction === "last" ? views.length - 1 : (selectedIndex + direction + views.length) % views.length;
    setSelectedIndex(next);
    event.currentTarget.parentElement.children[next]?.focus();
  };
  return <div className={certificate ? "certificate-detail-preview" : `project-detail-preview${views ? " project-gallery" : ""}${selectedView?.device === "phone" ? " is-phone-gallery" : ""}${selectedView?.presentation === "detail" ? " is-detail-gallery" : ""}`} style={{ "--preview-background": "var(--color-cream)", "--gallery-columns": Math.min(views?.length || 1, 4) }}>
    {views ? <>
      <div className="project-gallery-heading"><span>Project preview</span><a href={selectedView.image || image} target="_blank" rel="noreferrer">Full-size image <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>{isPageView && <small className="project-gallery-scroll-hint">Scroll within the image to explore.</small>}</div>
      <figure className="project-gallery-figure">
        <div className="project-gallery-media">
        <div ref={stageRef} className={`project-preview-frame project-gallery-stage${selectedView.device === "phone" ? " is-mobile-screen" : ""}${isPageView ? " is-page-screen" : ""}${selectedView.presentation === "detail" ? " is-detail-screen" : ""}`} id={galleryId} style={{ aspectRatio: selectedView.aspectRatio }} role={isPageView ? "region" : undefined} aria-label={isPageView ? `${selectedView.label} screenshot` : undefined} tabIndex={isPageView ? 0 : undefined}>
          <img key={selectedIndex} src={selectedView.image || image} alt={`${title} — ${selectedView.label}`} style={{ objectFit: selectedView.fit || "contain", objectPosition: selectedView.position || "50% 50%" }} />
        </div>
      <div className="project-gallery-thumbnails" role="group" aria-label="Project screenshots">
        {views.map((view, index) => <button type="button" key={view.label} aria-label={`Show ${view.label}`} aria-pressed={selectedIndex === index} aria-controls={galleryId} onClick={() => setSelectedIndex(index)} onKeyDown={onThumbnailKeyDown}>
          <span className="project-gallery-thumbnail-image"><img src={view.image || image} alt="" loading="lazy" style={{ objectFit: view.fit || "contain", objectPosition: view.position || "50% 50%" }} /></span><span>{view.label}</span>
        </button>)}
      </div>
        </div>
        <figcaption className="project-gallery-caption">
          <div className="project-gallery-caption-heading"><span>{selectedView.label}</span></div>
          <span className="project-gallery-caption-description" aria-live="polite">{selectedView.caption}</span>
        </figcaption>
      </figure>
    </> : <div className="project-preview-frame"><img className={certificate ? "certificate-detail-image" : undefined} src={image} alt={title + (certificate ? " certificate" : " preview")} /></div>}
    {children}
  </div>;
}
