import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { assets } from "../../../assets";
import LoadBoundary from "../../LoadBoundary";
import CollectionIcon from "../overlays/CollectionIcon";
import "../../../styles/room.css";
import "../../../styles/personal-overlays.css";
import "../../../styles/personal-creative.css";
import "../../../styles/collection-scenes.css";
import "../../../styles/room-navigation.css";
import "../../../styles/room-loading.css";
import "../../../styles/room-highlights.css";
import "../../../styles/room-tablet.css";
import "../../../styles/room-mobile.css";

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

const roomTwinkles = {
  computer: [[-8, 35, 12], [90, -8, 16], [110, 82, 10]],
  watchlist: [[-10, 18, 15], [110, 35, 10], [8, 100, 12], [94, -8, 9]],
  "reading-list": [[-6, -14, 11], [108, 75, 9]],
  "game-shelf": [[-10, 40, 10], [105, 10, 16], [65, 105, 12]],
  music: [[-6, 40, 11], [10, -5, 9], [98, 12, 16], [108, 70, 10], [70, 105, 13]],
};

const roomMenuDetails = {
  computer: { note: "A peek at my desktop", icon: "computer" },
  watchlist: { note: "Movies, series, and favorites", icon: "film" },
  "reading-list": { note: "Books and current reads", icon: "book" },
  "game-shelf": { note: "Favorite games and current saves", icon: "game" },
  music: { note: "Songs for every mood", icon: "music" },
};

function RoomNavigationIcon({ name, centered = false }) {
  if (name === "computer") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 20h8m-4-3v3M7 8l3 2.5L7 13m6 0h4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  const viewBox = centered ? { game: "0 1 24 24", music: "0 .35 24 24", book: "0 -.15 24 24" }[name] : undefined;
  return <CollectionIcon name={name} viewBox={viewBox} />;
}

function RoomLoadingState({ objectId, setLoadingId }) {
  useEffect(() => {
    setLoadingId(objectId);
    return () => setLoadingId(current => current === objectId ? null : current);
  }, [objectId, setLoadingId]);
  return null;
}

function RoomOverlayReady({ readyRef, setLoadingId, setMenuOpen }) {
  useLayoutEffect(() => {
    readyRef.current = true;
    setLoadingId(null);
    setMenuOpen(false);
  }, [readyRef, setLoadingId, setMenuOpen]);
  return null;
}

export default function Room({ returnHref = "#home" }) {
  const [imageReady, setImageReady] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locatedObjectCount, setLocatedObjectCount] = useState(0);
  const [isLocateFinale, setIsLocateFinale] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [loadingSource, setLoadingSource] = useState(null);
  const menuRef = useRef(null);
  const viewportRef = useRef(null);
  const returnFocusRef = useRef(null);
  const discoveryCheckedRef = useRef(false);
  const overlayReadyRef = useRef(false);
  const ActiveOverlay = activeObject?.component;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const centerRoom = () => {
      if (window.matchMedia("(max-width: 1100px)").matches) {
        viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
      }
    };
    const observer = new ResizeObserver(centerRoom);
    observer.observe(viewport);
    centerRoom();
    return () => observer.disconnect();
  }, [imageReady]);

  useEffect(() => {
    if (loadingId && document.activeElement === document.body) {
      returnFocusRef.current?.focus({ preventScroll: true });
    }
  }, [loadingId]);

  useEffect(() => {
    if (loadingId && loadingSource === "menu" && !isMenuOpen && !overlayReadyRef.current) {
      setActiveObject(null);
      setLoadingId(null);
    }
  }, [loadingId, loadingSource, isMenuOpen]);

  useEffect(() => {
    if (!hasEntered || !imageReady || imageFailed || isLeaving || discoveryCheckedRef.current) return;
    discoveryCheckedRef.current = true;
    try {
      if (window.sessionStorage.getItem("portfolio-room-discovery-seen") === "true") return;
      window.sessionStorage.setItem("portfolio-room-discovery-seen", "true");
    } catch {
      // Keep discovery available when browser storage is disabled.
    }
    setIsLocating(true);
  }, [hasEntered, imageReady, imageFailed, isLeaving]);

  useEffect(() => {
    if (!isLocating) return;
    const stepMs = 450;
    const sequenceEnd = (roomObjects.length - 1) * stepMs + 550;
    const finaleStart = sequenceEnd + 650;
    setIsLocateFinale(false);
    setLocatedObjectCount(1);
    const timers = roomObjects.slice(1).map((_, index) => window.setTimeout(() => {
      setLocatedObjectCount(index + 2);
    }, (index + 1) * stepMs));
    timers.push(window.setTimeout(() => setLocatedObjectCount(0), sequenceEnd));
    timers.push(window.setTimeout(() => {
      setIsLocateFinale(true);
      setLocatedObjectCount(roomObjects.length);
    }, finaleStart));
    timers.push(window.setTimeout(() => {
      setIsLocating(false);
      setIsLocateFinale(false);
      setLocatedObjectCount(0);
    }, finaleStart + 1200));
    return () => timers.forEach(timer => window.clearTimeout(timer));
  }, [isLocating]);

  useEffect(() => {
    if (!isLeaving) return;
    const finish = () => { window.location.hash = returnHref; };
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreferenceChange = () => { if (preference.matches) finish(); };
    const timer = window.setTimeout(finish, 400);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      window.clearTimeout(timer);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [isLeaving, returnHref]);

  const leaveRoom = event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    if (isLeaving) return;
    setIsMenuOpen(false);
    setIsLeaving(true);
  };

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
    overlayReadyRef.current = false;
    setLoadingSource(fromMenu ? "menu" : "object");
    setActiveObject(object);
  };

  return <section className={`personal-room${imageReady ? " room-ready" : ""}${hasEntered ? " room-entered" : ""}${isLeaving ? " room-leaving" : ""}${isLocating ? " is-locating" : ""}${isLocating && isLocateFinale ? " is-locate-finale" : ""}`} id="room" aria-label="Personal room" onKeyDown={event => {
    if (event.key === "Escape" && loadingId) {
      event.preventDefault();
      setActiveObject(null);
      setLoadingId(null);
      setIsMenuOpen(false);
    }
  }} onAnimationEnd={event => {
    if (event.target === event.currentTarget && event.animationName === "room-return-cover") window.location.hash = returnHref;
  }}>
    <div className="room-viewport" ref={viewportRef} tabIndex={0} role="region" aria-label="Room view, scroll to explore">
    <div className="room-scene">
      <img className="personal-room-image" src={assets["room.jpg"]} alt="An illustrated bedroom overlooking a purple city skyline at night" fetchPriority="high" onLoad={() => setImageReady(true)} onError={() => { setImageFailed(true); setImageReady(true); setHasEntered(true); }} />
      <div className="room-objects" inert={!hasEntered || isLeaving ? "" : undefined}>
        {roomObjects.map((object, index) => <button key={object.id} className={`room-object room-object-${object.id}${isLocating && index < locatedObjectCount ? " is-discovered" : ""}${loadingId === object.id && loadingSource === "object" ? " is-loading" : ""}`} aria-label={`Open ${object.label}`} aria-busy={loadingId === object.id} aria-haspopup="dialog" onClick={event => openObject(object, event.currentTarget)}>
          <img src={assets[object.image]} alt="" draggable={false} />
          <span className="room-object-twinkles" aria-hidden="true">{roomTwinkles[object.id].map(([x, y, size], twinkleIndex) => <i key={twinkleIndex} style={{ "--twinkle-x": `${x}%`, "--twinkle-y": `${y}%`, "--twinkle-size": `${size}px`, "--twinkle-delay": `${twinkleIndex * .19}s` }} />)}</span>
          <span className="room-object-label" aria-hidden="true"><span className="room-object-number">{String(index + 1).padStart(2, "0")}</span><span className="room-object-name">{object.label}</span>{loadingId === object.id && loadingSource === "object" && <span className="room-inline-spinner" />}</span>
        </button>)}
      </div>
    </div>
    </div>
    {!hasEntered && !isLeaving && <div className="room-entrance" aria-hidden="true" onAnimationEnd={event => {
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
      <a className="room-back-button" href={returnHref} onClick={leaveRoom} inert={!hasEntered ? "" : undefined} aria-disabled={isLeaving || undefined}>
        <img src={assets["room-arrow.svg"]} alt="" />
        <span>Back to portfolio</span>
      </a>
      <div className={`room-navigation${isMenuOpen ? " is-open" : ""}`} ref={menuRef} inert={!hasEntered ? "" : undefined} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setIsMenuOpen(false); }} onKeyDown={event => {
        if (event.key === "Escape") {
          setIsMenuOpen(false);
          event.currentTarget.querySelector(".room-navigation-toggle").focus();
        }
      }}>
        <button className="room-navigation-toggle" aria-expanded={isMenuOpen} aria-controls="room-explore-links" onClick={() => setIsMenuOpen(open => !open)}>
          <span>EXPLORE ROOM</span>
          <svg className="room-menu-chevron" viewBox="3 5 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        {!imageFailed && <span className="room-locate-control"><button className="room-locate-button" onClick={() => { setIsMenuOpen(false); setIsLocating(true); }} aria-label="Locate clickable objects" aria-busy={isLocating}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3" strokeLinecap="round" /></svg></button><span className="room-locate-tooltip" aria-hidden="true">Locate Objects</span></span>}
        <div className="room-navigation-panel" inert={!isMenuOpen ? "" : undefined} aria-hidden={!isMenuOpen}>
          <div className="room-navigation-reveal">
            <nav className="room-navigation-card" id="room-explore-links" aria-label="Explore the room">
              <p className="room-navigation-heading">Inside the room</p>
              {roomObjects.map(object => <button key={object.id} aria-busy={loadingId === object.id && loadingSource === "menu"} aria-haspopup="dialog" onClick={event => openObject(object, event.currentTarget, true)}>
                <span className="room-menu-icon"><RoomNavigationIcon name={roomMenuDetails[object.id].icon} /></span>
                <span className="room-navigation-copy"><strong>{object.label}</strong></span>
                {loadingId === object.id && loadingSource === "menu" ? <span className="room-inline-spinner" aria-hidden="true" /> : <svg className="room-menu-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M5 15 15 5M5 5h10v10" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </button>)}
            </nav>
          </div>
        </div>
      </div>
      {hasEntered && <p className="room-explore-hint" role={imageFailed ? "status" : undefined}>{imageFailed ? "The room artwork couldn't load. Use Explore Room to open any collection." : <><span className="room-hint-desktop">Click an object to explore.</span><span className="room-hint-mobile">Swipe to explore the room. Tap an object.</span></>}</p>}
    <span className="sr-only" role="status">{loadingId ? `Loading ${activeObject?.label || "collection"}` : ""}</span>
    {ActiveOverlay && <LoadBoundary key={activeObject.id} onDismiss={() => setActiveObject(null)} onError={() => { overlayReadyRef.current = true; setLoadingId(null); setIsMenuOpen(false); }}><Suspense fallback={<RoomLoadingState objectId={activeObject.id} setLoadingId={setLoadingId} />}><><ActiveOverlay key={activeObject.id} isOpen onClose={() => setActiveObject(null)} onOpenCollection={id => {
      const object = roomObjects.find(item => item.id === id);
      if (object) {
        overlayReadyRef.current = false;
        setLoadingSource("object");
        setActiveObject(object);
      }
    }} /><RoomOverlayReady key={activeObject.id} readyRef={overlayReadyRef} setLoadingId={setLoadingId} setMenuOpen={setIsMenuOpen} /></></Suspense></LoadBoundary>}
  </section>;
}
