export default function CollectionIcon({ name, viewBox = "0 0 24 24" }) {
  return <svg className="watchlist-icon" viewBox={viewBox} fill="currentColor" aria-hidden="true">
    {name === "game" && <path fillRule="evenodd" clipRule="evenodd" d="M7 6h10c3 0 5 3 5 7v4c0 3-3 4-5 2l-3-3h-4l-3 3c-2 2-5 1-5-2v-4c0-4 2-7 5-7ZM6 9h2v2h2v2H8v2H6v-2H4v-2h2V9Zm11.1 1a1.1 1.1 0 1 0-2.2 0 1.1 1.1 0 0 0 2.2 0Zm2 3a1.1 1.1 0 1 0-2.2 0 1.1 1.1 0 0 0 2.2 0Z" />}
    {name === "music" && <path d="M9 4v12.2A4 4 0 1 0 11 20V8l8-2v8.2A4 4 0 1 0 21 18V1L9 4Z" />}
    {name === "book" && <path d="M11 5C8 2.8 4.8 2.3 2 3v16c3-.7 6-.2 9 2V5ZM13 5c3-2.2 6.2-2.7 9-2v16c-3-.7-6-.2-9 2V5Z" />}
    {name === "page-pencil" && <><path d="M5 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h5l1-5 8-8V7l-5-5H5Z" /><path d="m13 18 6-6 3 3-6 6-4 1 1-4Zm7-7 1-1a1.4 1.4 0 0 1 2 2l-1 1-2-2Z" /></>}
    {name === "bookmark" && <path d="M6 2h12a1 1 0 0 1 1 1v19l-7-4-7 4V3a1 1 0 0 1 1-1Z" />}
    {name === "star" && <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2L7 14.2 2 9.3l6.9-1L12 2Z" />}
    {name === "heart" && <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />}
    {name === "play" && <path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM10 8v8l6-4-6-4Z" />}
    {name === "check" && <path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM7.2 12.5l3.6 3.6 6-7-1.5-1.3-4.6 5.4-2.1-2.1-1.4 1.4Z" />}
    {name === "clapperboard" && <><path d="M2 10h20v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10Z" /><path d="m2 8-.5-3A2 2 0 0 1 3 2.7l2.2-.4 3 4.3L2 8Zm8.4-1.8L7.4 2l4.3-.8 3 4.2-4.3.8Zm6.5-1.2-3-4.2 4.2-.8a2 2 0 0 1 2.3 1.6l.5 2.7-4 .7Z" transform="translate(0 1)" /></>}
    {name === "film" && <path fillRule="evenodd" d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v3h3V4H4Zm0 6v4h3v-4H4Zm0 7v3h3v-3H4ZM17 4v3h3V4h-3Zm0 6v4h3v-4h-3Zm0 7v3h3v-3h-3ZM9 5v6h6V5H9Zm0 8v6h6v-6H9Z" />}
  </svg>;
}
