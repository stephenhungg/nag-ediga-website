import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  title?: string;
  description?: string;
  longDescription?: string;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  expandedProject?: string | null;
  onProjectClick?: (id: string) => void;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  expandedProject = null,
  onProjectClick
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 20;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map(child => {
      const isExpanded = expandedProject === child.id;
      
      // Expanded cards span 2 columns, normal cards span 1
      const colsToSpan = isExpanded ? 2 : 1;
      
      // Find the best column position
      let col = 0;
      if (isExpanded && colsToSpan > 1) {
        // For expanded cards, find the column with minimum height that has space for 2 columns
        let minHeight = Infinity;
        let bestCol = 0;
        for (let c = 0; c <= columns - colsToSpan; c++) {
          const maxHeight = Math.max(...Array.from({ length: colsToSpan }, (_, j) => colHeights[c + j]));
          if (maxHeight < minHeight) {
            minHeight = maxHeight;
            bestCol = c;
          }
        }
        col = bestCol;
      } else {
        col = colHeights.indexOf(Math.min(...colHeights));
      }
      
      const cardWidth = columnWidth * colsToSpan + gap * (colsToSpan - 1);
      
      // Increase base height to reduce white space (use more of the original height)
      const baseHeight = child.height * 0.75; // Increased from 0.5 to 0.75
      // Increase height if this card is expanded, but cap at reasonable max
      // Use a fixed max height to prevent overflow into other sections
      const maxExpandedHeight = 500; // Maximum height for expanded cards (500px)
      const expandedHeight = baseHeight * 1.8; // Reduced from 2.0 to 1.8
      const height = isExpanded ? Math.min(expandedHeight, maxExpandedHeight) : baseHeight;
      
      const x = col * (columnWidth + gap);
      // For expanded cards, use the maximum height of the columns it spans
      const y = isExpanded && colsToSpan > 1 
        ? Math.max(...Array.from({ length: colsToSpan }, (_, i) => colHeights[col + i]))
        : colHeights[col];

      // Update heights for all columns this card spans
      for (let i = 0; i < colsToSpan && col + i < columns; i++) {
        colHeights[col + i] = y + height + gap;
      }
      
      return { ...child, x, y, w: cardWidth, h: height };
    });
  }, [columns, items, width, expandedProject]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { 
        x: item.x, 
        y: item.y, 
        width: item.w, 
        height: item.h 
      };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' })
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        const isExpanded = expandedProject === item.id;
        gsap.to(selector, {
          ...animProps,
          duration: isExpanded ? 0.6 : duration,
          ease: isExpanded ? 'power2.out' : ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, expandedProject]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  const handleCardClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling to container
    if (onProjectClick) {
      onProjectClick(id);
    }
  };

  const handleContainerClick = () => {
    // Close expanded project when clicking outside cards
    if (expandedProject && onProjectClick) {
      onProjectClick(expandedProject);
    }
  };

  // Calculate container height based on grid
  const containerHeight = useMemo(() => {
    if (grid.length === 0) return 800;
    const maxY = Math.max(...grid.map(item => item.y + item.h));
    return Math.max(maxY + 40, 800); // Add padding, minimum 800px
  }, [grid]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full overflow-hidden" 
      style={{ minHeight: `${containerHeight}px` }}
      onClick={handleContainerClick}
    >
      {grid.map(item => {
        const isExpanded = expandedProject === item.id;
        
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="absolute box-content cursor-pointer"
            style={{ willChange: 'transform, width, height, opacity' }}
            onClick={(e) => handleCardClick(item.id, e)}
            onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
            onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
          >
            <div
              className={`relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-300 border-2 ${
                isExpanded 
                  ? 'shadow-2xl border-california-gold/50' 
                  : 'border-transparent hover:border-california-gold/30'
              }`}
              style={{ backgroundImage: `url(${item.img})` }}
            >
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/60" />
              {/* Gold accent overlay on hover/expand */}
              {isExpanded && (
                <div className="absolute inset-0 bg-california-gold/10 pointer-events-none" />
              )}
              
              {/* Title overlay */}
              {item.title && (
                <div className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
                  isExpanded ? 'p-6' : 'p-4'
                }`}>
                  <h3 className="text-xl font-serif font-medium text-white mb-2">
                    {item.title}
                  </h3>
                  
                  {/* Description - always visible when not expanded */}
                  {item.description && !isExpanded && (
                    <p className="text-sm font-sans text-gray-200 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  
                  {/* Expanded content */}
                  {isExpanded && item.longDescription && (
                    <div 
                      className="mt-3 space-y-3"
                      style={{
                        animation: 'fadeIn 0.5s ease-out',
                      }}
                    >
                      <p className="text-sm font-sans text-white leading-relaxed">
                        {item.longDescription}
                      </p>
                      {item.description && (
                        <p className="text-xs font-sans text-gray-300 italic border-t border-white/20 pt-3">
                          {item.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {colorShiftOnHover && (
                <div className="color-overlay absolute inset-0 rounded-[10px] bg-california-gold/50 opacity-0 pointer-events-none" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;

