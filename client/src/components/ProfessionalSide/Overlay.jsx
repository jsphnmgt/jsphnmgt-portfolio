import { useEffect, useRef } from "react";
export default function Overlay({ isOpen, onClose, children, className = "", showCloseButton = true }) {
  const dialogRef = useRef(null);
  const backdropPressRef = useRef(false);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen) return;
    const trigger = document.activeElement;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [isOpen]);
  const isOutside = event => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  };
  return <dialog ref={dialogRef} className={`overlay-content ${className}`} aria-labelledby="detail-title" onCancel={event => { event.preventDefault(); onClose(); }} onPointerDown={event => { backdropPressRef.current = event.target === event.currentTarget && isOutside(event); }} onClick={event => {
    if (backdropPressRef.current && event.target === event.currentTarget && isOutside(event)) onClose();
    backdropPressRef.current = false;
  }}>
    {showCloseButton && <button className="overlay-close" onClick={onClose} aria-label="Close details">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m6.7 5.3 5.3 5.3 5.3-5.3 1.4 1.4-5.3 5.3 5.3 5.3-1.4 1.4-5.3-5.3-5.3 5.3-1.4-1.4 5.3-5.3-5.3-5.3z" /></svg>
    </button>}{children}
  </dialog>;
}
