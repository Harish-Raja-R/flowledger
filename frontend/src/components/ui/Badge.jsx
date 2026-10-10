import React from 'react';
import { cn } from '../../utils/cn';

const Badge = ({ children, status = 'neutral', className }) => {
  const statusStyles = {
    SUCCESS: 'bg-emerald/10 text-emerald border-emerald/20',
    WARNING: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    ERROR: 'bg-red-500/10 text-red-600 border-red-500/20',
    INFO: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
    NEUTRAL: 'bg-gray-100 text-gray-600 border-gray-200',
    PENDING: 'bg-lavender text-purple-700 border-purple-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider',
        statusStyles[status] || statusStyles.NEUTRAL,
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
