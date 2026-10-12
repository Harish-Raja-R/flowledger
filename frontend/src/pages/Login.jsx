import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import CustomCursor from '../components/ui/CustomCursor';
import { Lock, ArrowRight, Zap, CheckCircle, ArrowRight as ArrowRightIcon } from 'lucide-react';
import WireTerrain from '../components/originkit/ui/wire-terrain';
import LiquidGlassCluster from '../components/originkit/ui/glass-icon';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-off-white text-charcoal flex">
      <CustomCursor />
      
      {/* Left side: Animated Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-charcoal text-white flex-col justify-center p-16">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-neon-pink/40 via-charcoal to-charcoal" />
        </div>
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <WireTerrain background="transparent" lineColor="#4146DF" accent="#F05AC8" speed={30} />
        </div>
        
        <div className="relative z-10 max-w-lg mt-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl lg:text-6xl font-editorial font-bold leading-tight mb-6 uppercase">
              EVERY DECISION.<br/>
              <span className="text-brand-pink">
                ONE CLEAR FLOW.
              </span>
            </h1>
            <p className="text-gray-400 text-lg mb-12">
              Automate approvals, streamline operations, and connect your entire organization on a single ledger.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6"
          >
            {/* Illustrative timeline */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex flex-col gap-6 relative">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/10"></div>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-emerald flex items-center justify-center border-4 border-charcoal">
                    <CheckCircle className="text-white" size={14} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Manager</h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-emerald flex items-center justify-center border-4 border-charcoal">
                    <CheckCircle className="text-white" size={14} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Finance</h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-charcoal border-4 border-charcoal flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-brand-pink animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Department Head</h3>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-24 relative bg-off-white">
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto relative z-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 relative">
              <LiquidGlassCluster background="transparent" />
            </div>
            <h2 className="text-4xl font-editorial font-bold tracking-tight">Welcome back</h2>
          </div>
          <p className="text-gray-500 mb-8">Enter your credentials to access your workspace.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Work Email"
              type="email"
              placeholder="admin@flowledger.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={error}
            />

            <Button 
              type="submit" 
              className="w-full py-4 text-base mt-4" 
              isLoading={loading}
            >
              Sign In <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
              <Zap size={16} className="text-neon-pink" />
              <span>FlowLedger Enterprise v2.0</span>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl p-4 text-sm text-left shadow-sm inline-block">
              <p className="font-semibold text-charcoal mb-2">Demo Credentials:</p>
              <ul className="space-y-1 text-gray-600">
                <li><span className="font-medium">Admin:</span> admin@flowledger.com / password</li>
                <li><span className="font-medium">Manager:</span> manager@flowledger.com / password</li>
                <li><span className="font-medium">Employee:</span> employee@flowledger.com / password</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
