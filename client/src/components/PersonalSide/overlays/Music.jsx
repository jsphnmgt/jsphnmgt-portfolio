import { useRef, useState } from "react";
import Overlay from "../../ProfessionalSide/Overlay";
import CollectionIcon from "./CollectionIcon";
import { assets } from "../../../assets";
import musicData from "../../../data/musicData.json";
import "../../../styles/music-corner.css";

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
  const [selected, setSelected] = useState(songs[0]);
  const [selectionCount, setSelectionCount] = useState(0);
  const selectRecord = item => {
    setSelected(item);
    setSelectionCount(count => count + 1);
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
    setActiveTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return <Overlay className="watchlist-overlay music-overlay" isOpen={isOpen} onClose={onClose} showCloseButton={false}>
    <header className="watchlist-header music-header">
      <h2 id="detail-title"><CollectionIcon name="music" />Music Corner<span className="music-equalizer" aria-hidden="true"><i /><i /><i /><i /><i /></span></h2>
      <div className="music-navigation">
        <div className="music-tabs" role="tablist" aria-label="Music collections">
          {tabs.map((tab, index) => <button key={tab.id} role="tab" id={`music-tab-${tab.id}`} aria-selected={activeTab === tab.id} aria-controls="music-panel" tabIndex={activeTab === tab.id ? 0 : -1} ref={element => { tabRefs.current[index] = element; }} onClick={() => setActiveTab(tab.id)} onKeyDown={event => navigateTabs(event, index)}><span className="music-tab-label">{tab.label}</span></button>)}
        </div>
        <button className="music-close" onClick={onClose} aria-label="Close Music Corner"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19" /></svg></button>
      </div>
    </header>
    <div className="watchlist-scroll music-scroll" role="region" aria-label="Music Corner content" tabIndex={0}>
      <div className="music-layout" style={{ "--music-card-count": activeTab === "genres" ? genres.length : 4 }}>
        <div className="music-record-stage">
          <div className="music-scene-doodles" aria-hidden="true">
            <span className="music-floating-note music-note-one">♪</span><span className="music-floating-note music-note-two">♫</span><span className="music-floating-note music-note-three">♩</span>
            <svg className="music-orbit-doodle" viewBox="0 0 500 500" fill="none"><path d="M69 125C-12 260 37 433 212 451M331 43c106 3 159 104 132 179" stroke="currentColor" strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" /><path d="m97 52 4 17 17 4-17 5-4 17-5-17-17-5 17-4ZM421 337l5 22 22 5-22 6-5 22-6-22-22-6 22-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M52 352q12-28 27 0-15 23-27 0Z" stroke="currentColor" strokeWidth="2" /></svg>
          </div>
          <span className="music-paper-note" aria-hidden="true">a soundtrack for<br /><em>daydreaming.</em><span>↝</span></span>
          <div className="music-turntable" aria-hidden="true">
            <div className="music-turntable-platter"><div key={selectionCount} className={`music-record music-picked-record${selectionCount ? " is-selected" : ""}`}><img src={assets["music-vinyl.png"]} alt="" /><span className="music-record-artwork"><img src={assets[selected.image]} alt="" /></span></div></div>
            <svg className="music-turntable-arm" viewBox="0 0 100 250" fill="none" focusable="false"><circle cx="68" cy="27" r="18" fill="#717b81" stroke="#343b47" strokeWidth="2" /><circle cx="68" cy="27" r="9" fill="#b8c2c2" /><path d="M68 27v108l-37 62" stroke="#343b47" strokeWidth="10" strokeLinecap="round" /><path d="M66 27v108l-37 62" stroke="#d9ded6" strokeWidth="5" strokeLinecap="round" /><path d="m24 183 18 10-13 24-18-10Z" fill="#343b47" stroke="#d9ded6" strokeWidth="1.5" /></svg>
            <span className="music-turntable-light" /><span className="music-turntable-speed">33 / 45</span><span className="music-turntable-dial" />
            <span className="music-turntable-sticker"><span className="music-sticker-copy">good<br />vibrations</span><span className="music-sticker-star">✷</span></span>
          </div>
          <div className="music-pick-card" id="music-record-details">
            <img className="music-pick-cover" src={assets[selected.image]} alt="" />
            <div className="music-pick-copy"><div aria-live="polite" aria-atomic="true"><span className="music-pick-eyebrow">ON THE TURNTABLE</span><h3>{selected.title}</h3><p>{selected.artist || "A playlist from my collection"}</p></div><a href={selected.url} target="_blank" rel="noopener noreferrer" className="music-pick-link">Open in Spotify <span aria-hidden="true">&#8599;</span><span className="sr-only"> (opens in a new tab)</span></a></div>
          </div>
        </div>
        <section key={activeTab} className="music-panel" id="music-panel" role="tabpanel" aria-labelledby={`music-tab-${activeTab}`} tabIndex={0}>
          <div className="music-panel-heading"><span className="music-panel-eyebrow">THE LISTENING ROOM <span aria-hidden="true">✷</span></span><h3>{current.heading}</h3><p>{activeTab === "songs" ? "Little songs that take up a lot of room in my heart." : activeTab === "playlists" ? "A different little world for every mood." : activeTab === "genres" ? "A little of this, a little of everything." : "The voices I always find my way back to."}</p></div>
          <div className="music-card-area">
            {activeTab === "songs" ? <ul className="music-song-list">
              {songs.map(song => <li key={song.title}><button className="music-song-card" onClick={() => selectRecord(song)} aria-pressed={selected.url === song.url} aria-controls="music-record-details" aria-label={`Select ${song.title} by ${song.artist}`}>
                <img src={assets[song.image]} alt="" />
                <span className="music-song-copy"><span className="music-song-title">{song.title}</span><span className="music-song-artist">{song.artist}</span></span>
              </button></li>)}
            </ul> : activeTab === "playlists" ? <ul className="music-song-list" aria-label="Favorite playlists">
              {playlists.map(playlist => <li key={playlist.title}><button className="music-song-card" onClick={() => selectRecord(playlist)} aria-pressed={selected.url === playlist.url} aria-controls="music-record-details" aria-label={`Select ${playlist.title}`}>
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

          </div>
        </section>
      </div>
    </div>
  </Overlay>;
}
