import { useState } from 'react';
import Navbar from './components/Navbar';
import LandingAnimation from './components/LandingAnimation';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Main content - always rendered, underneath animation initially */}
      <div className={showContent ? '' : 'invisible'}>
        <Navbar triggerAnimation={showContent} />
        <main className="scroll-smooth">
          <Home triggerAnimation={showContent} />
          <About />
          <Projects />
          <Contact />
        </main>
      </div>

      {/* Landing animation - overlays content initially, then unmounts */}
      {!animationComplete && (
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
