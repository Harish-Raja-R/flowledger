import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import CustomCursor from '../components/ui/CustomCursor';
import { Lock, ArrowRight, Zap, CheckCircle } from 'lucide-react';

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
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald/40 via-charcoal to-charcoal" />
        </div>
        
        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-pink to-accent-blue flex items-center justify-center shadow-lg shadow-neon-pink/20 mb-8">
              <span className="text-white font-bold text-3xl">F</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-editorial font-bold leading-tight mb-6">
              The Future of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-accent-blue">
                Workflows
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
            {/* Animated UI representation */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald/20 flex items-center justify-center">
                    <CheckCircle className="text-emerald" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Purchase Order #1042</h3>
                    <p className="text-sm text-gray-400">Approved by Finance</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-emerald">Just now</div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald to-accent-blue"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
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
          <div className="lg:hidden w-12 h-12 rounded-xl bg-gradient-to-br from-neon-pink to-accent-blue flex items-center justify-center shadow-lg shadow-neon-pink/20 mb-8">
            <span className="text-white font-bold text-3xl">F</span>
          </div>
          
          <h2 className="text-4xl font-editorial font-bold mb-2 tracking-tight">Welcome back</h2>
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
