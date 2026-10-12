import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  CheckSquare, 
  Settings, 
  Users, 
  Building2, 
  History,
  Bell
} from 'lucide-react';
import { cn } from '../../utils/cn';
import LiquidGlassCluster from '../originkit/ui/glass-icon';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Requests', path: '/requests', icon: FileText },
    { name: 'New Request', path: '/requests/new', icon: PlusCircle },
  ];

  if (user?.role !== 'EMPLOYEE') {
    navItems.push({ name: 'Approvals', path: '/approvals', icon: CheckSquare });
  }

  if (user?.role === 'ADMIN') {
    navItems.push(
      { name: 'Workflows', path: '/workflows', icon: Settings },
      { name: 'Users', path: '/users', icon: Users },
      { name: 'Departments', path: '/departments', icon: Building2 },
      { name: 'Audit Logs', path: '/audit-logs', icon: History }
    );
  }

  navItems.push({ name: 'Notifications', path: '/notifications', icon: Bell });

  return (
    <aside className="w-64 h-screen bg-white/80 backdrop-blur-xl border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40">
      <div className="h-20 flex items-center px-8 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg relative overflow-hidden flex items-center justify-center shadow-lg shadow-neon-pink/10 mix-blend-multiply">
            <LiquidGlassCluster background="transparent" />
          </div>
          <h1 className="text-xl font-editorial font-bold tracking-tight text-charcoal">FlowLedger</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm overflow-hidden hover:translate-x-1',
                isActive 
                  ? 'text-charcoal bg-gray-50' 
                  : 'text-gray-500 hover:text-charcoal hover:bg-gray-50/50'
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-neon-pink rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <item.icon size={18} className={cn('relative z-10 transition-colors', isActive ? 'text-neon-pink' : '')} />
                <span className="relative z-10">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
