import { Component } from "react";
import Overlay from "./ProfessionalSide/Overlay";

export default class LoadBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError?.(); }
  render() {
    if (!this.state.failed) return this.props.children;
    const message = <div className="load-error" role="alert">
      <p>This view couldn't load. Please reload the page to try again.</p>
      <button onClick={() => window.location.reload()}>Reload page</button>
      {this.props.onDismiss ? <button onClick={this.props.onDismiss}>Back to room</button> : <a href="#home">Back to portfolio</a>}
    </div>;
    return this.props.onDismiss ? <Overlay isOpen onClose={this.props.onDismiss}><h2 id="detail-title">Collection unavailable</h2>{message}</Overlay> : message;
  }
}
