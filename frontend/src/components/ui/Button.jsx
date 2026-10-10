import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ children, variant = 'primary', className, isLoading, disabled, ...props }) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';
  const isDestructive = variant === 'destructive';

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02, y: disabled || isLoading ? 0 : -2 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      disabled={disabled || isLoading}
      className={cn(
        'relative inline-flex items-center justify-center px-6 py-2.5 font-medium rounded-full overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none tracking-wide text-sm',
        isPrimary && 'bg-charcoal text-white shadow-md hover:shadow-lg',
        isSecondary && 'bg-white text-charcoal border border-gray-200 hover:bg-gray-50',
        isGhost && 'bg-transparent text-charcoal hover:bg-gray-100',
        isDestructive && 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100',
        className
      )}
      {...props}
    >
      {isPrimary && (
        <span className="absolute inset-0 bg-gradient-to-r from-neon-pink to-accent-blue opacity-0 hover:opacity-10 transition-opacity duration-300" />
      )}
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

export default Button;
