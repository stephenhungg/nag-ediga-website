import { useEffect, useRef } from 'react';

interface AnimatedGridProps {
  className?: string;
  opacity?: number;
  color?: string;
  size?: number;
}

const AnimatedGrid = ({ 
  className = '', 
  opacity = 0.03,
  color = '#003262',
  size = 50
}: AnimatedGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offsetX = 0;
    let offsetY = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = opacity;

      // Draw vertical lines with offset
      for (let x = -size; x <= canvas.width + size; x += size) {
        const adjustedX = x + (offsetX % size);
        ctx.beginPath();
        ctx.moveTo(adjustedX, 0);
        ctx.lineTo(adjustedX, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines with offset
      for (let y = -size; y <= canvas.height + size; y += size) {
        const adjustedY = y + (offsetY % size);
        ctx.beginPath();
        ctx.moveTo(0, adjustedY);
        ctx.lineTo(canvas.width, adjustedY);
        ctx.stroke();
      }

      // Slow, subtle movement
      offsetX += 0.1;
      offsetY += 0.1;
    };

    const animate = () => {
      drawGrid();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial resize with a small delay to ensure parent is mounted
    setTimeout(() => {
      resizeCanvas();
    }, 0);
    
    window.addEventListener('resize', resizeCanvas);
    
    // Use ResizeObserver for parent container
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }
    
    // Start animation after initial setup
    setTimeout(() => {
      animate();
    }, 0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [color, opacity, size]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        zIndex: 0,
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  );
};

export default AnimatedGrid;

