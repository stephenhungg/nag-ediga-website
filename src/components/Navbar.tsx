import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface NavbarProps {
  triggerAnimation?: boolean;
}

const Navbar = ({ triggerAnimation = false }: NavbarProps) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (triggerAnimation && navRef.current) {
      // Start off-screen at top
      gsap.set(navRef.current, { y: -100, opacity: 0 });

      // Slide down animation
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.4, // After text starts fading in
        ease: 'power2.out',
      });
    }
  }, [triggerAnimation]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4 sm:px-6 lg:px-8"
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full px-6 py-3 transition-all duration-500 ease-out',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-elegant border border-california-gold/20'
            : 'bg-white/85 backdrop-blur-sm shadow-medium border border-california-gold/15'
        )}
      >
        <div className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'text-sm font-sans transition-all duration-300 ease-out relative px-4 py-2 rounded-full',
                activeSection === item.id
                  ? 'text-berkeley-blue font-medium bg-california-gold/20 shadow-subtle border border-california-gold/30'
                  : 'text-gray-600 hover:text-berkeley-blue hover:bg-california-gold/10 hover:border hover:border-california-gold/20'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden ml-2 text-gray-700 hover:text-berkeley-blue transition-all duration-300 hover:scale-110"
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-elegant border border-gray-200/60 py-2">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  'text-sm font-sans transition-all duration-300 ease-out text-left px-4 py-2 rounded-lg mx-1',
                  activeSection === item.id
                    ? 'text-berkeley-blue font-semibold bg-california-gold/20 border border-california-gold/30'
                    : 'text-gray-600 hover:text-berkeley-blue hover:bg-california-gold/10 hover:border hover:border-california-gold/20'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
