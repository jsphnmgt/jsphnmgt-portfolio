import { useRef } from "react";
import CollectionIcon from "./CollectionIcon";
import { assets } from "../../../assets";
import lilyBouquet from "../../../assets/optimized/board-lily-bouquet.jpg.webp";
import purpleFlowers from "../../../assets/optimized/board-purple-flowers.png.webp";
import lilacPrint from "../../../assets/optimized/board-lilac-print.jpg.webp";
import botanicalPrint from "../../../assets/optimized/board-botanical.jpg.webp";
import frogDock from "../../../assets/optimized/board-frog-dock.jpg.webp";
import catMeadow from "../../../assets/optimized/board-cat-meadow.jpg.webp";
import frogPond from "../../../assets/optimized/board-frog-pond.jpg.webp";
import skyCat from "../../../assets/optimized/board-sky-cat.png.webp";

function BoardCalendar() {
  const date = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Singapore", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const part = type => Number(date.find(item => item.type === type).value);
  const year = part("year"), month = part("month"), today = part("day");
  const first = new Date(Date.UTC(year, month - 1, 1));
  const offset = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const title = new Intl.DateTimeFormat("en", { month: "long", timeZone: "UTC" }).format(first);
  return <div className="reading-board-calendar reading-hover-piece reading-paper-piece" tabIndex={0} aria-label={title + " " + year + ", today is " + today}>
    <div className="reading-calendar-heading"><span>{title}</span><span>{year}</span></div>
    <div className="reading-calendar-grid" aria-hidden="true">
      {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => <span className="reading-calendar-weekday" key={"weekday-" + i}>{day}</span>)}
      {Array.from({ length: offset }, (_, i) => <span key={"blank-" + i} />)}
      {Array.from({ length: days }, (_, i) => <span key={i} className={i + 1 === today ? "is-today" : undefined}>{i + 1}</span>)}
    </div>
    <span className="reading-calendar-footer">a little time for stories</span>
  </div>;
}

export default function ReadingPegboard({ favorite, onOpenBook, onChooseShelf, sections, counts }) {
  const hoveredPiece = useRef(null);
  const clearTilt = () => {
    hoveredPiece.current?.element.style.removeProperty("--pointer-tilt");
    hoveredPiece.current = null;
  };
  const followPointer = event => {
    if (event.pointerType === "touch" || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
      clearTilt();
      return;
    }
    const element = event.target.closest(".reading-hover-piece");
    if (!element || !event.currentTarget.contains(element)) {
      clearTilt();
      return;
    }
    if (hoveredPiece.current?.element !== element) {
      clearTilt();
      // Keep the resting bounds so the tilt does not feed back into its own measurement.
      hoveredPiece.current = { element, bounds: element.getBoundingClientRect() };
    }
    const { bounds } = hoveredPiece.current;
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    const gentle = element.matches(".reading-pinned-note, .reading-board-calendar");
    const pitch = -y * (gentle ? 2 : 7);
    const yaw = x * (gentle ? 3 : 10);
    const angle = Math.hypot(pitch, yaw);
    element.style.setProperty("--pointer-tilt", angle < .01 ? "0deg" : `${pitch} ${yaw} 0 ${angle}deg`);
  };
  return <div className="reading-corner-board">
    <div className="reading-pegboard" onPointerMove={followPointer} onPointerLeave={clearTilt} onPointerCancel={clearTilt}>
      <div className="reading-board-notes">
      <div className="reading-pinned-note reading-hover-piece reading-paper-piece" tabIndex={0}>
        <span className="reading-corner-eyebrow">My little reading corner</span>
        <p>Just one<br />more <em>chapter.</em></p>
        <span className="reading-note-foot">A few favorites. A few unfinished adventures.</span>
      </div>
      <div className="reading-plans-note reading-hover-piece reading-paper-piece" tabIndex={0}><p>&ldquo;kill me after lunch&rdquo;</p><span className="reading-quote-credit">&mdash; kreyul</span></div>

        <div className="reading-art-print reading-botanical-print reading-hover-piece reading-paper-piece" tabIndex={0}><img src={botanicalPrint} alt="A sprig of lavender flowers on cream paper" /></div>
      </div>
      <div className="reading-board-feature">
        <div className="reading-art-print reading-lilac-print reading-hover-piece reading-paper-piece" tabIndex={0}><img src={lilacPrint} alt="Vintage lilac botanical print titled First Emotions of Love" /></div>
      <button className="reading-pinned-pick reading-hover-piece reading-paper-piece" onClick={event => onOpenBook(event.currentTarget)} aria-label={`View details for ${favorite.title}`} aria-controls="reading-list-peek">
        <span className="reading-pick-cover" data-purple-tint={favorite.image === "reading-death-rescheduled.jpg" ? "true" : undefined}><img src={assets[favorite.image]} alt="" /></span>
        <span className="reading-pick-caption"><CollectionIcon name="heart" />A shelf favorite</span>
      </button>
      <figure className="reading-cat-polaroid reading-hover-piece reading-paper-piece" tabIndex={0}>
        <img src={skyCat} alt="A cat sitting on a balcony beneath a lavender sky and pink clouds" />
        <figcaption>a little sky watching</figcaption>
      </figure>
      </div>
      <div className="reading-board-memories">
        <BoardCalendar />
        <div className="reading-calendar-keepsakes">
        <div className="reading-art-print reading-bouquet-print reading-hover-piece reading-paper-piece" tabIndex={0}><img src={lilyBouquet} alt="Pink lilies wrapped in lavender paper" /></div>

        <div className="reading-board-keychain reading-hover-piece" tabIndex={0} role="img" aria-label="A hanging lavender star keychain">
          <svg viewBox="0 0 100 130" fill="none" aria-hidden="true">
            <g stroke="var(--color-steel)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="50" cy="10" r="4" fill="var(--color-cream)" />
              <path d="M50 10v13q0 5 5 5" />
              <circle cx="54" cy="37" r="12" /><circle cx="54" cy="37" r="9" />
              <path d="M54 49v14" strokeDasharray="2 4" />
              <path d="m54 60 9 18 20 3-15 14 4 20-18-10-18 10 4-20-15-14 20-3Z" fill="var(--color-lavender)" />
              <path d="m50 79 3-7m13 15 5 1" stroke="var(--color-cream)" strokeWidth="3" />
              <path d="M43 48 28 65" /><rect x="9" y="61" width="26" height="34" rx="5" fill="var(--color-cream)" transform="rotate(15 22 78)" />
              <path d="m17 73 11 3m-12 3 9 3" />
            </g>
          </svg>
        </div>
        </div>
      </div>
      <div className="reading-board-photos reading-hover-piece" tabIndex={0} role="group" aria-label="Photo strip and purple flower sticker">
      <div className="reading-photo-strip reading-paper-piece" role="img" aria-label="A pastel photo strip of a cat in a flower meadow and two frogs by a pond">
        {[frogDock, catMeadow, frogPond].map(src => <img key={src} src={src} alt="" className="reading-strip-frame" />)}
        <span>little moments &#9825;</span>
      </div>
        <img className="reading-flower-sticker" src={purpleFlowers} alt="Purple flower bouquet sticker tied with a ribbon" />

      </div>
    </div>
    <nav className="reading-shelf-shortcuts" aria-label="Jump to a bookshelf">
      {sections.map(section => <button key={section.id} onClick={() => onChooseShelf(section.id)}><CollectionIcon name={section.icon} /><span>{section.id === "reading" ? "Reading" : section.id === "finished" ? "Finished" : section.title}</span><span className="reading-shortcut-count">{counts[section.id]}</span></button>)}
    </nav>
  </div>;
}
