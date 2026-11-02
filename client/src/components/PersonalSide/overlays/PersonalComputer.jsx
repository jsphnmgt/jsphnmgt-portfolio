import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Overlay from "../../ProfessionalSide/Overlay";
import { assets } from "../../../assets";
import watchlist from "../../../data/watchlistData.json";
import readingList from "../../../data/readingListData.json";
import gameData from "../../../data/gameData.json";
import musicData from "../../../data/musicData.json";

const { favorites: favoriteGames, playing, collection } = gameData;
const { songs } = musicData;

const gameByTitle = title => collection.find(game => game.title.replace(/:/g, "") === title.replace(/:/g, ""));
const summaries = {
  Favorites: [
    { id: "watchlist", label: "Watchlist", items: watchlist.favorites.map(id => watchlist.catalog[id]) },
    { id: "reading-list", label: "Reading List", items: readingList.favorites.map(id => readingList.catalog[id]) },
    { id: "game-shelf", label: "Game Shelf", items: favoriteGames.map(gameByTitle).filter(Boolean) },
    { id: "music", label: "Music Corner", items: songs },
  ],
  Currents: [
    { id: "watchlist", label: "Currently Watching", items: watchlist.watching.map(id => watchlist.catalog[id]) },
    { id: "reading-list", label: "Currently Reading", items: readingList.reading.map(id => readingList.catalog[id]) },
    { id: "game-shelf", label: "Currently Playing", items: playing },
  ],
};

function Icon({ name, className = "" }) {
  return <span className={`pc-icon ${className}`} aria-hidden="true"><img src={assets[`pc-${name}.svg`]} alt="" /></span>;
}

const folders = [
  { name: "Welcome", icon: "group4", detail: "group15" },
  { name: "About Me", icon: "group5", detail: "group11" },
  { name: "Favorites", icon: "group1" },
  { name: "Currents", icon: "group6" },
];

export default function PersonalComputer({ isOpen = false, onClose, onOpenCollection }) {
  const [currentFolder, setCurrentFolder] = useState("Welcome");
  const [hasChangedFolder, setHasChangedFolder] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [imagesReady, setImagesReady] = useState(false);
  const desktopRef = useRef(null);
  const sidebarRef = useRef(null);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    const images = [...desktopRef.current.querySelectorAll("img")];
    Promise.all(images.map(image => image.decode().catch(() => { }))).then(() => {
      if (!cancelled) setImagesReady(true);
    });
    return () => { cancelled = true; };
  }, [isOpen]);

  useLayoutEffect(() => {
    const sidebar = sidebarRef.current;
    const update = () => {
      const button = sidebar?.querySelector('[aria-current="page"]');
      if (button?.offsetHeight) setSelection({ top: button.offsetTop, height: button.offsetHeight });
    };
    update();
    const observer = new ResizeObserver(update);
    if (sidebar) observer.observe(sidebar);
    return () => observer.disconnect();
  }, [currentFolder, isOpen, imagesReady]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, [isOpen]);

  const iconFolder = (folder, className = "") => <span className={`pc-folder-icon ${className}`} aria-hidden="true"><img src={assets[`pc-${folder.icon}.svg`]} alt="" />{folder.detail && <img className={`pc-folder-detail${folder.detail === "group11" ? " pc-folder-detail-person" : ""}`} src={assets[`pc-${folder.detail}.svg`]} alt="" />}</span>;

  return <Overlay className="pc-overlay" isOpen={isOpen} onClose={onClose}>
    <h2 id="detail-title" className="pc-accessible-title">Personal Computer</h2>
    <div className="pc-desktop" ref={desktopRef}>
      <img className="pc-wallpaper" src={assets["pc-rectangle49.png"]} alt="" />
      <div className="pc-desktop-folders" aria-label="Desktop folders">
        {["HAU", "avys", "APSI"].map(name => <div className="pc-desktop-folder" key={name}><img src={assets["pc-image41.png"]} alt="" /><span>{name}</span></div>)}
      </div>
      <div className="pc-explorer" aria-label="File Explorer">
        <header className="pc-window-titlebar">
          <div className="pc-window-tab"><Icon name="group18" className="pc-icon-computer" /><span>This PC</span><span aria-hidden="true"><Icon name="system-add-remove" /></span></div>
          <span className="pc-new-tab" aria-hidden="true"><Icon name="system-add-remove1" /></span>
          <div className="pc-window-controls">
            <span aria-hidden="true"><Icon name="minimise" /></span>
            <span aria-hidden="true"><span className="pc-maximize-icon" /></span>
            <button aria-label="Close computer" onClick={onClose}><Icon name="close" /></button>
          </div>
        </header>
        <div className="pc-navigation-bar" aria-hidden="true">
          <div className="pc-history-controls">
            <Icon name="interface-direction" /><Icon name="interface-direction1" /><Icon name="interface-direction2" /><Icon name="interface-reload" />
          </div>
          <div className="pc-search"><span>Search</span><Icon name="interface-search" /></div>
        </div>
        <div className="pc-folder-tools" aria-hidden="true">
          <span><span className="pc-view-icon"><i /><i /><i /><i /></span>View</span><span><Icon name="spreadsheet-sorting" />Sorting</span><span><Icon name="group29" />Share</span><span><Icon name="system-properties" />Properties</span>
        </div>
        <div className="pc-explorer-body">
          <nav className="pc-sidebar" aria-label="Computer folders">
            <div className="pc-sidebar-group" ref={sidebarRef}>
              {selection && <span className="pc-sidebar-selection" aria-hidden="true" style={{ transform: `translateY(${selection.top}px)`, height: `${selection.height}px` }} />}
              <div className="pc-sidebar-heading">{iconFolder({ icon: "group19" })}<span>This PC</span><Icon name="interface-arrow" className="pc-small-arrow" /></div>
              {folders.map(folder => <button key={folder.name} aria-current={currentFolder === folder.name ? "page" : undefined} onClick={() => {
                if (folder.name === currentFolder) return;
                setHasChangedFolder(true);
                setCurrentFolder(folder.name);
              }}>{iconFolder(folder, folder.name === "Favorites" ? "pc-icon-explorer" : "")}<span>{folder.name}</span><Icon name="interface-arrow1" className="pc-small-arrow" /></button>)}
            </div>
          </nav>
          <div className="pc-folder-content" aria-live="polite">
            <div key={currentFolder} className="pc-folder-view" data-animate={hasChangedFolder ? "" : undefined}>
              {currentFolder === "Welcome" ? <div className="pc-welcome-copy"><p>Hi, welcome to my room!</p><p>I wanted a little space here for the things I enjoy outside of work—what I’m reading, the games I play, the shows I watch, and the music I keep coming back to.</p><p>Feel free to look around. You can click the objects in the room or use Explore Room to find a collection. If you’d like to get to know me a little better, start with About Me here on the computer.</p></div> : currentFolder === "About Me" ? <div className="pc-welcome-copy">
                <p>Hi! I’m Josie, a Computer Science student who enjoys building digital experiences and exploring different corners of tech. I like turning half-formed ideas into something real, one small piece at a time.</p>
                <p>Outside of coding, I spend my time drawing, watching movies and series, reading novels and stories, playing games, and listening to my favorite songs on repeat.</p>
                <p>I’m always curious about something new, whether it’s tech or a hobby. This room brings those interests together—feel free to look around and get to know the person behind the code.</p>
              </div> : <div className="pc-collection-summary">
                <h3>{currentFolder}</h3>
                <ul className="pc-summary-list">{summaries[currentFolder].map(group => <li key={group.id}>
                  <button className="pc-summary-link" onClick={() => onOpenCollection?.(group.id)} aria-label={`Open ${group.label} collection`}>
                    {group.items[0]?.image && <img src={assets[group.items[0].image]} alt="" />}
                    <span className="pc-summary-copy"><span className="pc-summary-label">{group.label}</span><span className="pc-summary-titles">{group.items.slice(0, 2).map(item => item.title).join(" · ") || "Nothing here yet"}{group.items.length > 2 && <span className="pc-summary-more"> +{group.items.length - 2} more</span>}</span></span>
                    <span className="pc-summary-arrow" aria-hidden="true">›</span>
                  </button>
                </li>)}</ul>
              </div>}
            </div>
          </div>
        </div>
      </div>
      <footer className="pc-taskbar">
        <div className="pc-taskbar-apps">
          <span aria-label="Windows"><Icon name="union" /></span>
          <span aria-label="Chrome"><img src={assets["pc-image56.png"]} alt="" /></span>
          <span className="pc-taskbar-active" aria-label="File Explorer — active"><img src={assets["pc-image41.png"]} alt="" /></span>
          <span aria-label="Spotify"><img src={assets["pc-spotify51.png"]} alt="" /></span>
          <span className="pc-discord" aria-label="Discord"><img className="pc-discord-circle" src={assets["pc-ellipse38.svg"]} alt="" /><img src={assets["pc-discord1.png"]} alt="" /></span>
        </div>
        <time dateTime={now.toISOString()}><span>{now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Singapore" })}</span><span>{now.toLocaleDateString("en-US", { timeZone: "Asia/Singapore" })}</span></time>
      </footer>
    </div>
  </Overlay>;
}
