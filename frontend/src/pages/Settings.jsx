import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Save } from 'lucide-react';

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for settings
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved successfully');
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <header>
        <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2 block">Workspace</span>
          <h1 className="text-4xl md:text-5xl font-editorial font-bold text-charcoal tracking-tight mb-2 uppercase">Settings</h1>
        <p className="text-gray-500">Manage application preferences.</p>
      </header>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Notifications</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={emailNotifications} 
                onChange={e => setEmailNotifications(e.target.checked)}
                className="w-5 h-5 rounded text-accent-blue border-gray-300 focus:ring-accent-blue"
              />
              <span className="font-medium text-charcoal">Receive Email Notifications</span>
            </label>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Appearance</h3>
            <div className="flex gap-4">
              <label className={`flex-1 p-4 border rounded-xl cursor-pointer text-center transition-colors ${theme === 'light' ? 'border-charcoal bg-gray-50' : 'border-gray-200'}`}>
                <input type="radio" name="theme" value="light" className="hidden" checked={theme === 'light'} onChange={() => setTheme('light')} />
                <span className="font-medium">Light</span>
              </label>
              <label className={`flex-1 p-4 border rounded-xl cursor-pointer text-center transition-colors ${theme === 'dark' ? 'border-charcoal bg-gray-50' : 'border-gray-200'}`}>
                <input type="radio" name="theme" value="dark" className="hidden" checked={theme === 'dark'} onChange={() => setTheme('dark')} />
                <span className="font-medium">Dark (Coming Soon)</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button type="submit" isLoading={loading}>
              Save Settings <Save size={16} className="ml-2" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Settings;
