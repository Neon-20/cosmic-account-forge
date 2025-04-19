
import React from 'react';
import { cn } from '@/lib/utils';

interface CosmicBadgeProps {
  className?: string;
  children?: React.ReactNode;
}

const CosmicBadge: React.FC<CosmicBadgeProps> = ({ className, children }) => {
  return (
    <div className={cn("cosmic-badge", className)}>
      {children}
    </div>
  );
};

export default CosmicBadge;
