import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'electric' | 'm-power' | 'luxury' | 'outline';
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default:
      'bg-white/10 text-white/90 border-white/10',
    electric:
      'bg-[#0066B1]/20 text-[#38bdf8] border-[#0066B1]/50 shadow-[0_0_12px_rgba(56,189,248,0.2)]',
    'm-power':
      'bg-gradient-to-r from-[#1C69D4]/20 via-[#4A90E2]/20 to-[#E2231A]/20 text-white border-[#E2231A]/40 shadow-[0_0_12px_rgba(226,35,26,0.2)]',
    luxury:
      'bg-amber-500/10 text-amber-300 border-amber-500/30',
    outline:
      'bg-transparent text-neutral-400 border-neutral-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border backdrop-blur-md',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
