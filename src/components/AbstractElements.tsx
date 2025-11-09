import { cn } from '@/lib/utils';

interface FloatingShapeProps {
  className?: string;
  size?: number;
  color?: string;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  rotation?: number;
  opacity?: number;
}

export const FloatingCircle = ({ 
  className, 
  size = 200, 
  color = '#003262',
  position = { top: '10%', right: '10%' },
  rotation = 0,
  opacity = 0.1
}: FloatingShapeProps & { color?: string }) => {
  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
        transform: `rotate(${rotation}deg)`,
        opacity,
      }}
    >
      <div 
        className="w-full h-full rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${color}33, ${color}0D)`,
        }}
      />
    </div>
  );
};

export const FloatingLine = ({
  className,
  length = 300,
  width = 2,
  color = '#003262',
  position = { top: '20%', left: '5%' },
  rotation = 45,
  opacity = 0.15
}: FloatingShapeProps & { length?: number; width?: number; color?: string }) => {
  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{
        width: `${length}px`,
        height: `${width}px`,
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
        transform: `rotate(${rotation}deg)`,
        opacity,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      }}
    />
  );
};

export const GearFragment = ({
  className,
  size = 100,
  position = { top: '15%', left: '8%' },
  rotation = 0,
  opacity = 0.08,
  color = '#003262'
}: FloatingShapeProps & { color?: string }) => {
  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
        transform: `rotate(${rotation}deg)`,
        opacity,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 10 L58 25 L75 25 L62 38 L70 55 L50 47 L30 55 L38 38 L25 25 L42 25 Z"
          fill={color}
          stroke={color}
          strokeWidth="1"
        />
        <circle cx="50" cy="50" r="15" fill="none" stroke={color} strokeWidth="1" />
      </svg>
    </div>
  );
};

export const DiagonalDivider = ({ 
  className,
  direction = 'right',
  color = '#003262',
  opacity = 0.2
}: { className?: string; direction?: 'left' | 'right'; color?: string; opacity?: number }) => {
  const rotation = direction === 'right' ? 2 : -2;
  return (
    <div
      className={cn('w-full h-px overflow-hidden', className)}
      style={{ opacity }}
    >
      <div
        className="w-full h-full"
        style={{ 
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          transform: `rotate(${rotation}deg)`, 
          transformOrigin: 'center' 
        }}
      />
    </div>
  );
};

