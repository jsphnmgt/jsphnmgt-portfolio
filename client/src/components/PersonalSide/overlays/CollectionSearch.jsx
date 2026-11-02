import { useId, useRef, useState } from "react";

const normalize = value => value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function useCollectionFilter() {
  const [query, setQuery] = useState("");
  const search = normalize(query.trim());
  const matches = item => normalize(`${item.title} ${item.author || ""} ${(item.genres || []).join(" ")}`).includes(search);
  return { query, setQuery, matches };
}

export default function CollectionSearch({ label, query, setQuery, count, hint = "Search by title or genre." }) {
  const id = useId();
  const inputRef = useRef(null);
  return <div className="collection-search">
    <label htmlFor={id}>{label}</label>
    <div className="collection-search-field">
      <input id={id} ref={inputRef} type="search" value={query} placeholder="Find a title…" onChange={event => setQuery(event.target.value)} onKeyDown={event => {
        if (event.key === "Escape" && query) {
          event.preventDefault();
          event.stopPropagation();
          setQuery("");
        }
      }} />
      {query && <button onClick={() => { setQuery(""); inputRef.current?.focus(); }}>Clear search</button>}
    </div>
    <p className="collection-search-status" role="status">{query.trim() ? count ? `${count} ${count === 1 ? "title" : "titles"} found` : "No titles found. Try another search." : hint}</p>
  </div>;
}
