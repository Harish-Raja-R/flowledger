import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ className, type = 'text', label, error, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="label-text">{label}</label>}
      <input
        type={type}
        className={cn(
          'w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl outline-none transition-all duration-300',
          'focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 focus:bg-white',
          'hover:border-gray-300',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
