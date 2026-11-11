'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'electric' | 'm-power';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C69D4] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none select-none tracking-wide';

    const variants = {
      primary:
        'bg-white text-black hover:bg-neutral-200 active:bg-neutral-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]',
      secondary:
        'bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border border-white/15 hover:border-white/30',
      outline:
        'bg-transparent text-white border border-neutral-700 hover:border-white hover:bg-white/5',
      ghost:
        'bg-transparent text-neutral-300 hover:text-white hover:bg-white/5',
      electric:
        'bg-[#0066B1] text-white hover:bg-[#0077CE] shadow-[0_0_25px_rgba(0,102,177,0.4)] hover:shadow-[0_0_35px_rgba(0,102,177,0.6)] border border-[#0099FF]/30',
      'm-power':
        'bg-gradient-to-r from-[#1C69D4] via-[#003B7A] to-[#E2231A] text-white hover:brightness-110 shadow-[0_0_25px_rgba(28,105,212,0.4)] border border-white/20',
    };

    const sizes = {
      sm: 'text-xs px-4 py-2 gap-1.5',
      md: 'text-sm px-6 py-3 gap-2',
      lg: 'text-base px-8 py-4 gap-2.5',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
