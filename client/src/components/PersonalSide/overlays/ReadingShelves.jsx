import { useLayoutEffect, useRef, useState } from "react";
import { assets } from "../../../assets";
import CollectionIcon from "./CollectionIcon";

export default function ReadingShelves({ label, ids, catalog, favorites, selectedId, onOpenBook }) {
  const shelfRef = useRef(null);
  const bookRefs = useRef(new Map());
  const measuredColumns = useRef(6);
  const focusedBook = useRef(null);
  const [columns, setColumns] = useState(6);

  useLayoutEffect(() => {
    const shelf = shelfRef.current;
    const measure = () => {
      // Follow the existing responsive grid, including the narrower detail view.
      const tracks = getComputedStyle(shelf).gridTemplateColumns.split(/\s+/).filter(Boolean);
      const nextColumns = Math.max(1, tracks.length);
      if (nextColumns === measuredColumns.current) return;
      measuredColumns.current = nextColumns;
      if (shelf.contains(document.activeElement)) focusedBook.current = document.activeElement.dataset.bookId;
      setColumns(nextColumns);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(shelf);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!focusedBook.current) return;
    bookRefs.current.get(focusedBook.current)?.focus({ preventScroll: true });
    focusedBook.current = null;
  }, [columns]);

  const rows = [];
  for (let index = 0; index < ids.length; index += columns) rows.push(ids.slice(index, index + columns));

  return <ul className="watchlist-cards reading-shelf-rows" aria-label={label} ref={shelfRef}>
    {rows.map((row, rowIndex) => <li className="reading-shelf-row" key={rowIndex}>
      <ul className="reading-shelf-books" aria-label={`${label}, shelf ${rowIndex + 1}`} style={{ "--shelf-book-count": row.length }}>
        {row.map((id, index) => {
          const item = catalog[id];
          return <li className="reading-list-card" key={id} style={{ gridColumn: index + 1 }}>
            <button className="reading-list-card-button" data-book-id={id} ref={node => {
              if (node) bookRefs.current.set(id, node);
              else bookRefs.current.delete(id);
            }} aria-label={`View details for ${item.title}`} aria-expanded={selectedId === id} aria-controls="reading-list-peek" onClick={() => onOpenBook(id, {
              // Row reflow can remount this button while its detail panel is open.
              focus: options => bookRefs.current.get(id)?.focus(options),
            })}>
              <span className="reading-list-cover-frame" aria-hidden="true">
                <span className="reading-list-cover"><img src={assets[item.image]} alt="" loading="lazy" />
                  {favorites.includes(id) && <span className="reading-favorite-marker"><CollectionIcon name="heart" /></span>}
                </span>
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
        <li className="reading-shelf-ledge" aria-hidden="true" />
      </ul>
    </li>)}
  </ul>;
}
