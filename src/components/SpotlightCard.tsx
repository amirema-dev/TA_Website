import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(59, 130, 246, 0.25)"
  key?: React.Key;
}

export default function SpotlightCard({
  children,
  className = '',
  glowColor = 'rgba(59, 130, 246, 0.2)',
  ...props
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-3xl p-[1px] overflow-hidden transition-all duration-300 ${className}`}
      {...props}
      style={{
        background: isHovered
          ? `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`
          : 'rgba(228, 228, 231, 0.6)', // zinc-200/60
      }}
    >
      {/* Inner main card container */}
      <div 
        className="relative w-full h-full bg-white rounded-[23px] p-5 flex flex-col justify-between transition-all duration-300"
        style={{
          backgroundImage: isHovered
            ? `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.025), transparent 80%)`
            : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
