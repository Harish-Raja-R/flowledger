import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({ className, label, error, children, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5 relative">
      {label && <label className="label-text">{label}</label>}
      <div className="relative">
        <select
          className={cn(
            'w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl outline-none transition-all duration-300 appearance-none',
            'focus:border-charcoal focus:ring-1 focus:ring-charcoal/20 focus:bg-white',
            'hover:border-gray-300',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
          <ChevronDown size={16} />
        </div>
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
