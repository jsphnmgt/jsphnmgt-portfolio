import { assets } from "../../assets";

export default function RoomInvitation() {
  return <aside className="room-invitation" aria-labelledby="room-invitation-title">
    <img src={assets["room.jpg"]} alt="" loading="lazy" decoding="async" />
    <div className="room-invitation-copy">
      <p className="chapter-label"><span aria-hidden="true">✦</span> Beyond the work</p>
      <h2 id="room-invitation-title">Off the clock.<br /><em>Into my world.</em></h2>
      <p>Stories, soundtracks, games, and the little things that inspire me. There's another side to this portfolio.</p>
      <a className="creative-button hero-cv-button" href="#room">Step inside my room <span aria-hidden="true">↗</span></a>
    </div>
    <span className="room-invitation-caption" aria-hidden="true">a small corner of my universe</span>
  </aside>;
}
