import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedThreadsProps {
  enableMouseInteraction?: boolean;
  rotationSpeed?: number;
}

const AnimatedThreads = ({
  enableMouseInteraction = true,
  rotationSpeed = 0.05
}: AnimatedThreadsProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    const paths = svg.querySelectorAll('path');

    // Continuous rotation animation
    const rotationTimeline = gsap.to(svg, {
      rotation: 360,
      duration: 120 / rotationSpeed,
      ease: 'none',
      repeat: -1,
    });

    // Add organic floating animations to each path
    paths.forEach((path, index) => {
      // Floating Y motion (different for each path)
      gsap.to(path, {
        y: `+=${15 + index * 5}`,
        duration: 3 + index * 0.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Floating X motion (slightly different timing)
      gsap.to(path, {
        x: `+=${10 + index * 3}`,
        duration: 4 + index * 0.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.2,
      });

      // Subtle scale pulsing
      gsap.to(path, {
        scale: 1.05 + index * 0.02,
        duration: 5 + index * 0.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        transformOrigin: 'center center',
        delay: index * 0.15,
      });

      // Opacity breathing
      gsap.to(path, {
        opacity: 0.8,
        duration: 4 + index * 0.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.1,
      });
    });

    // Mouse interaction
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseInteraction) return;
      const rect = container.getBoundingClientRect();
      targetMouse.current.x = (e.clientX - rect.left) / rect.width;
      targetMouse.current.y = (e.clientY - rect.top) / rect.height;
    };

    const handleMouseLeave = () => {
      targetMouse.current = { x: 0.5, y: 0.5 };
    };

    const updateMouseInteraction = () => {
      // Faster, smoother mouse following
      const smoothing = 0.12;
      mousePos.current.x += smoothing * (targetMouse.current.x - mousePos.current.x);
      mousePos.current.y += smoothing * (targetMouse.current.y - mousePos.current.y);

      // Apply stronger parallax/distortion effect to each path
      const offsetX = (mousePos.current.x - 0.5) * 70;
      const offsetY = (mousePos.current.y - 0.5) * 70;

      paths.forEach((path, index) => {
        const depth = (index + 1) / paths.length;
        const extraDepth = 0.5 + depth * 1.5; // More dramatic depth effect
        gsap.set(path, {
          x: `+=${offsetX * extraDepth}`,
          y: `+=${offsetY * extraDepth}`,
        });
      });

      animationFrameId = requestAnimationFrame(updateMouseInteraction);
    };

    if (enableMouseInteraction) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    animationFrameId = requestAnimationFrame(updateMouseInteraction);

    return () => {
      rotationTimeline.kill();
      if (enableMouseInteraction) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      gsap.killTweensOf(paths);
    };
  }, [enableMouseInteraction, rotationSpeed]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto">
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        style={{
          transformOrigin: 'center center',
        }}
      >
        {/* Swirling thread pattern 1 */}
        <path
          d="M 500 500 Q 300 300 200 500 T 500 700 T 800 500 T 500 300 T 200 500"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        {/* Swirling thread pattern 2 */}
        <path
          d="M 500 500 Q 400 200 600 300 T 700 500 T 600 700 T 400 600 T 300 500 T 400 400 T 500 500"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        {/* Swirling thread pattern 3 */}
        <path
          d="M 500 500 Q 700 300 600 500 T 500 600 T 400 500 T 500 400 T 600 500 T 500 500"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        {/* Additional thread patterns for more complexity */}
        <path
          d="M 500 500 Q 350 400 300 500 T 500 650 T 700 500 T 500 350"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />
        <path
          d="M 500 500 Q 600 350 650 500 T 500 650 T 350 500 T 500 350"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

export default AnimatedThreads;
