import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import ProfessionalSide from './components/ProfessionalSide/ProfessionalSide';
import LoadBoundary from './components/LoadBoundary';

const PersonalSide = lazy(() => import('./components/PersonalSide/PersonalSide'));

function App() {
  const [isRoomOpen, setIsRoomOpen] = useState(() => window.location.hash === '#room');
  const [returnHref, setReturnHref] = useState('#home');
  const [isReturning, setIsReturning] = useState(false);
  const previousHash = useRef(window.location.hash);
  const portfolioPosition = useRef({ hash: '#home', top: 0 });
  const restorePosition = useRef(false);

  useEffect(() => {
    const updatePage = () => {
      const nextHash = window.location.hash;
      setIsReturning(previousHash.current === '#room' && nextHash !== '#room' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      if (nextHash === '#room' && previousHash.current !== '#room') {
        const anchorId = document.querySelector('#portfolio-nav-links a[aria-current="location"]')?.hash.slice(1);
        const anchor = anchorId ? document.getElementById(anchorId) : null;
        portfolioPosition.current = { hash: previousHash.current || '#home', top: window.scrollY, anchorId, anchorOffset: anchor?.getBoundingClientRect().top };
        setReturnHref(portfolioPosition.current.hash);
      }
      if (previousHash.current === '#room' && nextHash !== '#room') {
        restorePosition.current = nextHash === portfolioPosition.current.hash || (!nextHash && portfolioPosition.current.hash === '#home');
      }
      previousHash.current = nextHash;
      setIsRoomOpen(nextHash === '#room');
    };
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  useEffect(() => {
    if (isRoomOpen) window.scrollTo({ top: 0, behavior: 'instant' });
    else restorePosition.current = false;
  }, [isRoomOpen]);

  return (
    <main className={`app${isReturning ? ' is-returning' : ''}`} onAnimationEnd={event => {
      if (event.target === event.currentTarget && event.animationName === 'portfolio-return-reveal') setIsReturning(false);
    }}>
      <LoadBoundary key={isRoomOpen ? 'room' : 'portfolio'}>
        <Suspense fallback={<div className="page-loading" role="status">Opening the room… <a href={returnHref}>Back to portfolio</a></div>}>
          {isRoomOpen ? <PersonalSide returnHref={returnHref} /> : <ProfessionalSide savedPosition={restorePosition.current ? portfolioPosition.current : null} />}
        </Suspense>
      </LoadBoundary>
    </main>
  );
}

export default App;
