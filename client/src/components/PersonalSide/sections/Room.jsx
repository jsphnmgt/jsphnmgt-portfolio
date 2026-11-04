import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { assets } from "../../../assets";
import Overlay from "../../ProfessionalSide/Overlay";
import LoadBoundary from "../../LoadBoundary";
import "../../../styles/room.css";
import "../../../styles/personal-overlays.css";
import "../../../styles/personal-creative.css";

const PersonalComputer = lazy(() => import("../overlays/PersonalComputer"));
const Watchlist = lazy(() => import("../overlays/Watchlist"));
const ReadingList = lazy(() => import("../overlays/ReadingList"));
const GameShelf = lazy(() => import("../overlays/GameShelf"));
const Music = lazy(() => import("../overlays/Music"));

const roomObjects = [
  {
    id: "computer",
    label: "Personal Computer",
    image: "room-computer.png",
    component: PersonalComputer
  },
  {
    id: "watchlist",
    label: "Watchlist",
    image: "room-watchlist.png",
    component: Watchlist
  },
  {
    id: "reading-list",
    label: "Reading List",
    image: "room-reading-list.png", component: ReadingList
  },
  { id: "game-shelf", label: "Game Shelf", image: "room-game-shelf.png", component: GameShelf },
  { id: "music", label: "Music Corner", image: "room-music.png", component: Music },
];

export default function Room({ returnHref = "#home" }) {
  const [imageReady, setImageReady] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const returnFocusRef = useRef(null);
  const ActiveOverlay = activeObject?.component;

  // Keep entry usable even if an animation is interrupted or disabled by CSS.
  useEffect(() => {
    if (!imageReady || hasEntered) return;
    const timer = window.setTimeout(() => setHasEntered(true), 2300);
    return () => window.clearTimeout(timer);
  }, [imageReady, hasEntered]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { if (preference.matches) setHasEntered(true); };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!activeObject && returnFocusRef.current) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [activeObject]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const dismiss = event => {
      if (!menuRef.current?.contains(event.target)) setIsMenuOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [isMenuOpen]);

  const openObject = (object, trigger, fromMenu = false) => {
    const bounds = trigger.getBoundingClientRect();
    const room = trigger.closest(".personal-room");
    room.style.setProperty("--room-overlay-origin-x", `${bounds.left + bounds.width / 2}px`);
    room.style.setProperty("--room-overlay-origin-y", `${bounds.top + bounds.height / 2}px`);
    returnFocusRef.current = fromMenu ? menuRef.current.querySelector(".room-navigation-toggle") : trigger;
    if (fromMenu) setIsMenuOpen(false);
    setActiveObject(object);
  };

  return <section className={`personal-room${imageReady ? " room-ready" : ""}${hasEntered ? " room-entered" : ""}`} id="room" aria-label="Personal room">
    <div className="room-scene">
      <img className="personal-room-image" src={assets["room.jpg"]} alt="An illustrated bedroom overlooking a purple city skyline at night" fetchPriority="high" onLoad={() => setImageReady(true)} onError={() => { setImageFailed(true); setImageReady(true); setHasEntered(true); }} />
      <div className="room-objects" inert={!hasEntered ? "" : undefined}>
        {roomObjects.map((object, index) => <button key={object.id} className={`room-object room-object-${object.id}`} aria-label={`Open ${object.label}`} aria-haspopup="dialog" onClick={event => openObject(object, event.currentTarget)}>
          <img src={assets[object.image]} alt="" draggable={false} />
          <span className="room-object-label" aria-hidden="true"><span className="room-object-number">{String(index + 1).padStart(2, "0")}</span>{object.label}</span>
        </button>)}
      </div>
    </div>
    {!hasEntered && <div className="room-entrance" aria-hidden="true" onAnimationEnd={event => {
      if (event.target === event.currentTarget && event.animationName === "room-entrance-finish") setHasEntered(true);
    }}>
      {["left", "right"].map(side => <div key={side} className={`room-entrance-door room-entrance-door-${side}`}>
        <div className="room-door-face">
          <span className="room-entrance-panel room-entrance-panel-upper">
            <svg className="room-door-emblem" viewBox="0 0 100 100" fill="none" focusable="false">
              <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" />
              {side === "left" ? <path d="M61 25a26 26 0 1 0 14 42A29 29 0 0 1 61 25Z" fill="currentColor" fillOpacity=".8" /> : <><ellipse cx="50" cy="50" rx="44" ry="14" transform="rotate(-30 50 50)" stroke="currentColor" /><circle cx="50" cy="50" r="19" fill="currentColor" fillOpacity=".65" /></>}
              <path d="m79 12 2 7 7 2-7 2-2 7-2-7-7-2 7-2Z" fill="currentColor" />
            </svg>
            <span className="room-door-inscription">{side === "left" ? "Off the clock" : "Into my world"}</span>
          </span>
          <span className="room-entrance-panel" />
          <span className="room-entrance-handle" />
        </div>
      </div>)}
    </div>}
      <a className="room-back-button" href={returnHref}>
        <img src={assets["room-back-arrow.svg"]} alt="" />
        <span>Back to portfolio</span>
      </a>
      <div className={`room-navigation${isMenuOpen ? " is-open" : ""}`} ref={menuRef} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setIsMenuOpen(false); }} onKeyDown={event => {
        if (event.key === "Escape") {
          setIsMenuOpen(false);
          event.currentTarget.querySelector(".room-navigation-toggle").focus();
        }
      }}>
        <button className="room-navigation-toggle" aria-expanded={isMenuOpen} aria-controls="room-explore-links" onClick={() => setIsMenuOpen(open => !open)}>
          <span>EXPLORE ROOM</span>
        </button>
        <div className="room-navigation-panel" inert={!isMenuOpen ? "" : undefined} aria-hidden={!isMenuOpen}>
          <div className="room-navigation-reveal">
            <nav className="room-navigation-card" id="room-explore-links" aria-label="Explore the room">
              <p className="room-navigation-heading">Inside my room</p>
              {roomObjects.map((object, index) => <button key={object.id} aria-haspopup="dialog" onClick={event => openObject(object, event.currentTarget, true)}>
                <span className="room-navigation-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>{object.label}</span>
              </button>)}
            </nav>
          </div>
        </div>
      </div>
      {hasEntered && <p className="room-explore-hint" role={imageFailed ? "status" : undefined}>{imageFailed ? "The room artwork couldn't load. Use Explore Room to open any collection." : "Select a glowing object or choose a collection from Explore Room."}</p>}
    {ActiveOverlay && <LoadBoundary key={activeObject.id} onDismiss={() => setActiveObject(null)}><Suspense fallback={<Overlay isOpen onClose={() => setActiveObject(null)}><h2 id="detail-title">{activeObject.label}</h2><p role="status">Opening collection…</p><button onClick={() => setActiveObject(null)}>Cancel</button></Overlay>}><ActiveOverlay key={activeObject.id} isOpen onClose={() => setActiveObject(null)} onOpenCollection={id => {
      const object = roomObjects.find(item => item.id === id);
      if (object) setActiveObject(object);
    }} /></Suspense></LoadBoundary>}
  </section>;
}
