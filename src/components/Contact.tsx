import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedGrid from './AnimatedGrid';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('nagediga@berkeley.edu');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 py-24 overflow-hidden"
    >
      {/* Animated Grid Background */}
      <AnimatedGrid opacity={0.08} color="#003262" size={60} />

      <div
        className={cn(
          'relative z-10 max-w-4xl mx-auto w-full text-center transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        {/* Header */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-gray-900 mb-6 tracking-tight">
          <span className="italic">Contact</span>
        </h2>
        
        <div className="w-20 h-1.5 bg-berkeley-blue mx-auto mb-16 rounded-full"></div>

        {/* Contact Info */}
        <div className="space-y-12">
          {/* Email */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="mailto:nagediga@berkeley.edu"
              className="flex items-center gap-3 text-lg font-sans text-gray-700 hover:text-berkeley-blue transition-colors duration-300 group"
            >
              <svg
                className="w-6 h-6 transition-colors duration-300 group-hover:text-berkeley-blue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="font-normal">nagediga@berkeley.edu</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-full bg-berkeley-blue hover:bg-berkeley-blue/90 text-white transition-all duration-300"
              title="Copy email"
            >
              {copied ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-8">
            <a
              href="https://www.linkedin.com/in/nagediga/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-berkeley-blue transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
