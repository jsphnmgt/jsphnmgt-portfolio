import { useEffect, useRef, useState } from "react";

export default function PortfolioScrollbar() {
  const trackRef = useRef(null);
  const dragRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scroll, setScroll] = useState({ top: 0, height: 0, value: 0, max: 0 });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!trackRef.current) return;
      const page = document.scrollingElement;
      const trackHeight = trackRef.current.getBoundingClientRect().height;
      const max = Math.max(0, page.scrollHeight - page.clientHeight);
      const height = Math.min(trackHeight, Math.max(36, trackHeight * page.clientHeight / page.scrollHeight));
      const value = Math.max(0, Math.min(max, page.scrollTop));
      setScroll({ height, max, value, top: max ? value / max * (trackHeight - height) : 0 });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    observer.observe(document.documentElement);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const scrollToPointer = (clientY, offset) => {
    const track = trackRef.current.getBoundingClientRect();
    const travel = track.height - scroll.height;
    if (travel <= 0) return;
    const fraction = Math.max(0, Math.min(1, (clientY - track.top - offset) / travel));
    window.scrollTo({ top: fraction * scroll.max, behavior: "instant" });
  };
  const startDrag = event => {
    if (!event.isPrimary || event.button !== 0 || !scroll.max) return;
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    const track = event.currentTarget.getBoundingClientRect();
    const onThumb = event.target.closest(".portfolio-scrollbar-thumb");
    const offset = onThumb ? event.clientY - track.top - scroll.top : scroll.height / 2;
    dragRef.current = { pointerId: event.pointerId, offset };
    setIsDragging(true);
    scrollToPointer(event.clientY, offset);
  };
  const finishDrag = () => {
    dragRef.current = null;
    setIsDragging(false);
  };
  const onKeyDown = event => {
    const positions = {
      ArrowDown: scroll.value + 40,
      ArrowUp: scroll.value - 40,
      PageDown: scroll.value + window.innerHeight * 0.9,
      PageUp: scroll.value - window.innerHeight * 0.9,
      Home: 0,
      End: scroll.max,
    };
    if (!(event.key in positions)) return;
    event.preventDefault();
    window.scrollTo({ top: Math.max(0, Math.min(scroll.max, positions[event.key])), behavior: "instant" });
  };

  return <div ref={trackRef} className={`portfolio-scrollbar${isDragging ? " is-dragging" : ""}`} role="scrollbar" aria-label="Scroll portfolio" aria-orientation="vertical" aria-controls="portfolio-content" aria-valuemin={0} aria-valuemax={Math.round(scroll.max)} aria-valuenow={Math.round(scroll.value)} aria-hidden={!scroll.max} tabIndex={scroll.max ? 0 : -1} style={{ visibility: scroll.max ? undefined : "hidden" }} onKeyDown={onKeyDown} onPointerDown={startDrag} onPointerMove={event => {
    if (dragRef.current?.pointerId === event.pointerId) scrollToPointer(event.clientY, dragRef.current.offset);
  }} onPointerUp={finishDrag} onPointerCancel={finishDrag} onLostPointerCapture={finishDrag}>
    <span className="portfolio-scrollbar-thumb" style={{ height: `${scroll.height}px`, transform: `translateY(${scroll.top}px)` }} />
  </div>;
}
