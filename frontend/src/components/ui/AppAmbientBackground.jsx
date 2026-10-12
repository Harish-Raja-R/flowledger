import React from 'react';

const AppAmbientBackground = () => {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-neon-pink/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
    </>
  );
};

export default AppAmbientBackground;
