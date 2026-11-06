import ComputerIntro from "./ComputerIntro";
import recycleBinIcon from "../../../assets/personal-computer/pc-recycle-bin.png";
import pcWallpaper from "../../../assets/optimized/pc-city-wallpaper.jpg.webp";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Overlay from "../../ProfessionalSide/Overlay";
import { assets } from "../../../assets";
import watchlist from "../../../data/watchlistData.json";
import readingList from "../../../data/readingListData.json";
import gameData from "../../../data/gameData.json";
import musicData from "../../../data/musicData.json";
import "../../../styles/pc-wallpaper-theme.css";

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
  const [imagesReady, setImagesReady] = useState(false);
  const desktopRef = useRef(null);
  const sidebarRef = useRef(null);
  const folderContentRef = useRef(null);
  const focusFolderRef = useRef(false);
  const [selection, setSelection] = useState(null);

  useLayoutEffect(() => {
    if (folderContentRef.current) folderContentRef.current.scrollTop = 0;
    if (focusFolderRef.current) {
      sidebarRef.current?.querySelector('[aria-current="page"]')?.focus({ preventScroll: true });
      focusFolderRef.current = false;
    }
  }, [currentFolder]);

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


  const iconFolder = (folder, className = "") => <span className={`pc-folder-icon ${className}`} aria-hidden="true"><img src={assets[`pc-${folder.icon}.svg`]} alt="" />{folder.detail && <img className={`pc-folder-detail${folder.detail === "group11" ? " pc-folder-detail-person" : ""}`} src={assets[`pc-${folder.detail}.svg`]} alt="" />}</span>;

  return <Overlay className="pc-overlay" isOpen={isOpen} onClose={onClose}>
    <h2 id="detail-title" className="pc-accessible-title">Personal Computer</h2>
    <div className="pc-desktop" ref={desktopRef}>
      <img className="pc-wallpaper" src={pcWallpaper} alt="" />
      <div className="pc-desktop-folders" aria-label="Desktop icons">
        <div className="pc-desktop-folder">
          <img src={recycleBinIcon} alt="" />
          <span>Recycle Bin</span>
        </div>
        <div className="pc-desktop-folder"><img src={assets["pc-image41.png"]} alt="" /><span>avys</span></div>
        <div className="pc-desktop-folder">
          <svg className="pc-desktop-icon" viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="#153951" /><path d="m2 21 8 3 5-2 8-10-4-4-9 11-4-1-4-2" fill="#f1f5f7" /><circle cx="22" cy="10" r="6" fill="#153951" stroke="#f1f5f7" strokeWidth="2" /><circle cx="22" cy="10" r="3.5" stroke="#f1f5f7" strokeWidth="1.2" /><circle cx="11" cy="22" r="4.3" fill="#153951" stroke="#f1f5f7" strokeWidth="1.5" /><path d="m6 20 5 2" stroke="#f1f5f7" strokeWidth="2.5" strokeLinecap="round" /></svg>
          <span>Steam</span>
        </div>
      </div>
      <div className="pc-explorer" aria-label="File Explorer">
        <header className="pc-window-titlebar">
          <div className="pc-window-tab"><Icon name="group18" className="pc-icon-computer" /><span>{currentFolder}</span></div>
          <div className="pc-window-controls">
            <span aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M5 10h10" /></svg></span>
            <span aria-hidden="true"><svg viewBox="0 0 20 20"><rect x="5" y="5" width="10" height="10" rx="1" /></svg></span>
            <button aria-label="Close computer" onClick={onClose}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" /></svg></button>
          </div>
        </header>
        <div className="pc-navigation-bar" aria-hidden="true">
          <div className="pc-history-controls">
            <Icon name="interface-direction" /><Icon name="interface-direction1" /><Icon name="interface-direction2" /><Icon name="interface-reload" />
          </div>
          <div className="pc-search"><span>This PC <span className="pc-path-separator">/</span> {currentFolder}</span></div>
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
          <div className="pc-folder-content" ref={folderContentRef} aria-live="polite">
            <div key={currentFolder} className="pc-folder-view" data-animate={hasChangedFolder ? "" : undefined}>
              {currentFolder === "Welcome" || currentFolder === "About Me" ? <ComputerIntro about={currentFolder === "About Me"} onAbout={() => { focusFolderRef.current = true; setHasChangedFolder(true); setCurrentFolder("About Me"); }} onOpenCollection={onOpenCollection} /> : <div className="pc-collection-summary">
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
        <time dateTime="2019-03-04T17:53:00+08:00"><span>5:53pm</span><span>3/4/2019</span></time>
      </footer>
    </div>
  </Overlay>;
}
