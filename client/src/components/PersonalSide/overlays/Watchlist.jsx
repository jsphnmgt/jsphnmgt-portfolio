import { useLayoutEffect, useRef } from "react";
import Overlay from "../../ProfessionalSide/Overlay";
import CollectionIcon from "./CollectionIcon";
import CollectionHeader from "./CollectionHeader";
import { assets } from "../../../assets";
import watchlist from "../../../data/watchlistData.json";
import useCollectionPeek from "../../../hooks/useCollectionPeek";
import "../../../styles/watchlist-journal.css";

const sections = [
  { id: "favorites", title: "Favorites", icon: "heart", caption: "The ones I would watch all over again." },
  { id: "watching", title: "Currently Watching", icon: "play", caption: "A few stories I am still caught up in." },
  { id: "watched", title: "Watched", icon: "check", caption: "End credits, lasting impressions." },
];


export default function Watchlist({ isOpen = false, onClose }) {
  const { selectedId, isPeekVisible, peekHeadingRef, openPeek, closePeek, onPeekKeyDown, onPeekTransitionEnd } = useCollectionPeek();
  const collectionsRef = useRef(null);
  const ticketPositionsRef = useRef(null);
  const hasPeek = Boolean(selectedId);
  const openTicket = (id, trigger) => {
    if (!hasPeek && window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches) {
      ticketPositionsRef.current = new Map(Array.from(collectionsRef.current.querySelectorAll(".watchlist-card"), card => [card, card.getBoundingClientRect()]));
    }
    openPeek(id, trigger);
  };
  useLayoutEffect(() => {
    const positions = ticketPositionsRef.current;
    ticketPositionsRef.current = null;
    if (!hasPeek || !positions) return;
    const viewport = collectionsRef.current.getBoundingClientRect();
    const animations = [];
    for (const [card, before] of positions) {
      const after = card.getBoundingClientRect();
      if (after.bottom < viewport.top || after.top > viewport.bottom) continue;
      animations.push(card.animate([
        { transform: `translate(${before.left - after.left}px, ${before.top - after.top}px) scale(${before.width / after.width}, ${before.height / after.height})` },
        { transform: "none" },
      ], { duration: 500, easing: "cubic-bezier(.25, .1, .25, 1)" }));
    }
    return () => animations.forEach(animation => animation.cancel());
  }, [hasPeek]);
  const currentId = watchlist.watching[0];
  const current = currentId ? watchlist.catalog[currentId] : null;
  const chooseSection = id => {
    const heading = document.getElementById('watchlist-' + id);
    heading?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    heading?.focus({ preventScroll: true });
  };
  const selected = selectedId ? watchlist.catalog[selectedId] : null;
  const statuses = selectedId ? sections.filter(section => watchlist[section.id].includes(selectedId)) : [];
  return <Overlay className="watchlist-overlay cinema-overlay" isOpen={isOpen} onClose={onClose}>
    <CollectionHeader title="Watchlist" icon="clapperboard" />
    <div className={`reading-list-layout${selected ? " has-peek" : ""}`} onKeyDown={onPeekKeyDown}>
      <div ref={collectionsRef} className="watchlist-scroll reading-list-collections" role="region" aria-label="Watchlist collections" tabIndex={0}>
        <div className="cinema-intro">
          <div className="cinema-intro-copy">
            <span className="cinema-kicker"><CollectionIcon name="film" />Movie nights and favorites</span>
            <p>Just one<br />more <em>episode.</em></p>
            <span className="cinema-intro-foot">Anime, dramas, and stories worth staying up for.</span>
          </div>
          {current && <button className="cinema-now-showing" onClick={event => openTicket(currentId, event.currentTarget)} aria-label={'Open now showing: ' + current.title} aria-controls="watchlist-peek">
            <span className="cinema-now-poster"><img src={assets[current.image]} alt="" /></span>
            <span className="cinema-now-copy"><span className="cinema-kicker"><i aria-hidden="true" />Now showing</span><strong>{current.title}</strong><span className="cinema-now-meta">{current.type} &middot; {current.year}</span><span className="cinema-now-link">Take a peek <span aria-hidden="true">&#8599;</span></span></span>
            <span className="cinema-ticket-side" aria-hidden="true">ADMIT ONE</span>
          </button>}
        </div>
        <nav className="cinema-section-tabs" aria-label="Jump to a watchlist section">
          {sections.map(section => <button key={section.id} onClick={() => chooseSection(section.id)}><CollectionIcon name={section.icon} /><span>{section.id === "watching" ? "Watching" : section.title}</span><span className="cinema-tab-count">{watchlist[section.id].length}</span></button>)}
        </nav>
        {sections.map(section => <section className="watchlist-section" key={section.id} aria-labelledby={`watchlist-${section.id}`}>
          <h3 id={`watchlist-${section.id}`} tabIndex={-1}><CollectionIcon name={section.icon} />{section.title}<span className="collection-count">{watchlist[section.id].length}</span></h3>
          <p className="cinema-section-caption">{section.caption}</p>
          <ul className="watchlist-cards" aria-label={section.title}>
            {[...watchlist[section.id]].sort((a, b) => watchlist.catalog[a].title.localeCompare(watchlist.catalog[b].title, "en", { numeric: true, sensitivity: "base" })).map(id => {
              const item = watchlist.catalog[id];
              return <li key={id} className="watchlist-card" style={{ transformOrigin: "top left" }}>
                <button className="reading-list-card-button watchlist-card-button" aria-label={`View details for ${item.title}`} aria-expanded={selectedId === id} aria-controls="watchlist-peek" onClick={event => openTicket(id, event.currentTarget)}>
                  <span className="watchlist-poster" aria-hidden="true">{item.image ? <img src={assets[item.image]} alt="" loading="lazy" /> : <CollectionIcon name="film" />}{watchlist.favorites.includes(id) && <span className="cinema-favorite-stamp"><CollectionIcon name="heart" /></span>}</span>
                  <span className="watchlist-card-caption watchlist-ticket-stub"><span className="watchlist-card-title" title={item.title}>{item.title}</span><span className="watchlist-card-type">{item.type}{item.year && <> &middot; {item.year}</>}</span></span>
                </button>
              </li>;
            })}
          </ul>
        </section>)}
      </div>
      {selected && <button className={`watchlist-peek-scrim${isPeekVisible ? " is-visible" : ""}`} tabIndex={-1} aria-label="Back to watchlist" onClick={closePeek} />}
      {selected && <aside className={`reading-list-peek${isPeekVisible ? " is-visible" : ""}`} id="watchlist-peek" aria-labelledby="watchlist-peek-title" onTransitionEnd={onPeekTransitionEnd}>
        <div className="reading-list-peek-toolbar"><span className="watchlist-detail-label">About this watch</span><button className="reading-list-peek-close" onClick={closePeek} aria-label="Close show details"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m6.7 5.3 5.3 5.3 5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3z" /></svg></button></div>
        <div className="reading-list-peek-scroll watchlist-scroll" key={selectedId}>
          <div className="reading-list-peek-summary watchlist-peek-hero">
            <img className="watchlist-peek-backdrop" src={assets[selected.image]} alt="" aria-hidden="true" />
            <img className="reading-list-peek-cover" src={assets[selected.image]} alt="" />
            <div><h3 id="watchlist-peek-title" ref={peekHeadingRef} tabIndex={-1}>{selected.title}</h3><p className="reading-list-peek-author">{selected.type}{selected.year ? ` · ${selected.year}` : ""}</p></div>
          </div>
          <div className="reading-list-peek-genres">{selected.genres.map(genre => <span key={genre}>{genre}</span>)}</div>
          <dl className="reading-list-peek-meta">
            <div><dt>Watching status</dt><dd>{statuses.map(status => <span key={status.id}><CollectionIcon name={status.icon} />{status.title}</span>)}</dd></div>
            <div><dt>My rating</dt><dd>{selected.rating !== null ? <span className="reading-list-rating" role="img" aria-label={`${selected.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, star) => <span className={star < selected.rating ? "is-rated" : undefined} key={star}><CollectionIcon name="star" /></span>)}</span> : <span className="reading-list-peek-placeholder">Not rated yet</span>}</dd></div>
          </dl>
          <section className="reading-list-peek-section"><h4>Synopsis</h4><p>{selected.synopsis}</p></section>
          <section className="reading-list-peek-section"><h4>{watchlist.watching.includes(selectedId) ? "What caught my interest" : "My thoughts"}</h4><p className={selected.thoughts ? undefined : "reading-list-peek-placeholder"}>{selected.thoughts || "I’ll add my thoughts here soon."}</p></section>
        </div>
      </aside>}
    </div>
  </Overlay>;
}
