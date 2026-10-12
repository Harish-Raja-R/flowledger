import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';

const UserEdit = () => {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('EMPLOYEE');
  const [department, setDepartment] = useState('');
  const [departmentsList, setDepartmentsList] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!isNew);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await api.get('/departments');
        if (data.success) {
          setDepartmentsList(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch departments', err);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (isNew) return;
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/users/${id}`);
        if (data.success) {
          const u = data.data;
          setName(u.name);
          setEmail(u.email);
          setRole(u.role);
          setDepartment(u.department?._id || '');
        }
      } catch (err) {
        alert('Failed to load user');
        navigate('/users');
      } finally {
        setFetching(false);
      }
    };
    fetchUser();
  }, [id, isNew, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name,
        email,
        role,
        department: department || undefined
      };
      
      if (password) {
        payload.password = password;
      }

      if (isNew) {
        if (!password) {
          alert('Password is required for new users');
          setLoading(false);
          return;
        }
        await api.post('/users', payload);
      } else {
        await api.put(`/users/${id}`, payload);
      }
      navigate('/users');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save user');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="max-w-3xl mx-auto p-8 text-center animate-pulse">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <header className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <div>
          <h1 className="mb-1 text-3xl font-editorial font-bold">{isNew ? 'Create User' : 'Edit User'}</h1>
          <p className="text-gray-500">{isNew ? 'Add a new member to the organization.' : 'Update user details and permissions.'}</p>
        </div>
      </header>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select label="Role" value={role} onChange={e => setRole(e.target.value)}>
                <option value="EMPLOYEE">Employee</option>
                <option value="MANAGER">Manager</option>
                <option value="FINANCE">Finance</option>
                <option value="DEPARTMENT_HEAD">Department Head</option>
                <option value="ADMIN">Admin</option>
              </Select>
              
              <Select label="Department" value={department} onChange={e => setDepartment(e.target.value)}>
                <option value="">Unassigned</option>
                {departmentsList.map(dept => (
                  <option key={dept._id} value={dept._id}>{dept.name}</option>
                ))}
              </Select>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Input
                label={isNew ? "Password" : "New Password (leave blank to keep current)"}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required={isNew}
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="ghost" onClick={() => navigate('/users')}>Cancel</Button>
              <Button type="submit" isLoading={loading}>
                Save User <Save size={16} className="ml-2" />
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default UserEdit;
