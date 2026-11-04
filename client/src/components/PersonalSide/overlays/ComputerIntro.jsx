import CollectionIcon from "./CollectionIcon";

const shortcuts = [
  { id: "watchlist", title: "Watchlist", note: "Movies & series", icon: "clapperboard" },
  { id: "reading-list", title: "Reading List", note: "Books & stories", icon: "book" },
  { id: "game-shelf", title: "Game Shelf", note: "Worlds to get lost in", icon: "game" },
  { id: "music", title: "Music Corner", note: "Songs on repeat", icon: "music" },
];

export default function ComputerIntro({ about = false, onAbout, onOpenCollection }) {
  return <div className={`pc-welcome-copy pc-intro${about ? "" : " pc-intro-welcome"}`}>
    {about ? <>
      <h3 className="pc-intro-title">Hi, I’m <span className="pc-intro-name">Josie.</span></h3>
      <p>I’m a Computer Science student who enjoys turning half-formed ideas into digital experiences, one small piece at a time.</p>
      <div className="pc-intro-interests">
        <h4>Away from the keyboard</h4>
        <ul>{["Drawing", "Films & series", "Reading", "Games", "Music"].map(interest => <li key={interest}>{interest}</li>)}</ul>
      </div>
      <p className="pc-intro-note">This room is where I keep the stories, games, and songs I come back to. Feel free to look around.</p>
    </> : <>
      <h3 className="pc-intro-title">Make yourself <em>at home.</em></h3>
      <p>A little space for my favorite stories, games, and music.</p>
      <div className="pc-quick-links" aria-label="Explore my collections">{shortcuts.map(item => <button className="pc-quick-link" key={item.id} onClick={() => onOpenCollection?.(item.id)} aria-label={`Open ${item.title} collection`}>
        <CollectionIcon name={item.icon} />
        <span><strong>{item.title}</strong><small>{item.note}</small></span>
      </button>)}</div>
      <button className="pc-intro-about" onClick={onAbout}>A little about me <span aria-hidden="true">→</span></button>
    </>}
  </div>;
}
