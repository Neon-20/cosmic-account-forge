
import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
}

const StarBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stars = useRef<Star[]>([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Generate random stars
    const starCount = Math.floor((width * height) / 10000);
    const newStars: Star[] = [];
    
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        animationDelay: Math.random() * 4
      });
    }
    
    stars.current = newStars;
    
    // Create star elements
    container.innerHTML = '';
    newStars.forEach(star => {
      const starElement = document.createElement('div');
      starElement.className = 'cosmic-star animate-twinkle';
      starElement.style.left = `${star.x}px`;
      starElement.style.top = `${star.y}px`;
      starElement.style.width = `${star.size}px`;
      starElement.style.height = `${star.size}px`;
      starElement.style.opacity = star.opacity.toString();
      starElement.style.animationDelay = `${star.animationDelay}s`;
      container.appendChild(starElement);
    });
    
    // Handle window resize
    const handleResize = () => {
      if (container) {
        const newWidth = container.offsetWidth;
        const newHeight = container.offsetHeight;
        
        stars.current.forEach(star => {
          star.x = (star.x / width) * newWidth;
          star.y = (star.y / height) * newHeight;
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <div ref={containerRef} className="cosmic-stars" />;
};

export default StarBackground;
