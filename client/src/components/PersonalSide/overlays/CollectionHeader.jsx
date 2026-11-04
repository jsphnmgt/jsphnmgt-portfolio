import CollectionIcon from "./CollectionIcon";

export default function CollectionHeader({ title, icon }) {
  return <header className="watchlist-header collection-header">
    <h2 id="detail-title"><CollectionIcon name={icon} />{title}</h2>
  </header>;
}
