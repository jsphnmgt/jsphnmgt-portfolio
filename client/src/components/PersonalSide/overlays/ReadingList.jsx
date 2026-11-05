import ReadingShelves from "./ReadingShelves";
import useCollectionPeek from "../../../hooks/useCollectionPeek";
import Overlay from "../../ProfessionalSide/Overlay";
import CollectionIcon from "./CollectionIcon";
import CollectionHeader from "./CollectionHeader";
import ReadingPegboard from "./ReadingPegboard";
import { assets } from "../../../assets";
import readingList from "../../../data/readingListData.json";
import "../../../styles/reading-journal.css";
import "../../../styles/reading-corner.css";

const sections = [
  { id: "favorites", title: "Favorites", icon: "heart", caption: "The ones that stay with me." },
  { id: "reading", title: "Currently Reading", icon: "bookmark", caption: "Somewhere between the first page and the last." },
  { id: "finished", title: "Finished Reading", icon: "check", caption: "Last page turned, story kept." },
];

export default function ReadingList({ isOpen = false, onClose }) {
  const { selectedId, isPeekVisible, peekHeadingRef, openPeek, closePeek, onPeekKeyDown, onPeekTransitionEnd } = useCollectionPeek();
  const selected = selectedId ? readingList.catalog[selectedId] : null;
  const statuses = selectedId ? sections.filter(section => readingList[section.id].includes(selectedId)) : [];
  const pinnedId = readingList.favorites[0];
  const chooseShelf = id => {
    const heading = document.getElementById(`reading-list-${id}`);
    heading?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    heading?.focus({ preventScroll: true });
  };
  return <Overlay className="watchlist-overlay reading-list-overlay" isOpen={isOpen} onClose={onClose}>
    <CollectionHeader title="Reading List" icon="book" />
    <div className={`reading-list-layout${selected ? " has-peek" : ""}`} onKeyDown={onPeekKeyDown}>
      <div className="watchlist-scroll reading-list-collections" role="region" aria-label="Reading List collections" tabIndex={0}>
        <ReadingPegboard favorite={readingList.catalog[pinnedId]} onOpenBook={trigger => openPeek(pinnedId, trigger)} onChooseShelf={chooseShelf} sections={sections} counts={Object.fromEntries(sections.map(section => [section.id, readingList[section.id].length]))} />
        {sections.map(section => <section className="watchlist-section" key={section.id} aria-labelledby={`reading-list-${section.id}`}>
          <h3 id={`reading-list-${section.id}`} tabIndex={-1}><CollectionIcon name={section.icon} />{section.title}
            <span className="collection-count">{readingList[section.id].length}</span></h3>
          <p className="reading-shelf-caption">{section.caption}</p>
          <ReadingShelves
            label={section.title}
            ids={[...readingList[section.id]].sort((a, b) => readingList.catalog[a].title.localeCompare(readingList.catalog[b].title, "en", { numeric: true, sensitivity: "base" }))}
            catalog={readingList.catalog}
            favorites={readingList.favorites}
            selectedId={selectedId}
            onOpenBook={openPeek}
          />
        </section>)}
      </div>
      {selected && <aside className={`reading-list-peek${isPeekVisible ? " is-visible" : ""}`} id="reading-list-peek" aria-labelledby="reading-peek-title" onTransitionEnd={onPeekTransitionEnd}>
        <button className="reading-list-peek-close" onClick={closePeek} aria-label="Close book details"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m6.7 5.3 5.3 5.3 5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3z" /></svg></button>
        <div className="reading-list-peek-scroll watchlist-scroll" key={selectedId}>

          <div className="reading-journal-hero">
            <span className="reading-journal-eyebrow"><CollectionIcon name="book" />From my bookshelf</span>
            <div className="reading-journal-cover-stage">
            <img className="reading-list-peek-cover" src={assets[selected.image]} alt="" />
            </div>
            <div className="reading-journal-title"><h3 id="reading-peek-title" ref={peekHeadingRef} tabIndex={-1}>{selected.title}</h3><p className="reading-list-peek-author">by {selected.author}</p></div>
            <div className="reading-list-peek-genres">{selected.genres.map(genre => <span key={genre}>{genre}</span>)}</div>
          </div>
          <dl className="reading-list-peek-meta">
            <div><dt>Reading status</dt><dd>{statuses.map(status => <span key={status.id}><CollectionIcon name={status.icon} />{status.title}</span>)}</dd></div>
            {selected.rating !== null && <div><dt>My rating</dt><dd><span className="reading-list-rating" role="img" aria-label={`${selected.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, star) => <span className={star < selected.rating ? "is-rated" : undefined} key={star}><CollectionIcon name="star" /></span>)}</span></dd></div>}
          </dl>

          <section className="reading-list-peek-section"><h4>Synopsis</h4><p>{selected.synopsis}</p></section>
          <section className="reading-list-peek-section reading-journal-notes"><h4><CollectionIcon name="bookmark" />{readingList.reading.includes(selectedId) ? "What caught my interest" : "My thoughts"}</h4><p className={selected.thoughts ? undefined : "reading-list-peek-placeholder"}>{selected.thoughts || "I’ll add my thoughts here soon."}</p></section>

        </div>
      </aside>}
    </div>
  </Overlay>;
}
