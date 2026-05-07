import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LandingAnimationProps {
  onComplete: () => void;
  onHandoffStart?: () => void;
}

const LandingAnimation = ({ onComplete, onHandoffStart }: LandingAnimationProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const blackAreaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ball = ballRef.current;
    const svg = svgRef.current;
    const overlay = overlayRef.current;
    const blackArea = blackAreaRef.current;
    const content = contentRef.current;

    if (!ball || !svg || !overlay || !blackArea || !content) return;

    const paths = svg.querySelectorAll('path');
    if (paths.length === 0) return;

    const timeline = gsap.timeline();

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

    gsap.set([overlay, svg], {
      opacity: 1,
    });

    gsap.set(content, {
      opacity: 0,
    });

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

    timeline.to(ball, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    });

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

    timeline.call(() => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let targetWidth = viewportWidth * 0.9;
      if (targetWidth > 1200) targetWidth = 1200;

      let targetHeight = viewportHeight * 0.7;
      if (targetHeight < 500) targetHeight = 500;
      if (targetHeight > 700) targetHeight = 700;

      onHandoffStart?.();

      gsap.to([svg, ball, content], {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.to(blackArea, {
        width: targetWidth,
        height: targetHeight,
        borderRadius: '24px',
        duration: 0.9,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.45,
            ease: 'power2.out',
            onComplete,
          });
        },
      });
    });

    return () => {
      timeline.kill();
    };
  }, [onComplete, onHandoffStart]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100]">
      <div className="fixed inset-0 z-40 overflow-hidden bg-white pointer-events-none" />

      <div
        ref={blackAreaRef}
        data-black-box
        className="fixed z-50 flex items-center justify-center overflow-hidden bg-black shadow-elegant"
        style={{
          transformOrigin: 'center center',
          left: '50%',
          top: '50%',
          width: '100vw',
          height: '100vh',
          transform: 'translate(-50%, -50%)',
          borderRadius: '0px',
        }}
      >
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 500 500 Q 300 300 200 500 T 500 700 T 800 500 T 500 300 T 200 500"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
          <path
            d="M 500 500 Q 400 200 600 300 T 700 500 T 600 700 T 400 600 T 300 500 T 400 400 T 500 500"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0"
          />
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

        <div
          ref={contentRef}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
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
