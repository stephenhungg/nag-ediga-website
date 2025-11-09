import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [blackFadeIn, setBlackFadeIn] = useState(false);
  const [backToWhite, setBackToWhite] = useState(false);

  useEffect(() => {
    // Start black fade-in from edges after a brief delay
    const blackTimer = setTimeout(() => {
      setBlackFadeIn(true);
    }, 200);

    // Then transition back to all white
    const whiteTimer = setTimeout(() => {
      setBackToWhite(true);
    }, 1400); // After black fade-in completes

    // Then fade out splash screen
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500); // Wait for fade-out animation
    }, 2500); // Show splash for 2.5 seconds

    return () => {
      clearTimeout(timer);
      clearTimeout(blackTimer);
      clearTimeout(whiteTimer);
    };
  }, [onComplete]);

  // Black overlay starts visible only at edges (large transparent center in mask), shrinks to 0% (all black)
  // Use mask with radial gradient: start with large transparent center (showing only edges), shrink to reveal all black
  const maskSize = blackFadeIn ? (backToWhite ? '0%' : '0%') : '85%';

  return (
    <div
      className={`fixed inset-0 z-50 bg-white transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Black fade-in from edges - expands inward like camera zoom-out */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          maskImage: `radial-gradient(circle, transparent ${maskSize}, black ${maskSize})`,
          WebkitMaskImage: `radial-gradient(circle, transparent ${maskSize}, black ${maskSize})`,
          opacity: backToWhite ? 0 : 1,
          transition: 'mask-image 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), -webkit-mask-image 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 500ms ease-out',
        }}
      />
    </div>
  );
};

export default SplashScreen;

