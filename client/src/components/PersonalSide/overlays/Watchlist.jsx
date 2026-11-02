import Overlay from "../../ProfessionalSide/Overlay";
import CollectionIcon from "./CollectionIcon";
import { assets } from "../../../assets";
import watchlist from "../../../data/watchlistData.json";
import useCollectionPeek from "../../../hooks/useCollectionPeek";
import CollectionSearch, { useCollectionFilter } from "./CollectionSearch";

const sections = [
  { id: "favorites", title: "Favorites", icon: "heart" },
  { id: "watching", title: "Currently Watching", icon: "play" },
  { id: "watched", title: "Watched", icon: "check" },
];


export default function Watchlist({ isOpen = false, onClose }) {
  const { query, setQuery, matches } = useCollectionFilter();
  const { selectedId, isPeekVisible, peekHeadingRef, openPeek, closePeek, resetPeek, onPeekKeyDown, onPeekTransitionEnd } = useCollectionPeek();
  const selected = selectedId ? watchlist.catalog[selectedId] : null;
  const statuses = selectedId ? sections.filter(section => watchlist[section.id].includes(selectedId)) : [];
  return <Overlay className="watchlist-overlay" isOpen={isOpen} onClose={onClose}>
    <header className="watchlist-header">
      <h2 id="detail-title"><CollectionIcon name="clapperboard" />Watchlist</h2>
    </header>
    <CollectionSearch label="Search watchlist" query={query} setQuery={value => { resetPeek(); setQuery(value); }} count={Object.values(watchlist.catalog).filter(matches).length} />
    <div className={`reading-list-layout${selected ? " has-peek" : ""}`} onKeyDown={onPeekKeyDown}>
      <div className="watchlist-scroll reading-list-collections" role="region" aria-label="Watchlist collections" tabIndex={0}>
        {sections.filter(section => !query.trim() || watchlist[section.id].some(id => matches(watchlist.catalog[id]))).map(section => <section className="watchlist-section" key={section.id} aria-labelledby={`watchlist-${section.id}`}>
          <h3 id={`watchlist-${section.id}`}><CollectionIcon name={section.icon} />{section.title}<span className="collection-count">{watchlist[section.id].filter(id => matches(watchlist.catalog[id])).length}</span></h3>
          <ul className="watchlist-cards" aria-label={section.title}>
            {watchlist[section.id].filter(id => matches(watchlist.catalog[id])).sort((a, b) => watchlist.catalog[a].title.localeCompare(watchlist.catalog[b].title, "en", { numeric: true, sensitivity: "base" })).map(id => {
              const item = watchlist.catalog[id];
              return <li key={id} className="watchlist-card">
                <button className="reading-list-card-button watchlist-card-button" aria-label={`View details for ${item.title}`} aria-expanded={selectedId === id} aria-controls="watchlist-peek" onClick={event => openPeek(id, event.currentTarget)}>
                  <span className="watchlist-poster" aria-hidden="true">{item.image ? <img src={assets[item.image]} alt="" loading="lazy" /> : <CollectionIcon name="film" />}</span>
                  <span className="watchlist-card-caption"><span>{item.title}</span><span className="watchlist-card-type">{item.type}</span></span>
                </button>
              </li>;
            })}
          </ul>
        </section>)}
      </div>
      {selected && <aside className={`reading-list-peek${isPeekVisible ? " is-visible" : ""}`} id="watchlist-peek" aria-labelledby="watchlist-peek-title" onTransitionEnd={onPeekTransitionEnd}>
        <div className="reading-list-peek-toolbar"><span>Show details</span><button className="reading-list-peek-close" onClick={closePeek} aria-label="Close show details"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m6.7 5.3 5.3 5.3 5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3z" /></svg></button></div>
        <div className="reading-list-peek-scroll watchlist-scroll" key={selectedId}>
          <div className="reading-list-peek-summary">
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
