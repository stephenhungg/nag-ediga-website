import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedGrid from './AnimatedGrid';
import { DiagonalDivider, FloatingCircle, FloatingLine, GearFragment } from './AbstractElements';

interface GalleryImage {
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { src: '/images/03788DB0-C3A7-4054-9BDE-9B97E8E64079_4_5005_c.jpeg', alt: 'Project photo' },
  { src: '/images/817AAB06-774F-4F8A-BD4D-21DF53B4A1E6_4_5005_c.jpeg', alt: 'Project photo' },
  { src: '/images/Componentsinbox.jpg', alt: 'Components in box' },
  { src: '/images/graphofHHresults.png', alt: 'Helping Hand results graph' },
  { src: '/images/headphone-mount-how-built.png', alt: 'Headphone mount build process' },
  { src: '/images/headshot.jpg', alt: 'Headshot' },
  { src: '/images/How I built it.png', alt: 'Build process' },
  { src: '/images/IMG_0078.jpg', alt: 'Project and team photo' },
  { src: '/images/IMG_0211.jpg', alt: 'Project photo' },
  { src: '/images/IMG_0223.jpg', alt: 'Portrait photo' },
  { src: '/images/IMG_2397.JPG', alt: 'Vending machine prototype' },
  { src: '/images/IMG_2413.JPG', alt: 'Vending machine assembly' },
  { src: '/images/IMG_2479.jpg', alt: 'Helping Hand prototype' },
  { src: '/images/IMG_7839.jpg', alt: 'Bias lighting PCB' },
  { src: '/images/IMG_8184.JPG', alt: 'Wind turbine test setup' },
  { src: '/images/IMG_9115.jpg', alt: 'Campanile PCB' },
  { src: '/images/IMG_9117.jpg', alt: 'USB charger PCB' },
  { src: '/images/IMG_9552.jpg', alt: 'USV assembly' },
  { src: '/images/IMG_9556.jpg', alt: 'USV electronics' },
  { src: '/images/IMG_9630.JPG', alt: 'Vending machine structure' },
  { src: '/images/IMG_9867.jpg', alt: 'USV build photo' },
  { src: '/images/IMG_9869.jpg', alt: 'USV build photo' },
  { src: '/images/learning-soldering.jpg', alt: 'Learning soldering' },
  { src: '/images/Otherchildren.jpg', alt: 'Helping Hand user testing' },
  { src: '/images/Overviewpic.png', alt: 'Headphone desk mount overview' },
  { src: '/images/testing-helping-hand.png', alt: 'Testing Helping Hand' },
  { src: '/images/USBcharger_3dmodel.png', alt: 'USB charger 3D model' },
  { src: '/images/USBcharger_layout.png', alt: 'USB charger PCB layout' },
  { src: '/images/USBcharger_Schematic.png', alt: 'USB charger schematic' },
  { src: '/images/USV.jpg', alt: 'Unmanned surface vehicle' },
  { src: '/images/waypointmission.png', alt: 'Waypoint mission' },
  { src: '/images/WheelCenter_displacement.png', alt: 'Wheel center displacement plot' },
  { src: '/images/WheelCenter_FOS.png', alt: 'Wheel center factor of safety plot' },
  { src: '/images/WheelCenter_StressPlot.png', alt: 'Wheel center stress plot' },
  { src: '/images/WheelCenterDrawing.png', alt: 'Wheel center drawing' },
  { src: '/images/WheelCenterpic_1.png', alt: 'Wheel center render' },
  { src: '/images/WheelCenterpic_2.png', alt: 'Wheel center detail render' },
  { src: '/images/wind-turbine-test-1.jpg', alt: 'Wind turbine test' },
  { src: '/images/wind-turbine-test-2.jpg', alt: 'Wind turbine test' },
  { src: '/images/WindTurbine.png', alt: 'Wind turbine model' },
  { src: '/images/Windturbine_CFD.png', alt: 'Wind turbine CFD plot' },
  { src: '/images/windturbineFEA.png', alt: 'Wind turbine FEA plot' },
  { src: '/images/windturbineirl.png', alt: 'Wind turbine prototype' },
];

const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08 }
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

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-24 overflow-hidden abstract-pattern"
    >
      <AnimatedGrid opacity={0.07} color="#003262" size={60} />

      <FloatingCircle
        size={380}
        position={{ top: '8%', right: '-6%' }}
        rotation={20}
        opacity={0.06}
        color="#003262"
      />
      <FloatingLine
        length={620}
        position={{ bottom: '18%', left: '-10%' }}
        rotation={28}
        opacity={0.08}
        color="#003262"
      />
      <GearFragment
        size={120}
        position={{ top: '18%', left: '7%' }}
        rotation={18}
        opacity={0.05}
        color="#FDB515"
      />

      <div className="absolute top-0 left-0 right-0 z-0">
        <DiagonalDivider direction="left" color="#003262" opacity={0.12} />
      </div>

      <div
        className={cn(
          'relative z-10 max-w-7xl mx-auto transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}
      >
        <div className="relative mb-16">
          <div className="absolute -left-8 -top-8 lg:-left-16 lg:-top-12 text-[220px] lg:text-[320px] font-serif italic text-berkeley-blue/5 leading-none select-none z-0">
            04
          </div>

          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-gray-900 mb-6 tracking-tight">
              <span className="italic">Gallery</span>
            </h2>
            <div className="w-20 h-1.5 bg-berkeley-blue mb-8 rounded-full"></div>
            <p className="text-lg sm:text-xl font-sans text-gray-700 font-light">
              A full visual archive of builds, prototypes, tests, and engineering details.
            </p>
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 [column-fill:_balance]">
          {galleryImages.map((image) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setSelectedImage(image)}
              className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-lg border border-gray-200/70 bg-white p-0 text-left shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant focus:outline-none focus:ring-2 focus:ring-berkeley-blue/40"
              aria-label={`Open ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-0">
        <DiagonalDivider direction="right" color="#003262" opacity={0.12} />
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt}
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[86vh] w-auto max-w-full rounded-lg object-contain shadow-elegant"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white text-gray-900 shadow-medium transition-all duration-300 hover:scale-105 hover:bg-california-gold focus:outline-none focus:ring-2 focus:ring-white/80"
              aria-label="Close gallery image"
            >
              <span className="text-xl leading-none">&times;</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
