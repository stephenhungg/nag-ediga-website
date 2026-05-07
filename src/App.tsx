import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import Navbar from './components/Navbar';
import LandingAnimation from './components/LandingAnimation';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

type Page = 'home' | 'gallery';

const getCurrentPage = (): Page => (window.location.pathname === '/gallery' ? 'gallery' : 'home');

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

if (window.location.pathname !== '/gallery' && window.location.hash) {
  window.history.replaceState({}, '', window.location.pathname);
  window.scrollTo(0, 0);
}

function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage);
  const [animationComplete, setAnimationComplete] = useState(() => getCurrentPage() === 'gallery');
  const [showContent, setShowContent] = useState(() => getCurrentPage() === 'gallery');

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (currentPage === 'home') {
      window.scrollTo(0, 0);

      if (window.location.hash) {
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== 'home') return;

    const clearHashAndScrollTop = () => {
      if (window.location.hash) {
        window.history.replaceState({}, '', window.location.pathname);
      }
      window.scrollTo(0, 0);
    };

    clearHashAndScrollTop();
    window.addEventListener('hashchange', clearHashAndScrollTop);

    return () => window.removeEventListener('hashchange', clearHashAndScrollTop);
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== 'home' || animationComplete) return;

    const scrollLock = window.setInterval(() => {
      window.scrollTo(0, 0);
    }, 50);

    return () => window.clearInterval(scrollLock);
  }, [animationComplete, currentPage]);

  useEffect(() => {
    const handlePopState = () => {
      const nextPage = getCurrentPage();
      setCurrentPage(nextPage);
      setAnimationComplete(true);
      setShowContent(true);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPage = (page: Page, sectionId?: string) => {
    const path = page === 'gallery' ? '/gallery' : '/';

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }

    setCurrentPage(page);
    setAnimationComplete(true);
    setShowContent(true);

    window.requestAnimationFrame(() => {
      if (sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  const handleIntroHandoffStart = useCallback(() => {
    window.scrollTo(0, 0);
    setShowContent(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    window.scrollTo(0, 0);
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
    window.setTimeout(() => window.scrollTo(0, 0), 50);
    setAnimationComplete(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Main content - always rendered, underneath animation initially */}
      <div className={showContent ? '' : 'invisible'}>
        <Navbar
          triggerAnimation={animationComplete || currentPage === 'gallery'}
          currentPage={currentPage}
          onNavigate={navigateToPage}
        />
        <main className="scroll-smooth">
          {currentPage === 'gallery' ? (
            <Gallery />
          ) : (
            <>
              <Home triggerAnimation={animationComplete} />
              <About />
              <Experience />
              <Projects />
              <Contact />
            </>
          )}
        </main>
      </div>

      {/* Landing animation - overlays content initially, then unmounts */}
      {currentPage === 'home' && !animationComplete && (
        <LandingAnimation
          onHandoffStart={handleIntroHandoffStart}
          onComplete={handleIntroComplete}
        />
      )}
    </div>
  );
}

export default App;
