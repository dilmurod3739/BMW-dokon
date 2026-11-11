import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({
  className,
  hoverEffect = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'relative bg-[#121316]/90 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300',
        hoverEffect &&
          'hover:border-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
