'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);
    const errorId = selectId ? `${selectId}-error` : undefined;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-medium tracking-wide text-neutral-300"
          >
            {label}
            {props.required && <span className="text-[#E2231A] ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'w-full appearance-none bg-[#121316]/90 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white transition-all duration-200 outline-none pr-10 cursor-pointer',
              'focus:border-[#1C69D4] focus:ring-1 focus:ring-[#1C69D4] focus:bg-[#181A20]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-[#E2231A] focus:border-[#E2231A] focus:ring-[#E2231A]',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="bg-[#121316] text-neutral-500">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className="bg-[#121316] text-white py-2"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && (
          <p id={errorId} className="text-xs text-[#ff6b6b] flex items-center gap-1 mt-1">
            <span>●</span> {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
