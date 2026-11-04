import useCollectionPeek from "../../../hooks/useCollectionPeek";
import Overlay from "../../ProfessionalSide/Overlay";
import CollectionIcon from "./CollectionIcon";
import CollectionHeader from "./CollectionHeader";
import { assets } from "../../../assets";
import readingList from "../../../data/readingListData.json";

const sections = [
  { id: "favorites", title: "Favorites", icon: "heart" },
  { id: "reading", title: "Currently Reading", icon: "bookmark" },
  { id: "finished", title: "Finished Reading", icon: "check" },
];

export default function ReadingList({ isOpen = false, onClose }) {
  const { selectedId, isPeekVisible, peekHeadingRef, openPeek, closePeek, onPeekKeyDown, onPeekTransitionEnd } = useCollectionPeek();
  const selected = selectedId ? readingList.catalog[selectedId] : null;
  const statuses = selectedId ? sections.filter(section => readingList[section.id].includes(selectedId)) : [];
  return <Overlay className="watchlist-overlay reading-list-overlay" isOpen={isOpen} onClose={onClose}>
    <CollectionHeader title="Reading List" icon="book" />
    <div className={`reading-list-layout${selected ? " has-peek" : ""}`} onKeyDown={onPeekKeyDown}>
      <div className="watchlist-scroll reading-list-collections" role="region" aria-label="Reading List collections" tabIndex={0}>
        {sections.map(section => <section className="watchlist-section" key={section.id} aria-labelledby={`reading-list-${section.id}`}>
          <h3 id={`reading-list-${section.id}`}><CollectionIcon name={section.icon} />{section.title}
            <span className="collection-count">{readingList[section.id].length}</span></h3>
          <ul className="watchlist-cards" aria-label={section.title}>
            {[...readingList[section.id]].sort((a, b) => readingList.catalog[a].title.localeCompare(readingList.catalog[b].title, "en", { numeric: true, sensitivity: "base" })).map(id => {
              const item = readingList.catalog[id];
              return <li className="reading-list-card" key={id}>
                <button className="reading-list-card-button" aria-label={`View details for ${item.title}`} aria-expanded={selectedId === id} aria-controls="reading-list-peek" onClick={event => openPeek(id, event.currentTarget)}>
                  <span className="reading-list-cover-frame" aria-hidden="true">
                    <span className="reading-list-cover"><img src={assets[item.image]} alt="" loading="lazy" /></span>
                  </span>
                  <span className="reading-list-caption">
                    <span className="reading-list-card-title">{item.title}</span>
                    <span className="reading-list-card-author">{item.author}</span>
                    {item.rating !== null && <span className="reading-list-rating" role="img" aria-label={`${item.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }, (_, star) => <span className={star < item.rating ? "is-rated" : undefined} key={star}><CollectionIcon name="star" /></span>)}
                    </span>}
                  </span>
                </button>
              </li>;
            })}
          </ul>
        </section>)}
      </div>
      {selected && <aside className={`reading-list-peek${isPeekVisible ? " is-visible" : ""}`} id="reading-list-peek" aria-labelledby="reading-peek-title" onTransitionEnd={onPeekTransitionEnd}>
        <div className="reading-list-peek-toolbar"><span>Book details</span><button className="reading-list-peek-close" onClick={closePeek} aria-label="Close book details"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m6.7 5.3 5.3 5.3 5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3z" /></svg></button></div>
        <div className="reading-list-peek-scroll watchlist-scroll" key={selectedId}>
          <div className="reading-list-peek-summary">
            <img className="reading-list-peek-cover" src={assets[selected.image]} alt="" />
            <div><h3 id="reading-peek-title" ref={peekHeadingRef} tabIndex={-1}>{selected.title}</h3><p className="reading-list-peek-author">{selected.author}</p></div>
          </div>
          <div className="reading-list-peek-genres">{selected.genres.map(genre => <span key={genre}>{genre}</span>)}</div>
          <dl className="reading-list-peek-meta">
            <div><dt>Reading status</dt><dd>{statuses.map(status => <span key={status.id}><CollectionIcon name={status.icon} />{status.title}</span>)}</dd></div>
            {selected.rating !== null && <div><dt>My rating</dt><dd><span className="reading-list-rating" role="img" aria-label={`${selected.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, star) => <span className={star < selected.rating ? "is-rated" : undefined} key={star}><CollectionIcon name="star" /></span>)}</span></dd></div>}
          </dl>
          <section className="reading-list-peek-section"><h4>Synopsis</h4><p>{selected.synopsis}</p></section>
          <section className="reading-list-peek-section"><h4>{readingList.reading.includes(selectedId) ? "What caught my interest" : "My thoughts"}</h4><p className={selected.thoughts ? undefined : "reading-list-peek-placeholder"}>{selected.thoughts || "I’ll add my thoughts here soon."}</p></section>
        </div>
      </aside>}
    </div>
  </Overlay>;
}
