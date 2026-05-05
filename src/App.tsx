import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import LandingAnimation from './components/LandingAnimation';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

type Page = 'home' | 'gallery';

const getCurrentPage = (): Page => (window.location.pathname === '/gallery' ? 'gallery' : 'home');

function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage);
  const [animationComplete, setAnimationComplete] = useState(() => getCurrentPage() === 'gallery');
  const [showContent, setShowContent] = useState(() => getCurrentPage() === 'gallery');

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

  return (
    <div className="min-h-screen bg-white">
      {/* Main content - always rendered, underneath animation initially */}
      <div className={showContent ? '' : 'invisible'}>
        <Navbar
          triggerAnimation={showContent}
          currentPage={currentPage}
          onNavigate={navigateToPage}
        />
        <main className="scroll-smooth">
          {currentPage === 'gallery' ? (
            <Gallery />
          ) : (
            <>
              <Home triggerAnimation={showContent} />
              <About />
              <Projects />
              <Contact />
            </>
          )}
        </main>
      </div>

      {/* Landing animation - overlays content initially, then unmounts */}
      {currentPage === 'home' && !animationComplete && (
        <LandingAnimation
          onComplete={() => {
            setAnimationComplete(true);
            setShowContent(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
