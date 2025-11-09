import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import AnimatedThreads from './AnimatedThreads';
import AnimatedGrid from './AnimatedGrid';

interface HomeProps {
  triggerAnimation?: boolean;
}

const Home = ({ triggerAnimation = false }: HomeProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerAnimation && contentRef.current) {
      // Start invisible
      gsap.set(contentRef.current, { opacity: 0 });

      // Fade in text content
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 1,
        delay: 0.2, // Small delay after handoff
        ease: 'power2.out',
      });
    }
  }, [triggerAnimation]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-white py-20"
    >
      {/* Animated Grid Background */}
      <AnimatedGrid opacity={0.08} color="#003262" size={60} />
      {/* Black box container - fixed size for perfect animation match */}
      <div
        data-home-container
        className="relative bg-black rounded-3xl overflow-hidden shadow-elegant"
        style={{
          width: '90vw',
          maxWidth: '1200px',
          height: '70vh',
          minHeight: '500px',
          maxHeight: '700px',
        }}
      >
        {/* Animated Threads Background */}
        <AnimatedThreads
          enableMouseInteraction={true}
          rotationSpeed={0.05}
        />

        {/* Content overlay */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          <div className="text-center max-w-4xl mx-auto px-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium text-white mb-8 tracking-tight">
              <span>Nag Ediga</span>
              <div className="text-3xl sm:text-4xl lg:text-5xl mt-2 font-light">
                Mechanical Engineering at{' '}
                <span className="italic">UC Berkeley</span>
              </div>
            </h1>

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
    </section>
  );
};

export default Home;
