import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { FloatingCircle, FloatingLine, GearFragment, DiagonalDivider } from './AbstractElements';
import AnimatedGrid from './AnimatedGrid';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 py-24 overflow-hidden abstract-pattern"
    >
      {/* Animated Grid Background */}
      <AnimatedGrid opacity={0.08} color="#003262" size={60} />
      
      {/* Abstract Background Elements */}
      <FloatingCircle 
        size={350} 
        position={{ top: '10%', left: '-8%' }} 
        rotation={30}
        opacity={0.06}
        color="#003262"
      />
      <FloatingLine 
        length={600} 
        position={{ top: '50%', right: '-5%' }} 
        rotation={35}
        opacity={0.1}
        color="#003262"
      />
      <GearFragment 
        size={100} 
        position={{ bottom: '15%', right: '8%' }} 
        rotation={25}
        opacity={0.05}
        color="#003262"
      />

      {/* Diagonal Divider at top */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <DiagonalDivider direction="right" color="#003262" opacity={0.15} />
      </div>

      <div
        className={cn(
          'relative z-10 max-w-7xl mx-auto w-full transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left side - Offset heading with photo */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24">
              {/* Oversized decorative number */}
              <div className="absolute -left-4 -top-4 text-[150px] lg:text-[200px] font-serif italic text-berkeley-blue/5 leading-none select-none">
                02
              </div>
              
              <h2 className="relative text-4xl sm:text-5xl font-serif font-medium text-gray-900 mb-6 tracking-tight">
                <span className="italic">About</span>
              </h2>
              
              <div className="w-20 h-1.5 bg-berkeley-blue mb-8 rounded-full"></div>
              
              {/* Photo placeholder - Profile/About photo */}
              <div className="relative mb-8 lg:mb-12">
                <div className="relative w-full aspect-square max-w-[300px] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-elegant border-2 border-gray-200/50">
                  <img
                    src="/images/headshot.jpg"
                    alt="Nag Ediga"
                    className="w-full h-full object-cover"
                  />
                  {/* Decorative overlay */}
                  <div className="absolute inset-0 bg-berkeley-blue/5 pointer-events-none"></div>
                </div>
                {/* Floating geometric accent */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-california-gold/30 rounded-full bg-white/80 backdrop-blur-sm hidden lg:block"></div>
              </div>
              
              {/* Rotated decorative text */}
              <div 
                className="hidden lg:block absolute top-32 -right-8 text-2xl font-serif italic text-berkeley-blue/8 select-none"
                style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
              >
                MECHANICAL
              </div>
            </div>
          </div>

          {/* Right side - Offset text blocks */}
          <div className="lg:col-span-8 lg:pl-8">
            <div className="space-y-10 text-lg sm:text-xl font-sans text-gray-700 leading-relaxed font-light">
              <p className="relative pl-8 border-l-2 border-california-gold/30">
                I am a <span className="font-medium text-berkeley-blue">mechanical engineering</span> student passionate about designing and building
                innovative solutions to complex problems. My work focuses on combining <span className="font-medium text-california-gold">theoretical
                knowledge</span> with <span className="font-medium text-berkeley-blue">practical applications</span> to create meaningful engineering solutions.
              </p>
              
              <p className="relative pl-8 border-l-2 border-california-gold/30">
                Through my studies and projects, I have developed expertise in <span className="font-medium text-berkeley-blue">CAD design</span>, <span className="font-medium text-california-gold">material
                science</span>, <span className="font-medium text-berkeley-blue">thermodynamics</span>, and <span className="font-medium text-california-gold">mechanical systems analysis</span>. I am constantly learning and
                exploring new technologies and methodologies in the field of mechanical engineering.
              </p>
              
              <p className="relative pl-8 border-l-2 border-california-gold/30">
                This portfolio showcases some of my recent projects and work, demonstrating my
                approach to <span className="font-medium text-berkeley-blue">problem-solving</span> and my commitment to <span className="font-medium text-california-gold">excellence</span> in engineering design.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal Divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <DiagonalDivider direction="left" color="#003262" opacity={0.15} />
      </div>
    </section>
  );
};

export default About;
