import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import api from '../services/api';
import { Save, User } from 'lucide-react';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name };
      if (password) payload.password = password;
      
      const { data } = await api.put(`/users/${user._id}`, payload);
      if (data.success) {
        setUser({ ...user, name: data.data.name });
        setPassword('');
        alert('Profile updated successfully');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <header>
        <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2 block">Workspace</span>
          <h1 className="text-4xl md:text-5xl font-editorial font-bold text-charcoal tracking-tight mb-2 uppercase">My Profile</h1>
        <p className="text-gray-500">Manage your personal information and password.</p>
      </header>

      <Card className="p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
          <div className="w-20 h-20 rounded-full bg-lavender flex items-center justify-center text-charcoal text-2xl font-bold shadow-inner">
            {user?.name?.charAt(0) || <User size={32} />}
          </div>
          <div>
            <h2 className="text-xl font-bold text-charcoal">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <span className="inline-block mt-2 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600 rounded">
              {user?.role}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          
          <Input 
            label="Email Address" 
            value={user?.email || ''} 
            disabled 
            className="bg-gray-50 text-gray-500"
          />

          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Change Password</h3>
            <Input 
              label="New Password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Leave blank to keep current password"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" isLoading={loading}>
              Save Changes <Save size={16} className="ml-2" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
