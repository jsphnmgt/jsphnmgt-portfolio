import { useEffect, useRef, useState } from "react";
import Overlay from "../../ProfessionalSide/Overlay";
import { assets } from "../../../assets";
import CollectionIcon from "./CollectionIcon";
import CollectionHeader from "./CollectionHeader";
import useCollectionPeek from "../../../hooks/useCollectionPeek";
import gameData from "../../../data/gameData.json";

export { favorites, playing, collection };

const { favorites, playing, details: gameDetails } = gameData;
const collection = gameData.collection.map(game => ({ ...game, genres: gameDetails[game.title]?.genres || [] })).sort((a, b) => a.title.localeCompare(b.title));

export default function GameShelf({ isOpen = false, onClose }) {
  const [selected, setSelected] = useState(1);
  const { selectedId, isPeekVisible, peekHeadingRef, openPeek, closePeek, onPeekKeyDown, onPeekTransitionEnd } = useCollectionPeek();
  const peekGame = collection.find(game => game.image === selectedId);
  const details = peekGame ? gameDetails[peekGame.title] : null;
  const normalizeTitle = title => title.replace(/:/g, "").toLowerCase();
  const statuses = peekGame ? [
    ...(favorites.some(title => normalizeTitle(title) === normalizeTitle(peekGame.title)) ? [{ title: "Favorite", icon: "heart" }] : []),
    ...(playing.some(game => game.image === selectedId) ? [{ title: "Currently Playing", icon: "play" }] : []),
    { title: "In My Collection", icon: "bookmark" },
  ] : [];
  const stageRef = useRef(null);
  const artRef = useRef(null);
  const collectionRef = useRef(null);
  const move = direction => setSelected(index => (index + direction + playing.length) % playing.length);

  useEffect(() => {
    if (!isOpen) return;
    const fit = () => {
      if (stageRef.current && artRef.current) {
        artRef.current.style.setProperty("--game-console-scale", stageRef.current.clientWidth / artRef.current.offsetWidth);
      }
    };
    const observer = new ResizeObserver(fit);
    observer.observe(stageRef.current);
    fit();
    return () => observer.disconnect();
  }, [isOpen]);

  const goToCollection = () => collectionRef.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  const showFavorite = (title, trigger) => {
    const index = playing.findIndex(game => game.title === title);
    if (index >= 0) setSelected(index);
    const game = collection.find(item => normalizeTitle(item.title) === normalizeTitle(title));
    if (game) openPeek(game.image, trigger);
  };

  return <Overlay className="watchlist-overlay game-shelf-overlay" isOpen={isOpen} onClose={onClose}>
    <CollectionHeader title="Game Shelf" icon="game" />
    <div className={`reading-list-layout${peekGame ? " has-peek" : ""}`} onKeyDown={onPeekKeyDown}>
      <div className="watchlist-scroll reading-list-collections" role="region" aria-label="Game Shelf" tabIndex={0}>
        <div className="game-console-stage" ref={stageRef}>
          <div className="game-console-art" ref={artRef}>
            <img className="game-console-shell" src={assets["game-ds-shell.svg"]} alt="" />
            <img className="game-speaker game-speaker-left" src={assets["game-speaker-left.svg"]} alt="" />
            <img className="game-speaker game-speaker-right" src={assets["game-speaker-right.svg"]} alt="" />
            <div className="game-screen-bezel game-screen-bezel-top" />
            <div className="game-screen game-screen-top">
              <div className="game-status-rail" aria-hidden="true"><span className="game-signal">▂▄▆</span><span className="game-meter">{Array.from({ length: 10 }, (_, i) => <i key={i} />)}</span><span className="game-status-square" /></div>
              <section className="game-chat game-favorites" aria-labelledby="game-favorites-title">
                <h3 id="game-favorites-title" className="game-chat-tag">Favorites <span className="collection-count">{favorites.length}</span></h3>
                <ul>{favorites.map(title => <li key={title}><button onClick={event => showFavorite(title, event.currentTarget)} aria-controls="game-shelf-peek"><span aria-hidden="true">›</span>{title}</button></li>)}</ul>
              </section>
            </div>
            <div className="game-screen-bezel game-screen-bezel-bottom" />
            <div className="game-screen game-screen-bottom">
              <section className="game-chat game-playing" aria-labelledby="game-playing-title">
                <h3 id="game-playing-title" className="game-chat-tag">Currently Playing <span className="collection-count">{playing.length}</span></h3>
                <span className="game-selected-title" aria-live="polite">{playing[selected].title}</span>
                <div className="game-playing-row">
                  {[-1, 0, 1].map(offset => {
                    const index = (selected + offset + playing.length) % playing.length;
                    const game = playing[index];
                    return <button key={game.title} className={index === selected ? "is-selected" : ""} aria-label={`${offset === 0 ? "View details for" : "Select"} ${game.title}`} onClick={event => offset === 0 ? openPeek(game.image, event.currentTarget) : setSelected(index)}><img src={assets[game.image]} alt="" /></button>;
                  })}
                </div>
                <div className="game-playing-caption">
                  <span className="game-controls-hint">Use the buttons to switch games.</span>
                </div>
              </section>
            </div>
            <div className="game-dpad"><img src={assets["game-dpad.svg"]} alt="" />
              <button className="game-dpad-up" aria-label="Previous game" onClick={() => move(-1)} />
              <button className="game-dpad-left" aria-label="Previous game" onClick={() => move(-1)} />
              <button className="game-dpad-right" aria-label="Next game" onClick={() => move(1)} />
              <button className="game-dpad-down" aria-label="Next game" onClick={() => move(1)} />
            </div>
            {[{ label: "X", direction: -1 }, { label: "Y", direction: -1 }, { label: "A", direction: 1 }, { label: "B", direction: 1 }].map(control => <button key={control.label} className={`game-face-button game-face-${control.label.toLowerCase()}`} aria-label={`${control.label}: select ${control.direction > 0 ? "next" : "previous"} game`} onClick={() => move(control.direction)}><img src={assets["game-face-button.svg"]} alt="" /><span>{control.label}</span></button>)}
            <button className="game-small-button game-start" onClick={goToCollection}><img src={assets["game-small-button.svg"]} alt="" /><span>START</span></button>
            <button className="game-small-button game-select" onClick={() => move(1)}><img src={assets["game-small-button.svg"]} alt="" /><span>SELECT</span></button>
          </div>
        </div>
        <section className="watchlist-section game-collection" ref={collectionRef} aria-labelledby="game-collection-title">
          <h3 id="game-collection-title">Game Collection <span className="collection-count">{collection.length}</span></h3>
          <ul className="game-cartridges">{collection.map(game => <li key={game.title} className="game-cartridge">
            <button className="reading-list-card-button game-cartridge-button" aria-label={`View details for ${game.title}`} aria-expanded={selectedId === game.image} aria-controls="game-shelf-peek" onClick={event => openPeek(game.image, event.currentTarget)}>
              <span className="game-cartridge-art" aria-hidden="true">
                <img className="game-cartridge-shell" src={assets["game-cartridge.png"]} alt="" />
                <img className="game-cartridge-label" src={assets[game.image]} style={{ objectPosition: game.imagePosition }} alt="" />
              </span>
              <span className="game-cartridge-title">{game.title}</span>
            </button>
          </li>)}</ul>
        </section>
      </div>
      {peekGame && <aside className={`reading-list-peek${isPeekVisible ? " is-visible" : ""}`} id="game-shelf-peek" aria-labelledby="game-shelf-peek-title" onTransitionEnd={onPeekTransitionEnd}>
        <div className="reading-list-peek-toolbar"><span>Game details</span><button className="reading-list-peek-close" onClick={closePeek} aria-label="Close game details"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m6.7 5.3 5.3 5.3 5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3z" /></svg></button></div>
        <div className="reading-list-peek-scroll watchlist-scroll" key={selectedId}>
          <div className="reading-list-peek-summary">
            <img className="reading-list-peek-cover" src={assets[peekGame.image]} alt="" />
            <h3 id="game-shelf-peek-title" ref={peekHeadingRef} tabIndex={-1}>{peekGame.title}</h3>
          </div>
          <div className="reading-list-peek-genres">{details.genres.map(genre => <span key={genre}>{genre}</span>)}</div>
          <dl className="reading-list-peek-meta"><div><dt>Playing status</dt><dd>{statuses.map(status => <span key={status.title}><CollectionIcon name={status.icon} />{status.title}</span>)}</dd></div></dl>
          <section className="reading-list-peek-section"><h4>About the game</h4><p>{details.description}</p></section>
          <section className="reading-list-peek-section"><h4>My thoughts</h4><p className={details.thoughts ? undefined : "reading-list-peek-placeholder"}>{details.thoughts || "I’ll add my thoughts here soon."}</p></section>
        </div>
      </aside>}
    </div>
  </Overlay>;
}
