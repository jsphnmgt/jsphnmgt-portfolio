import { useLayoutEffect, useRef, useState } from "react";
import Overlay from "../../ProfessionalSide/Overlay";
import CollectionIcon from "./CollectionIcon";
import { assets } from "../../../assets";
import useCollectionPeek from "../../../hooks/useCollectionPeek";
import musicData from "../../../data/musicData.json";

export { songs, playlists };

const tabs = [
  { id: "songs", label: "Songs", heading: "Favorite Songs" },
  { id: "playlists", label: "Playlists", heading: "Favorite Playlists" },
  { id: "genres", label: "Genres", heading: "Favorite Genres" },
  { id: "artists", label: "Artists", heading: "Favorite Artists" },
];
const { songs, playlists, genres, artists } = musicData;

export default function Music({ isOpen = false, onClose }) {
  const [activeTab, setActiveTab] = useState("songs");
  const [recordSpin, setRecordSpin] = useState(0);
  const [isCardSpin, setIsCardSpin] = useState(false);
  const { selectedId, isPeekVisible, peekHeadingRef, openPeek, closePeek, resetPeek, onPeekKeyDown, onPeekTransitionEnd } = useCollectionPeek();
  const selected = [...songs, ...playlists].find(item => item.url === selectedId);
  const [cardOrigin, setCardOrigin] = useState({});
  const cardAreaRef = useRef(null);
  const cardBoundsRef = useRef(null);

  useLayoutEffect(() => {
    if (!selectedId || !cardBoundsRef.current) return;
    const area = cardAreaRef.current.getBoundingClientRect();
    const card = cardBoundsRef.current;
    // Preserve the clicked card's starting position when the player group recenters.
    setCardOrigin(origin => ({
      ...origin,
      "--music-card-origin-x": `${card.left - area.left}px`,
      "--music-card-origin-y": `${card.top - area.top}px`,
    }));
  }, [selectedId]);

  const showPlayer = (item, trigger) => {
    setIsCardSpin(true);
    setRecordSpin(spin => spin + 1);
    const card = trigger.getBoundingClientRect();
    cardBoundsRef.current = card;
    const list = trigger.closest("ul").getBoundingClientRect();
    setCardOrigin({
      "--music-card-origin-x": `${card.left - list.left}px`,
      "--music-card-origin-y": `${card.top - list.top}px`,
      "--music-card-origin-width": `${card.width}px`,
      "--music-selected-card-height": `${card.height}px`,
      "--music-card-list-height": `${list.height}px`,
    });
    openPeek(item.url, trigger);
  };
  const selectTab = id => {
    if (id === activeTab) return;
    resetPeek();
    setCardOrigin({});
    setIsCardSpin(false);
    setActiveTab(id);
  };
  const tabRefs = useRef([]);
  const current = tabs.find(tab => tab.id === activeTab);
  const navigateTabs = (event, index) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    selectTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return <Overlay className="watchlist-overlay music-overlay" isOpen={isOpen} onClose={onClose} showCloseButton={false}>
    <header className="watchlist-header music-header">
      <h2 id="detail-title"><CollectionIcon name="music" />Music Corner<span className="music-equalizer" aria-hidden="true"><i /><i /><i /><i /><i /></span></h2>
      <div className="music-navigation">
        <div className="music-tabs" role="tablist" aria-label="Music collections">
          {tabs.map((tab, index) => <button key={tab.id} role="tab" id={`music-tab-${tab.id}`} aria-selected={activeTab === tab.id} aria-controls="music-panel" tabIndex={activeTab === tab.id ? 0 : -1} ref={element => { tabRefs.current[index] = element; }} onClick={() => selectTab(tab.id)} onKeyDown={event => navigateTabs(event, index)}><span className="music-tab-label">{tab.label}</span></button>)}
        </div>
        <button className="music-close" onClick={onClose} aria-label="Close Music Corner"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19" /></svg></button>
      </div>
    </header>
    <div className="watchlist-scroll music-scroll" role="region" aria-label="Music Corner content" tabIndex={0} onKeyDown={onPeekKeyDown}>
      <div className={`music-layout${selected ? " has-player" : ""}`} style={{ "--music-card-count": activeTab === "genres" ? genres.length : 4 }}>
        <div className="music-record-stage">
          <div className={`music-record${isCardSpin ? " music-record-card-spin" : ""}`} aria-hidden="true"><img key={`${activeTab}-${recordSpin}`} src={assets["music-vinyl.png"]} alt="" /></div>
        </div>
        <section key={activeTab} className="music-panel" id="music-panel" role="tabpanel" aria-labelledby={`music-tab-${activeTab}`} tabIndex={0}>
          <h3>{current.heading}</h3>
          <div ref={cardAreaRef} className={`music-card-area${selected ? " is-playing" : ""}`} style={cardOrigin}>
            {activeTab === "songs" ? <ul className="music-song-list" inert={selected ? "" : undefined}>
              {songs.map(song => <li key={song.title}><button className="music-song-card" onClick={event => showPlayer(song, event.currentTarget)} aria-expanded={selectedId === song.url} aria-controls="music-spotify-peek" aria-label={`Listen to ${song.title} by ${song.artist}`}>
                <img src={assets[song.image]} alt="" />
                <span className="music-song-copy"><span className="music-song-title">{song.title}</span><span className="music-song-artist">{song.artist}</span></span>
              </button></li>)}
            </ul> : activeTab === "playlists" ? <ul className="music-song-list" aria-label="Favorite playlists" inert={selected ? "" : undefined}>
              {playlists.map(playlist => <li key={playlist.title}><button className="music-song-card" onClick={event => showPlayer(playlist, event.currentTarget)} aria-expanded={selectedId === playlist.url} aria-controls="music-spotify-peek" aria-label={`Listen to ${playlist.title}`}>
                <img src={assets[playlist.image]} alt="" />
                <span className="music-song-title">{playlist.title}</span>
              </button></li>)}
            </ul> : activeTab === "genres" ? <ul className="music-song-list music-genre-list" aria-label="Favorite genres">
              {genres.map((genre, index) => <li key={genre}><div className="music-song-card">
                <span className="music-song-title">{genre}</span>
                <span className="music-genre-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div></li>)}
            </ul> : <ul className="music-song-list" aria-label="Favorite artists">
              {artists.map(artist => <li key={artist.title}><a className="music-song-card" href={artist.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${artist.title} on Spotify (opens in a new tab)`}><img src={assets[artist.image]} alt="" /><span className="music-song-title">{artist.title}</span></a></li>)}
            </ul>}
            {selected && <div className={`music-card-player${isPeekVisible ? " is-visible" : ""}`} id="music-spotify-peek" role="region" aria-label={`Spotify player: ${selected.title}`} onTransitionEnd={onPeekTransitionEnd}>
              <div className="music-song-card music-selected-card">
                <button className="music-selected-toggle" onClick={closePeek} aria-label={`Close player for ${selected.title}`} aria-expanded={isPeekVisible} aria-controls="music-spotify-peek">
                  <img src={assets[selected.image]} alt="" />
                  <span className="music-song-copy"><span className="music-song-title">{selected.title}</span>{selected.artist && <span className="music-song-artist">{selected.artist}</span>}</span>
                </button>
                <button className="music-close music-player-close" ref={peekHeadingRef} onClick={closePeek} aria-label="Close Spotify player"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19" /></svg></button>
              </div>
              <a className="music-external-link" href={selected.url} target="_blank" rel="noopener noreferrer">Open in Spotify <span className="sr-only">(opens in a new tab)</span><span aria-hidden="true">↗</span></a>
              <div className={`music-embed-unfold${selected.url.includes("/track/") ? " music-song-embed" : ""}`}><iframe key={selectedId} className="music-spotify-embed" title={`Spotify player: ${selected.title}`} src={`https://open.spotify.com/embed${new URL(selected.url).pathname}?utm_source=generator${selected.title === "inner kogane" ? "&theme=0" : ""}`} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen loading="lazy" /></div>
            </div>}
          </div>
        </section>
      </div>
    </div>
  </Overlay>;
}
