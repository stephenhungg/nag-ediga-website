import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface ProjectModalProps {
  project: {
    id: string;
    title: string;
    description: string;
    img: string;
    images?: string[];
    category?: string;
    technologies?: string[];
    longDescription?: string;
    specifications?: {
      [key: string]: string;
    };
    process?: {
      step: string;
      description: string;
      image?: string;
    }[];
    links?: {
      label: string;
      url: string;
      icon?: 'github' | 'link' | 'download' | 'demo';
    }[];
  };
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = project.images && project.images.length > 0 ? project.images : [project.img];

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Animate modal in
    gsap.fromTo(
      '.modal-overlay',
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.modal-content',
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, delay: 0.1, ease: 'power2.out' }
    );

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    // Animate out before closing
    gsap.to('.modal-overlay', {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    });
    gsap.to('.modal-content', {
      scale: 0.95,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const getIconPath = (icon?: string) => {
    switch (icon) {
      case 'github':
        return 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z';
      case 'download':
        return 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z';
      case 'demo':
        return 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z';
      default:
        return 'M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3';
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="modal-content relative min-h-screen w-full bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - sticky */}
        <button
          onClick={handleClose}
          className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all duration-200 text-white"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image Gallery Section */}
        <div className="relative w-full h-[60vh] bg-black">
          {/* Main Image */}
          <img
            key={currentImageIndex}
            src={allImages[currentImageIndex]}
            alt={`${project.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Image Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

          {/* Title Overlay on Image */}
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div className="max-w-6xl mx-auto">
              {project.category && (
                <span className="inline-block px-4 py-1.5 text-sm font-medium text-white bg-berkeley-blue rounded-full mb-4">
                  {project.category}
                </span>
              )}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-3 tracking-tight">
                {project.title}
              </h2>
              <p className="text-xl text-gray-200 font-sans">
                {project.description}
              </p>
            </div>
          </div>

          {/* Navigation Arrows (only show if multiple images) */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all duration-200 text-white"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-all duration-200 text-white"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip (only show if multiple images) */}
        {allImages.length > 1 && (
          <div className="bg-gray-900 py-4 px-8 lg:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                      index === currentImageIndex
                        ? 'ring-4 ring-berkeley-blue scale-105'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="bg-white py-12 px-8 lg:px-12">
          <div className="max-w-6xl mx-auto space-y-12">

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-sm font-sans text-gray-700 bg-gray-100 rounded-full border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="w-24 h-1 bg-gradient-to-r from-berkeley-blue to-california-gold rounded-full" />

            {/* Long Description */}
            {project.longDescription && (
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">About This Project</h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {project.longDescription}
                  </p>
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            {project.specifications && Object.keys(project.specifications).length > 0 && (
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(project.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-gray-50 rounded-lg p-5 border border-gray-200"
                    >
                      <dt className="text-sm font-medium text-berkeley-blue uppercase tracking-wide mb-1">
                        {key}
                      </dt>
                      <dd className="text-lg font-sans text-gray-900">
                        {value}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Development Process */}
            {project.process && project.process.length > 0 && (
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Development Process</h3>
                <div className="space-y-6">
                  {project.process.map((step, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-berkeley-blue text-white flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                          {step.step}
                        </h4>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {step.description}
                        </p>
                        {step.image && (
                          <img
                            src={step.image}
                            alt={step.step}
                            className="w-full max-w-2xl rounded-lg shadow-medium"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links & Resources */}
            {project.links && project.links.length > 0 && (
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Links & Resources</h3>
                <div className="flex flex-wrap gap-4">
                  {project.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-berkeley-blue text-white rounded-lg hover:bg-berkeley-blue/90 transition-all duration-200 shadow-subtle hover:shadow-medium hover:scale-105 font-medium"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={getIconPath(link.icon)} />
                      </svg>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
