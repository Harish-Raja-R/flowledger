import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import Card from '../components/ui/Card';

const Placeholder = ({ title }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-editorial font-bold text-charcoal tracking-tight">{title}</h1>
          <p className="text-gray-500 mt-1">This module is currently under development.</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="flex flex-col items-center justify-center p-16 text-center border-dashed border-2 border-gray-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center mb-6">
            <Construction size={32} />
          </div>
          <h2 className="text-xl font-bold text-charcoal mb-2">Module Under Construction</h2>
          <p className="text-gray-500 max-w-md">
            The <strong>{title}</strong> module is slated for the next release phase. Check back later for administrative features and settings.
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Placeholder;
