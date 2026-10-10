import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-20 bg-white/50 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30 ml-64 transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Breadcrumbs or Page Title could go here */}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/settings')}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-charcoal hover:bg-gray-50 transition-colors border border-gray-100 shadow-sm"
          title="Settings"
        >
          <Settings size={18} />
        </button>

        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 bg-white/80 hover:bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-lavender flex items-center justify-center text-charcoal font-semibold">
            {user?.name?.charAt(0) || <User size={16} />}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight text-charcoal">{user?.name}</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{user?.role}</span>
          </div>
        </button>
        
        <button 
          onClick={handleLogout}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors border border-gray-100 shadow-sm"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
