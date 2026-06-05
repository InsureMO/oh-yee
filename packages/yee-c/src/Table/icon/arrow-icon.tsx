import React from 'react';

const TriangleArrow = ({
  direction = 'down',
  className,
  size = 10,
  ...props
}: {
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  size?: number;
} & React.SVGProps<SVGSVGElement>) => {
  const rotation: Record<string, number> = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  };
  const deg = rotation[direction] ?? 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={{ transform: `rotate(${deg}deg)` }}
      {...props}
    >
      <path d="M5 3v18l14-9z" />
    </svg>
  );
};

export default TriangleArrow;
