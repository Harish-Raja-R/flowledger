import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, LayoutGrid, FileText, Lock, BarChart3, 
  ChevronDown, Search, Activity, Users, Shield, Clock, Bell, Menu, X
} from 'lucide-react';
import { cn } from '../utils/cn';

// COLORS

// --- COMPONENTS ---

const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "bg-brand-offwhite/90 backdrop-blur-xl border-b border-brand-charcoal/5 py-4" : "bg-transparent py-6"
      )}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-brand-black text-brand-offwhite font-bold text-lg rounded-sm">
              F
            </div>
            <span className="font-editorial font-bold text-xl tracking-tight text-brand-black">FLOWLEDGER</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-black">
            <a href="#how-it-works" className="hover:text-brand-pink transition-colors relative group">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-pink transition-all group-hover:w-full"></span>
            </a>
            <a href="#features" className="hover:text-brand-pink transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-pink transition-all group-hover:w-full"></span>
            </a>
            <a href="#security" className="hover:text-brand-pink transition-colors relative group">
              Security
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-pink transition-all group-hover:w-full"></span>
            </a>
            <a href="#faq" className="hover:text-brand-pink transition-colors relative group">
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-pink transition-all group-hover:w-full"></span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-brand-black hover:text-brand-periwinkle transition-colors">
              Sign in
            </Link>
            <Link to="/login" className="text-sm font-medium bg-brand-black text-brand-offwhite px-5 py-2.5 rounded-full hover:bg-brand-periwinkle hover:shadow-lg transition-all">
              Get Started
            </Link>
          </div>

          <button className="md:hidden text-brand-black" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-brand-offwhite p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-editorial font-bold text-xl text-brand-black">FLOWLEDGER</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-brand-black">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-2xl font-editorial font-semibold">
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#security" onClick={() => setMobileMenuOpen(false)}>Security</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <Link to="/login" className="text-center py-4 text-lg font-medium border border-brand-black rounded-full">Sign in</Link>
              <Link to="/login" className="text-center py-4 text-lg font-medium bg-brand-black text-brand-offwhite rounded-full">Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-brand-offwhite overflow-hidden min-h-screen flex flex-col items-center">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#101010 1px, transparent 1px), linear-gradient(90deg, #101010 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="uppercase text-xs font-bold tracking-[0.2em] text-gray-500 mb-6 block">BUSINESS WORKFLOWS, REIMAGINED</span>
          <h1 className="font-editorial text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] text-brand-black tracking-tighter mb-8 uppercase">
            Less Chasing.<br/>More Moving.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-brand-charcoal leading-relaxed mb-10">
            From the first request to the final approval, FlowLedger brings every decision, person, and process into one clear workflow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-brand-black text-white rounded-full font-medium hover:bg-brand-pink transition-colors">
              Explore FlowLedger
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white text-brand-black border border-brand-charcoal/10 rounded-full font-medium hover:bg-brand-charcoal/5 transition-colors">
              See How It Works
            </a>
          </div>
        </motion.div>

        {/* Hero Product Composition */}
        <div className="mt-20 relative w-full max-w-5xl flex flex-col items-center pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-[90%] md:w-[800px] bg-white rounded-2xl shadow-2xl p-6 border border-brand-charcoal/10 relative z-10"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-brand-offwhite rounded-lg flex items-center justify-center"><FileText className="text-brand-periwinkle" /></div>
                <div>
                  <h3 className="font-bold text-brand-black">Software License Renewal</h3>
                  <p className="text-sm text-gray-500">Requested by Jane Doe • Engineering</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-brand-emerald/10 text-brand-emerald rounded-full text-xs font-bold uppercase tracking-wider">Approved</span>
            </div>
            
            {/* Timeline */}
            <div className="relative pt-6 border-t border-brand-offwhite">
              <div className="absolute top-10 left-[23px] w-0.5 h-[80px] bg-brand-emerald/30"></div>
              
              <div className="flex gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 bg-brand-emerald rounded-full flex items-center justify-center border-4 border-white shrink-0"><CheckCircle2 className="text-white" size={20} /></div>
                <div>
                  <h4 className="font-bold text-brand-black text-sm">Manager Approval</h4>
                  <p className="text-xs text-gray-500">Approved by Michael Chen • 2 hours ago</p>
                </div>
              </div>

              <div className="flex gap-4 relative z-10">
                <div className="w-12 h-12 bg-brand-offwhite border border-brand-charcoal/10 rounded-full flex items-center justify-center border-4 border-white shrink-0"><div className="w-3 h-3 bg-brand-pink rounded-full animate-pulse"></div></div>
                <div>
                  <h4 className="font-bold text-brand-black text-sm">Department Head Approval</h4>
                  <p className="text-xs text-brand-pink font-medium">Pending Review</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Accents */}
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:flex absolute top-0 right-[5%] md:right-[10%] bg-brand-black text-white p-4 rounded-xl shadow-xl items-center gap-3 z-20"
          >
            <Bell size={16} className="text-brand-pink" />
            <span className="text-sm font-medium">Approval Required</span>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="hidden md:block absolute -bottom-10 left-[5%] md:left-[10%] bg-white border border-brand-charcoal/10 p-4 rounded-xl shadow-xl z-20"
          >
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Progress</span>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-editorial font-bold text-brand-black leading-none">2<span className="text-gray-500">/3</span></span>
              <span className="text-sm font-medium text-brand-emerald pb-0.5">Steps Complete</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  return (
    <section className="py-32 bg-brand-black text-brand-offwhite relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="uppercase text-xs font-bold tracking-[0.2em] text-gray-500 mb-6 block">01 / THE PROBLEM</span>
          <h2 className="font-editorial text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Work Should<br/><span className="text-brand-pink">Move Forward.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xl text-gray-500 leading-relaxed mb-8">
              Requests lost in chat threads. Unclear ownership. Endless follow-ups. No visibility into what's blocking the next step.
            </p>
            <p className="text-xl text-gray-500 leading-relaxed">
              When business processes are scattered, the cost isn't just time—it's momentum.
            </p>
          </div>
          
          <div className="relative h-[400px]">
            {/* Collage representing chaos */}
            <motion.div 
              initial={{ rotate: -5, opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="absolute top-0 left-10 w-64 bg-brand-charcoal p-4 rounded-lg shadow-2xl border border-white/5 opacity-80"
            >
              <div className="w-1/2 h-2 bg-white/20 rounded mb-2"></div>
              <div className="w-3/4 h-2 bg-white/10 rounded mb-4"></div>
              <div className="w-full h-8 bg-brand-pink/20 border border-brand-pink/50 rounded text-xs text-brand-pink flex items-center justify-center">Missing Context</div>
            </motion.div>

            <motion.div 
              initial={{ rotate: 8, opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-20 right-0 w-72 bg-brand-charcoal p-4 rounded-lg shadow-2xl border border-white/5"
            >
              <div className="w-1/3 h-2 bg-white/20 rounded mb-2"></div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="w-full h-2 bg-white/10 rounded"></div>
                  <div className="w-2/3 h-2 bg-white/10 rounded"></div>
                </div>
              </div>
              <div className="mt-4 p-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center rounded">Stalled for 14 days</div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-10 md:bottom-10 left-0 md:left-20 w-80 bg-white p-6 rounded-xl shadow-2xl"
            >
              <h4 className="text-brand-black font-bold mb-2 text-sm">Where is this request?</h4>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <span className="w-2 h-2 rounded-full bg-gray-500"></span> Unknown Status
              </div>
              {/* Broken lines */}
              <svg className="absolute -top-10 -right-10 w-32 h-32 opacity-20" viewBox="0 0 100 100">
                <path d="M0,100 C30,80 50,20 100,0" fill="none" stroke="#F5F4F0" strokeWidth="2" strokeDasharray="5,5" />
                <circle cx="100" cy="0" r="4" fill="#F05AC8" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WorkflowOverview = () => {
  const steps = [
    { role: 'EMPLOYEE', status: 'Submit', active: true },
    { role: 'MANAGER', status: 'Review', active: true },
    { role: 'FINANCE', status: 'Verify', active: true },
    { role: 'DEPARTMENT HEAD', status: 'Approve', active: false },
    { role: 'SYSTEM', status: 'Complete', active: false },
  ];

  const [activeStep, setActiveStep] = useState(2);

  return (
    <section className="py-32 bg-brand-lavender relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <span className="uppercase text-xs font-bold tracking-[0.2em] text-brand-periwinkle mb-6 block">02 / ONE CONNECTED SYSTEM</span>
          <h2 className="font-editorial text-5xl md:text-7xl font-black uppercase tracking-tighter text-brand-black">
            One Request.<br/>A Clear Way Forward.
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-white/40">
          <div className="flex flex-col md:flex-row justify-between relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-[28px] left-[50px] right-[50px] h-1 bg-brand-lavender z-0 overflow-hidden rounded-full">
              <motion.div 
                className="h-full bg-brand-periwinkle" 
                initial={{ width: 0 }}
                whileInView={{ width: '50%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>

            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="relative z-10 flex md:flex-col items-center gap-4 md:gap-6 mb-8 md:mb-0 cursor-pointer group"
                onClick={() => setActiveStep(idx)}
                tabIndex={0}
              >
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-4 border-white shadow-sm",
                  idx < 2 ? "bg-brand-emerald text-white" : 
                  idx === 2 ? "bg-brand-periwinkle text-white shadow-lg shadow-brand-periwinkle/30 scale-110" : 
                  "bg-brand-offwhite text-gray-500"
                )}>
                  {idx < 2 ? <CheckCircle2 size={24} /> : <div className="font-bold">{idx + 1}</div>}
                </div>
                
                <div className="text-left md:text-center">
                  <div className="text-xs font-bold text-gray-500 mb-1">{step.role}</div>
                  <div className={cn(
                    "font-medium",
                    idx === 2 ? "text-brand-periwinkle font-bold" : "text-brand-black"
                  )}>{step.status}</div>
                </div>

                {/* Mobile connecting line */}
                {idx < steps.length - 1 && (
                  <div className="md:hidden absolute left-[27px] top-[56px] bottom-[-32px] w-0.5 bg-brand-lavender -z-10">
                    {idx < 2 && <div className="h-full w-full bg-brand-emerald" />}
                  </div>
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-16 bg-brand-offwhite rounded-xl p-8 text-center max-w-2xl mx-auto"
            >
              <h4 className="text-xl font-editorial font-bold text-brand-black mb-2">{steps[activeStep].role}</h4>
              <p className="text-gray-500">
                {activeStep === 0 && "Employees submit structured forms containing all necessary context and metadata."}
                {activeStep === 1 && "Direct managers review initial requests for team alignment and budget availability."}
                {activeStep === 2 && "Finance reviews the request for compliance, budget allocation, and policy adherence."}
                {activeStep === 3 && "Final executive sign-off from department leadership before fulfillment."}
                {activeStep === 4 && "System records the final state, fires webhooks, and notifies all stakeholders."}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState('request');

  return (
    <section className="py-32 bg-brand-black text-brand-offwhite">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="uppercase text-xs font-bold tracking-[0.2em] text-gray-500 mb-6 block">03 / INSIDE FLOWLEDGER</span>
          <h2 className="font-editorial text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Every Detail.<br/>In Its Right Place.
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          {['request', 'approval', 'builder'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all",
                activeTab === tab 
                  ? "bg-brand-offwhite text-brand-black" 
                  : "bg-brand-charcoal text-gray-500 hover:text-brand-offwhite"
              )}
            >
              {tab === 'request' && 'Request Management'}
              {tab === 'approval' && 'Approval Center'}
              {tab === 'builder' && 'Workflow Builder'}
            </button>
          ))}
        </div>

        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-2 md:p-6 min-h-[500px] flex items-center justify-center overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activeTab === 'request' && (
              <motion.div 
                key="request"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="bg-brand-offwhite px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <span className="font-bold text-brand-black">All Requests</span>
                  <div className="flex gap-2">
                    <div className="bg-white px-3 py-1.5 rounded-md border border-gray-200 text-xs text-gray-500 flex items-center gap-2"><Search size={14}/> Search...</div>
                  </div>
                </div>
                <div className="p-0">
                  <table className="w-full text-left text-sm text-brand-black">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                      <tr>
                        <th className="px-6 py-3 font-medium">Title</th>
                        <th className="px-6 py-3 font-medium">Requester</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="px-6 py-4 font-medium">Engineering Workstation</td>
                        <td className="px-6 py-4 text-gray-500">Alex Chen</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold">PENDING</span></td>
                        <td className="px-6 py-4 font-mono">$3,499.00</td>
                      </tr>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        <td className="px-6 py-4 font-medium">Q3 Marketing Campaign</td>
                        <td className="px-6 py-4 text-gray-500">Sarah Smith</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">APPROVED</span></td>
                        <td className="px-6 py-4 font-mono">$15,000.00</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Adobe CC License</td>
                        <td className="px-6 py-4 text-gray-500">Mike Johnson</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">REJECTED</span></td>
                        <td className="px-6 py-4 font-mono">$600.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'approval' && (
              <motion.div 
                key="approval"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden p-8"
              >
                <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-6">
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase">Purchase Request #4092</span>
                    <h3 className="text-2xl font-editorial font-bold text-brand-black mt-1">Engineering Workstation</h3>
                    <p className="text-gray-500 text-sm mt-2">Requested by Alex Chen • Engineering Dept.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-mono text-brand-black block">$3,499.00</span>
                    <span className="text-xs text-brand-pink font-bold">Waiting: 2 days</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-8 text-sm text-gray-700">
                  "Need a replacement machine. Current one is thermal throttling during local builds."
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-brand-emerald text-white font-bold rounded-lg hover:bg-[#1CA077] transition-colors">Approve</button>
                  <button className="px-6 py-3 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200 transition-colors">Reject</button>
                  <button className="px-6 py-3 bg-gray-200 text-brand-black font-bold rounded-lg hover:bg-gray-300 transition-colors">Request Changes</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'builder' && (
              <motion.div 
                key="builder"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-4xl bg-brand-offwhite rounded-xl shadow-2xl p-8 border border-gray-200"
              >
                <h3 className="text-xl font-editorial font-bold text-brand-black mb-8">Hardware Request Workflow</h3>
                
                <div className="flex items-center justify-between gap-4">
                  {['Employee', 'Manager', 'Finance', 'Dept Head'].map((role, i) => (
                    <React.Fragment key={i}>
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1 text-center">
                        <span className="text-xs font-bold text-gray-500 block mb-1">STEP {i+1}</span>
                        <span className="text-sm font-bold text-brand-black">{role}</span>
                        <div className="mt-3 text-xs bg-gray-100 rounded p-1 text-gray-600 border border-gray-200">
                          SLA: 24h
                        </div>
                      </div>
                      {i < 3 && <ArrowRight className="text-gray-400 shrink-0" />}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const WorkflowSteps = () => {
  return (
    <section id="how-it-works" className="py-32 bg-brand-periwinkle text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="uppercase text-xs font-bold tracking-[0.2em] text-white/70 mb-6 block">04 / HOW IT WORKS</span>
          <h2 className="font-editorial text-5xl md:text-7xl font-black uppercase tracking-tighter">
            From Submission<br/>To Sign-Off.
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 overflow-x-auto pb-8 snap-x">
          {[
            { num: '01', title: 'Create', desc: 'An employee creates a structured request.' },
            { num: '02', title: 'Route', desc: 'FlowLedger selects the matching active workflow.' },
            { num: '03', title: 'Review', desc: 'The assigned approver evaluates the request.' },
            { num: '04', title: 'Decide', desc: 'Approvers approve, reject, or request changes.' },
            { num: '05', title: 'Complete', desc: 'The request reaches its final state, with an audit trail.' }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[280px] flex-1 bg-white/10 p-8 rounded-2xl border border-white/20 snap-start relative"
            >
              <div className="text-5xl font-editorial font-black text-white/20 mb-6">{step.num}</div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-white/80 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureEditorial = () => {
  const features = [
    { title: "Structured Requests", desc: "Create, edit, submit, track, and resubmit business requests." },
    { title: "Configurable Workflows", desc: "Define approval stages, approver roles, required steps, and SLA targets." },
    { title: "Role-Based Access", desc: "Provide different permissions for administrators, employees, managers, finance, and heads." },
    { title: "Notifications", desc: "Make approval assignments, decisions, and requested changes visible." },
    { title: "Audit Trail", desc: "Track who performed an action, what changed, and when it happened." },
    { title: "Operational Analytics", desc: "Understand request volume, status, and bottlenecks using actual data." }
  ];

  return (
    <section id="features" className="py-32 bg-brand-offwhite text-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <span className="uppercase text-xs font-bold tracking-[0.2em] text-gray-500 mb-6 block">05 / THE TOOLKIT</span>
            <h2 className="font-editorial text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Built For The<br/>Work Between Teams.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {features.map((feature, i) => (
            <div key={i} className="relative group">
              <div className="text-sm font-mono text-gray-500 mb-4 border-b border-brand-charcoal/10 pb-4">[{String(i + 1).padStart(2, '0')}]</div>
              <h3 className="text-2xl font-editorial font-bold mb-3 group-hover:text-brand-pink transition-colors">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AuditTrailSection = () => {
  return (
    <section id="security" className="py-32 bg-brand-black text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 relative z-10">
          <h2 className="font-editorial text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Every Decision<br/><span className="text-brand-emerald">Leaves A Trace.</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
          {[
            { label: 'REQUEST SUBMITTED', color: 'bg-white text-brand-black' },
            { label: 'APPROVAL RECORDED', color: 'bg-brand-emerald/20 text-brand-emerald border border-brand-emerald/50' },
            { label: 'NOTIFICATION SENT', color: 'bg-brand-periwinkle/20 text-brand-periwinkle border border-brand-periwinkle/50' },
            { label: 'AUDIT LOG CREATED', color: 'bg-brand-pink/20 text-brand-pink border border-brand-pink/50' },
            { label: 'ANALYTICS UPDATED', color: 'bg-gray-500/20 text-white border border-gray-500/50' }
          ].map((item, i) => (
            <React.Fragment key={i}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn("px-4 py-3 rounded-md text-xs font-bold tracking-wider", item.color)}
              >
                {item.label}
              </motion.div>
              {i < 4 && <ArrowRight className="hidden md:block text-brand-charcoal" size={20} />}
              {i < 4 && <div className="md:hidden w-0.5 h-6 bg-brand-charcoal" />}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-24 grid md:grid-cols-4 gap-8 text-center text-sm font-medium text-gray-500">
          <div>Clear ownership of approval steps.</div>
          <div>Traceable decisions.</div>
          <div>Centralized request history.</div>
          <div>Visibility into workflow progress.</div>
        </div>
      </div>
      
      {/* Abstract bg element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-emerald opacity-[0.02] rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};

const AnalyticsPreview = () => {
  return (
    <section className="py-32 bg-white text-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-editorial text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
              See Where<br/>Work Stands.
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed mb-10">
              Operational analytics give you real-time visibility into request volume, approval turnarounds, and where things are getting stuck.
            </p>
            <ul className="space-y-4 font-medium">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-black"></div>Requests by status</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-black"></div>Requests by type</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-brand-black"></div>Monthly request volume</li>
            </ul>
          </div>

          <div className="bg-brand-offwhite p-8 rounded-3xl border border-gray-200 shadow-sm relative">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase">Pending</span>
                <div className="text-4xl font-editorial font-bold mt-2">24</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase">Approved</span>
                <div className="text-4xl font-editorial font-bold mt-2 text-brand-emerald">156</div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-48 flex items-end gap-2 justify-between">
              {/* Fake chart */}
              {[40, 70, 45, 90, 65, 85, 120].map((h, i) => (
                <div key={i} className="w-full bg-brand-lavender rounded-t-sm" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brand-black text-white p-4 rounded-xl shadow-xl border border-gray-800">
              <span className="text-xs text-gray-400 block mb-1">Avg Turnaround</span>
              <span className="text-xl font-bold">1.2 Days</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RoleSection = () => {
  const roles = [
    { name: 'ADMIN', desc: 'Configures workflows, manages users, and oversees platform health.', icon: Shield },
    { name: 'EMPLOYEE', desc: 'Creates requests and tracks their progress.', icon: Users },
    { name: 'MANAGER', desc: 'Reviews direct reports\' requests for team alignment.', icon: Activity },
    { name: 'FINANCE', desc: 'Ensures compliance and budget availability.', icon: BarChart3 },
    { name: 'DEPARTMENT HEAD', desc: 'Provides final executive sign-off.', icon: CheckCircle2 }
  ];

  return (
    <section className="py-32 bg-brand-offwhite text-brand-black border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-editorial text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-20">
          Built For Every Role
        </h2>

        <div className="grid md:grid-cols-5 gap-4">
          {roles.map((role, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:text-brand-periwinkle transition-all">
                <role.icon size={48} strokeWidth={1} />
              </div>
              <span className="text-xs font-bold text-brand-periwinkle mb-4 block">0{i+1}</span>
              <h3 className="font-bold text-lg mb-2">{role.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed relative z-10">{role.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs = [
    { q: "What is FlowLedger?", a: "FlowLedger is a centralized platform for managing business requests and approval workflows." },
    { q: "How do approval workflows work?", a: "Workflows are linear sequences of approval stages. A request moves from one stage to the next only when approved." },
    { q: "Can workflows have multiple approval stages?", a: "Yes, administrators can configure custom workflows with multiple distinct stages and assigned roles." },
    { q: "What happens when a request needs changes?", a: "An approver can mark a request as 'Changes Requested', sending it back to the submitter without outright rejecting it." },
    { q: "How are decisions recorded?", a: "Every action is logged in an immutable Audit Trail tracking the user, timestamp, and specific change made." },
    { q: "Who can access requests and approvals?", a: "Access is governed by Role-Based Access Control (RBAC). Employees see their own requests, while Managers and Finance see requests routed to them." }
  ];

  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-32 bg-white text-brand-black">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-editorial text-4xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-center">
          Common Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full px-6 py-5 text-left font-bold flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                aria-expanded={open === i}
              >
                {faq.q}
                <ChevronDown className={cn("transition-transform", open === i && "rotate-180")} size={20} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-5 text-gray-500 bg-white">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-40 bg-brand-black text-brand-offwhite text-center relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-pink via-brand-periwinkle to-brand-emerald"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="font-editorial text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
          Make Every<br/>Next Step Clear.
        </h2>
        <p className="text-xl text-gray-500 mb-12">
          Bring requests, approvals, and decisions into one connected workflow.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login" className="px-8 py-4 bg-white text-brand-black font-bold rounded-full hover:bg-gray-200 transition-colors text-lg">
            Get Started
          </Link>
          <a href="#how-it-works" className="px-8 py-4 bg-transparent border border-white/20 font-bold rounded-full hover:bg-white/5 transition-colors text-lg">
            Explore the Platform
          </a>
        </div>
      </div>
    </section>
  );
};

const LandingFooter = () => {
  return (
    <footer className="bg-brand-black text-gray-500 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 flex items-center justify-center bg-white text-brand-black font-bold text-xs rounded-sm">
              F
            </div>
            <span className="font-editorial font-bold tracking-tight text-white">FLOWLEDGER</span>
          </div>
          <p className="max-w-sm">End-to-End Business Workflow & Approval Platform. Every decision moves business forward.</p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Action</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-brand-pink transition-colors">Sign In</Link></li>
            <li><Link to="/login" className="hover:text-brand-pink transition-colors">Register</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs">
        <p>&copy; {new Date().getFullYear()} FlowLedger Inc. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Export
const Landing = () => {
  // Enforce scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-brand-offwhite min-h-screen font-sans selection:bg-brand-pink selection:text-white">
      <LandingNavbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <WorkflowOverview />
        <ProductShowcase />
        <WorkflowSteps />
        <FeatureEditorial />
        <AuditTrailSection />
        <AnalyticsPreview />
        <RoleSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Landing;
