import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [outlinePos, setOutlinePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const handleHoverCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('.group') ||
          target.closest('.cursor-pointer') ||
          target.closest('input') ||
          target.closest('textarea'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', handleHoverCheck);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleHoverCheck);
    };
  }, [isVisible]);

  // Smooth lag for outer cursor circle
  useEffect(() => {
    let animId: number;
    const follow = () => {
      setOutlinePos(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animId);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner solid dot */}
      <div
        className="cursor-dot hidden md:block"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`
        }}
      />
      {/* Outer reactive ring */}
      <div
        className={`cursor-outline hidden md:block ${isHovered ? 'hovered' : ''}`}
        style={{
          left: `${outlinePos.x}px`,
          top: `${outlinePos.y}px`
        }}
      />
    </>
  );
};
