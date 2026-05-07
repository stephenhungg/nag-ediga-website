import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedGrid from './AnimatedGrid';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );
    const section = sectionRef.current;

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-white px-4 sm:px-6 lg:px-8 py-24 overflow-hidden"
    >
      <AnimatedGrid opacity={0.06} color="#003262" size={60} />

      <div
        className={cn(
          'relative z-10 max-w-6xl mx-auto transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="mb-10 border-b border-gray-200 pb-5">
          <p className="text-sm font-sans font-semibold uppercase tracking-[0.18em] text-berkeley-blue">
            Professional Experience
          </p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-serif font-medium text-gray-950 tracking-tight">
            Industry Work
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group grid w-full grid-cols-1 overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant focus:outline-none focus:ring-2 focus:ring-berkeley-blue/50 lg:grid-cols-[0.9fr_1.4fr]"
          aria-label="Manufacturing Engineering Intern at Battelle"
        >
          <div className="min-h-[260px] bg-berkeley-blue">
            <img
              src="/images/Battelle_Logo.jpg"
              alt="Battelle"
              className="h-full min-h-[260px] w-full object-cover"
            />
          </div>

          <div className="flex min-h-[260px] flex-col justify-center p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-california-gold/20 px-4 py-1.5 text-sm font-sans font-semibold text-berkeley-blue">
                Summer 2026
              </span>
              <span className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-sans font-medium text-gray-700">
                Incoming
              </span>
            </div>

            <h3 className="mt-6 text-3xl sm:text-4xl font-serif font-medium text-gray-950">
              Manufacturing Engineering Intern
            </h3>
            <p className="mt-2 text-lg font-sans font-medium text-berkeley-blue">
              Battelle, National Security Department
            </p>
            <p className="mt-6 max-w-2xl text-lg font-sans font-light leading-relaxed text-gray-700">
              Coming Soon! I will be joining Battelle as a Manufacturing Engineering Intern in the National Security department during Summer 2026.
            </p>
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Battelle experience details"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-elegant"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition-all duration-200 hover:bg-black"
              aria-label="Close Battelle experience details"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="bg-berkeley-blue text-white">
              <img
                src="/images/Battelle_Logo.jpg"
                alt="Battelle"
                className="h-64 w-full object-cover"
              />
              <div className="px-8 py-10">
                <p className="text-sm font-sans font-semibold uppercase tracking-[0.22em] text-california-gold">
                  Summer 2026
                </p>
                <h3 className="mt-4 text-4xl sm:text-5xl font-serif font-medium">
                  Manufacturing Engineering Intern
                </h3>
                <p className="mt-3 text-lg font-sans text-white/85">
                  National Security Department
                </p>
              </div>
            </div>

            <div className="px-8 py-10">
              <h4 className="text-2xl font-serif font-medium text-gray-950">
                Coming Soon!
              </h4>
              <p className="mt-4 text-lg font-sans font-light leading-relaxed text-gray-700">
                I will be joining Battelle as a Manufacturing Engineering Intern in the National Security department during Summer 2026. More details will be added once the internship begins.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;
