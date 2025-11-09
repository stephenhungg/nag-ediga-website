import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LandingAnimationProps {
  onComplete: () => void;
}

const LandingAnimation = ({ onComplete }: LandingAnimationProps) => {
  const ballRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const blackAreaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ball = ballRef.current;
    const svg = svgRef.current;
    const blackArea = blackAreaRef.current;
    const content = contentRef.current;

    if (!ball || !svg || !blackArea || !content) return;

    const paths = svg.querySelectorAll('path');
    if (paths.length === 0) return;

    const timeline = gsap.timeline();

    // Set initial states
    gsap.set(ball, {
      scale: 0,
      opacity: 0,
    });

    paths.forEach((path) => {
      const pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 0,
      });
    });

    gsap.set(blackArea, {
      scale: 1,
      left: '50%',
      top: '50%',
      width: '100vw',
      height: '100vh',
      transform: 'translate(-50%, -50%)',
      position: 'fixed',
      opacity: 1,
    });

    gsap.set(content, {
      opacity: 0,
    });

    // Phase 1: Glowing ball appears and pulses
    timeline.to(ball, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    });

    timeline.to(ball, {
      scale: 1.2,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
    });

    // Phase 2: Ball unwinds into thread patterns
    timeline.to(ball, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    });

    // Animate each path sequentially to create swirling pattern
    paths.forEach((path, index) => {
      timeline.to(
        path,
        {
          opacity: 1,
          strokeDashoffset: 0,
          duration: 0.4,
          ease: 'power1.inOut',
        },
        index * 0.15
      );
    });

    // Phase 3: Zoom out to match Home section size - animate actual dimensions
    timeline.call(() => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Home section uses: width: 90vw (max 1200px), height: 70vh (min 500px, max 700px)
      let targetWidth = viewportWidth * 0.9;
      if (targetWidth > 1200) targetWidth = 1200;

      let targetHeight = viewportHeight * 0.7;
      if (targetHeight < 500) targetHeight = 500;
      if (targetHeight > 700) targetHeight = 700;

      // Animate to exact pixel dimensions and add rounded corners
      gsap.to(blackArea, {
        width: targetWidth,
        height: targetHeight,
        borderRadius: '24px', // rounded-3xl equivalent
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: () => {
          // Instant handoff to Home section
          onComplete();
        }
      });
    });

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100]">
      {/* White background overlay - only during animation */}
      <div
        className="fixed inset-0 bg-white z-40 overflow-hidden pointer-events-none"
      />

      {/* Black area that will zoom out and become main content */}
      {/* Always render - will be moved to Home section after animation */}
      <div
        ref={blackAreaRef}
        data-black-box
        className="bg-black flex items-center justify-center overflow-hidden shadow-elegant fixed z-50"
        style={{
          transformOrigin: 'center center',
          left: '50%',
          top: '50%',
          width: '100vw',
          height: '100vh',
          transform: 'translate(-50%, -50%)',
          borderRadius: '0px', // Start with no rounded corners
        }}
      >
        {/* SVG for thread animation with swirling patterns */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Swirling thread pattern 1 */}
          <path
            d="M 500 500 Q 300 300 200 500 T 500 700 T 800 500 T 500 300 T 200 500"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
          {/* Swirling thread pattern 2 */}
          <path
            d="M 500 500 Q 400 200 600 300 T 700 500 T 600 700 T 400 600 T 300 500 T 400 400 T 500 500"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
          {/* Swirling thread pattern 3 */}
          <path
            d="M 500 500 Q 700 300 600 500 T 500 600 T 400 500 T 500 400 T 600 500 T 500 500"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
        </svg>

        {/* Glowing ball */}
        <div
          ref={ballRef}
          className="absolute w-6 h-6 rounded-full bg-white pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow:
              '0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.5)',
          }}
        />

        {/* Content overlay - Text fades in after zoom */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="text-center max-w-4xl mx-auto px-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium text-white mb-8 tracking-tight">
              <span className="italic">Mechanical</span>{' '}
              <span className="block mt-2">Engineering</span>
            </h1>

            <p className="text-xl sm:text-2xl font-serif italic text-gray-200 mb-10 font-light tracking-wide">
              Student Portfolio
            </p>

            <div className="w-32 h-1.5 bg-california-gold/50 mx-auto mb-12 rounded-full"></div>

            <p className="text-lg sm:text-xl font-sans text-gray-300 leading-relaxed font-light">
              Exploring the intersection of{' '}
              <span className="font-medium text-white">design</span>,{' '}
              <span className="font-medium text-california-gold">engineering</span>, and{' '}
              <span className="font-medium text-white">innovation</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingAnimation;

